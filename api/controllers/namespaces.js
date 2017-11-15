var express = require('express')
  , router = express.Router()
  , thinky = require('../models/rdb')
  , Namespace = require('../models/Namespace')
  , errors = require('../helpers/errors')
  , parser = require('../helpers/parser')
  , type = thinky.type
  , r = thinky.r


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
        Namespace.get(req.params.name).update(req.body)
        .then(resp => res.send(JSON.stringify(resp)))
        .catch(err => res.status(500).send(err))
      } else {
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


// used to migrate old model to new model
// var Old = thinky.createModel('namespaces', {
//   name: type.string(),
//   subtitle: type.string(),
//   logo: type.string(),
//   description: type.string(),
//   privacy: type.string().default('default'),
//   createdAt: type.date().default(r.now()),
//   updatedAt: type.date().default(r.now())
// }, { pk: 'name' })

// router.get('/sync', function (req, res, next) {
//   Old.filter({}).run().then(all => {
//     all.forEach(old => {
//       new Namespace(Object.assign({}, old, { id: undefined })).save()
//     })
//   })
//   res.send('doing it')
// })

module.exports = router
