var express = require('express')
  , router = express.Router()
  , Session = require('../models/Session')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , saveHandler = require('../common/save')


// router.get('/', function (req, res, next) {
//   Session.filter({}).getJoin({ leagues: true}).run().then(resp => res.send(JSON.stringify(resp)))
// })

router.get('/', logHandler, modelHandler(Session), findHandler.findByLeegId, filterHandler.default, jsonHandler)
router.post('/', logHandler, modelHandler(Session), saveHandler.save)
router.put('/:id', logHandler, modelHandler(Session), saveHandler.save)

module.exports = router
