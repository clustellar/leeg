var express = require('express')
  , router = express.Router()
  , User = require('../models/User')
  , Leeg = require('../models/Leeg')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , logoHandler = require('../common/logo')
  , saveHandler = require('../common/save')
  , errors = require('../common/errors')

router.get('/logos', logHandler, modelHandler(Leeg), findHandler.find, logoHandler)
router.get('/', logHandler, modelHandler(Leeg), findHandler.find, filterHandler.leeg, jsonHandler)
router.post('/', logHandler, modelHandler(Leeg), saveHandler.save)
router.put('/:id', logHandler, modelHandler(Leeg), saveHandler.save)

router.get('/mine', function (req, res, next) {
  if (!req.query.token) {
    return res.send(null)
  }
  User.filter({ sessionSecret: req.query.token }).run().then(function (resp) {
    if (resp.length === 1) {
      let user = resp[0]
      Leeg.filter( (leeg) => { leeg.users.contain(user.id) }).then(function (leegs) {
        res.send(leegs)
      })
    } else {
      console.log("Found multiple leegs for sessionSecret " + req.query.token)
      res.send(null)
    }
  }).error(errors.error(res))
})

module.exports = router
