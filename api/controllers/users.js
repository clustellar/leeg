var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , User = require('../models/User')
  , findHandler = require('../common/find')
  , saveHandler = require('../common/save')
  , errors = require('../helpers/errors')

router.get('/me', function (req, res, next) {
  if (!req.query.token) {
    return res.send(null)
  }
  User.filter({ sessionSecret: req.query.token }).run().then(function (resp) {
    if (resp.length === 1) {
      return res.send(JSON.stringify(resp[0]))
    } else {
      console.log("Found multiple users for sessionSecret " + req.query.token)
      res.send(null)
    }
  }).error(errors.error(res))
})

// router.get('/', inject(User, findHandler.filter))
// router.get('/:email', inject(User, findHandler.findByEmail))

module.exports = router
