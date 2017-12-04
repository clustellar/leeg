var express = require('express')
  , router = express.Router()
  , User = require('../models/User')
  , Group = require('../models/Group')
  , findHandler = require('../common/find')
  , saveHandler = require('../common/save')
  , errors = require('../helpers/errors')


// router.get('/', inject(Group, findHandler.filter))
// router.get('/:name', inject(Group, findHandler.findByName))
// router.post('/', inject(Group, saveHandler.save))
// router.put('/:name', inject(Group, saveHandler.save))

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
