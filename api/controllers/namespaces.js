var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , Namespace = require('../models/namespace')
  , errors = require('../helpers/errors')
  , parser = require('../helpers/parser')


router.get('/', function (req, res, next) {
  Namespace.run().then(function (resp) {
    return res.send(JSON.stringify(resp, null, 2))
  }).error(errors.error(res))
})

router.post('/', function (req, res, next) {
  console.log('CREATING NAMESPACE: ', req.user)
  if (req.body) {
    return new Namespace(req.body).save()
  } else {
    res.status(500).send('No body received.')
  }
})

module.exports = router
