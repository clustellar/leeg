var express = require('express')
  , router = express.Router()
  , User = require('../models/User')
  , Session = require('../models/Session')
  , findHandler = require('../common/find')
  , jsonHandler = require('../common/json')
  , saveHandler = require('../common/save')
  , errors = require('../helpers/errors')


router.get('/', function (req, res, next) {
  Session.filter({}).getJoin({ leagues: true}).run().then(resp => res.send(JSON.stringify(resp)))
})
// router.get('/', inject(Session, findHandler.findByLeegName, jsonHandler))
// router.get('/:id', inject(Session, findHandler.findByName, jsonHandler))
// router.post('/', inject(Session, saveHandler.save))
// router.put('/:id', inject(Session, saveHandler.save))

router.get('/mine', function (req, res, next) {
  if (!req.query.token) {
    return res.send(null)
  }
  User.filter({ sessionSecret: req.query.token }).run().then(function (resp) {
    if (resp.length === 1) {
      let user = resp[0]
      Session.filter( (session) => { session.users.contain(user.id) }).then(function (sessions) {
        res.send(sessions)
      })
    } else {
      console.log("Found multiple sessions for sessionSecret " + req.query.token)
      res.send(null)
    }
  }).error(errors.error(res))
})

module.exports = router
