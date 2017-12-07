var express = require('express')
  , router = express.Router()
  , findHandler = require('../common/find')
  , saveHandler = require('../common/save')
  , Namespace = require('../models/Namespace')
  , logHandler = require('../common/log')
  , modelHandler = require('../common/model')
  , findHandler = require('../common/find')
  , filterHandler = require('../common/filter')
  , jsonHandler = require('../common/json')
  , logoHandler = require('../common/logo')
  , saveHandler = require('../common/save')

router.get('/', logHandler, modelHandler(Namespace), findHandler.find, filterHandler.default, jsonHandler)

module.exports = router
