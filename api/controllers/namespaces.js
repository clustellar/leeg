var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , Namespace = require('../models/namespace')
  , errors = require('../helpers/errors')
  , parser = require('../helpers/parser')


var save = function (req, res, next) {
  if (req.body) {
    if (req.params.validate || req.query.validate) {
      Namespace.filter({ name: req.body.name }).run().then( (resp) => {
        if (resp.length) {
          res.send(JSON.stringify({ valid: false, message: 'This namespace is already taken.' }))
        } else {
          res.send(JSON.stringify({ valid: true, message: 'This namespace is available, save to claim it' }))
        }
      })
    } else {
      if (req.params.name) {
        console.log('UPDATING: ' + req.params.name)
        Namespace.get(req.params.name).update(req.body)
        .then(resp => res.send(JSON.stringify(resp)))
        .catch(err => res.status(500).send(err))
      } else {
        console.log('CREATING: ' + req.body.name)
        let ns = new Namespace(req.body)
        ns.save()
        .then(resp => res.send(JSON.stringify(resp)) )
        .catch(err => res.status(500).send(err) )
      }
    }
  } else {
    res.status(500).send('No body received.')
  }
}

router.get('/', function (req, res, next) {
  Namespace.filter(req.query).run().then(function (resp) {
    return res.send(JSON.stringify(resp, null, 2))
  }).error(errors.error(res))
})

router.post('/', save)
router.put('/:name', save)

module.exports = router
