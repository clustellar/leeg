var express = require('express')
  , router = express.Router()
  , User = require('../models/User')
  , Leeg = require('../models/Leeg')
  , inject = require('../common/inject')
  , findHandler = require('../common/find')
  , saveHandler = require('../common/save')
  , errors = require('../helpers/errors')


router.get('/', inject(Leeg, findHandler.filter))
router.get('/:name', inject(Leeg, findHandler.findByName))
router.post('/', inject(Leeg, saveHandler.save))
router.put('/:name', inject(Leeg, saveHandler.save))

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
