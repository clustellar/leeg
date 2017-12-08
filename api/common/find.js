var errors = require('./errors')

var findHandler = function (req, res, next) {
  console.log('FILTER -> ', req.query)
  req.sequence = req.model.filter(req.query)
  next()
}

var findByNameHandler = function (req, res, next) {
  req.sequence = req.model.filter({ name: req.params.name }).nth(0)
  next()
}

var findByLeegIdHandler = function (req, res, next) {
  console.log('FIND BY LEEG ID: ', req.params.id)
  req.sequence = req.model.filter({ leegId: req.params.id })
  next()
}

var findByEmailHandler = function (req, res, next) {
  req.sequence = req.model.filter({ email: req.params.email }).nth(0)
  next()
}

var findByIdHandler = function (req, res, next) {
  req.sequence = req.model.get(req.params.id)
  next()
}

exports.find = findHandler
exports.findByName = findByNameHandler
exports.findByEmail = findByEmailHandler
exports.findByLeegId = findByLeegIdHandler
exports.findById = findByIdHandler
