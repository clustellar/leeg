var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , User = require('../models/user')
  , Group = require('../models/group')
  , errors = require('../helpers/errors')
  , parser = require('../helpers/parser')


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
