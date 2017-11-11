var express = require('express')
  , router = express.Router()

router.use('/proxy', require('./proxy'))
router.use('/users', require('./users'))
router.use('/namespaces', require('./namespaces'))

router.get('/', function(req, res) {
  res.render('index')
})

module.exports = router