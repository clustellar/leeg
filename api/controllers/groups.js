var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , User = require('../models/User')
  , Group = require('../models/Group')
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

router.post('/', function (req, res, next) {
  if (!req.query.token) {
    return res.send('Unauthorized')
  }
  User.filter({ sessionSecret: req.query.token }).nth(0).run().then(user => {
    if (user) {
      new Group(req.body).save().then(resp => res.send(JSON.stringify(resp)))
    } else {
      res.status(500).send("No valid user session")
    }
  })
})

module.exports = router
