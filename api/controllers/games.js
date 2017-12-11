var express = require('express')
  , router = express.Router()
  , Game = require('../models/Game')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , saveHandler = require('../common/save')


router.get('/', logHandler, modelHandler(Game), findHandler.findBySessionId, filterHandler.default, jsonHandler)
router.post('/', logHandler, modelHandler(Game), saveHandler.save)
router.put('/:id', logHandler, modelHandler(Game), saveHandler.save)

module.exports = router
