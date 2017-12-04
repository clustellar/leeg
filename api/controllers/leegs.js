var express = require('express')
  , router = express.Router()
  , User = require('../models/User')
  , Leeg = require('../models/Leeg')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , saveHandler = require('../common/save')
  , errors = require('../helpers/errors')


router.use('/:leegId/sessions', require('./sessions'))

router.get('/', logHandler, modelHandler(Leeg), findHandler.filter, filterHandler, jsonHandler)
router.get('/:name', logHandler, modelHandler(Leeg), findHandler.findByName, filterHandler, jsonHandler)
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
