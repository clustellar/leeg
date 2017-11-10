var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , User = require('../models/user')
  , errors = require('../helpers/errors')
  , parser = require('../helpers/parser')


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

module.exports = router