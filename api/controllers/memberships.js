var express = require('express')
  , router = express.Router()
  , Membership = require('../models/Membership')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , saveHandler = require('../common/save')


router.get('/', logHandler, modelHandler(Membership), findHandler.findByGameId, filterHandler.default, jsonHandler)
router.post('/', logHandler, modelHandler(Membership), saveHandler.save)
router.put('/:id', logHandler, modelHandler(Membership), saveHandler.save)

module.exports = router
