var express = require('express')
  , router = express.Router()
  , User = require('../models/User')
  , Group = require('../models/Group')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , logoHandler = require('../common/logo')
  , saveHandler = require('../common/save')
  , errors = require('../common/errors')

router.get('/', logHandler, modelHandler(Group), findHandler.find, filterHandler.default, jsonHandler)

router.get('/mine', function (req, res, next) {
  if (!req.query.token) {
    return res.send(null)
  }
  User.filter({ sessionSecret: req.query.token }).run().then(function (resp) {
    if (resp.length === 1) {
      let user = resp[0]
      Group.filter( (group) => { group.users.contain(user.id) }).then(function (groups) {
        res.send(groups)
      })
    } else {
      console.log("Found multiple groups for sessionSecret " + req.query.token)
      res.send(null)
    }
  }).error(errors.error(res))
})

module.exports = router
