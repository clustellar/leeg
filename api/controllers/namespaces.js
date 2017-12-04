var express = require('express')
  , router = express.Router()
  , findHandler = require('../common/find')
  , saveHandler = require('../common/save')
  , Namespace = require('../models/Namespace')

// router.get('/', inject(Namespace, findHandler.filter))
// router.get('/:name', inject(Namespace, findHandler.findByName))
// router.post('/', inject(Namespace, saveHandler.save))
// router.put('/:name', inject(Namespace, saveHandler.save))

module.exports = router
