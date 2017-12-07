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

var findByLeegIdHandler = function (Model, req, res, next) {
  req.sequence = req.model.filter({ leegId: req.params.id }).nth(0)
  next()
}

var findByEmailHandler = function (Model, req, res, next) {
  req.sequence = req.model.filter({ email: req.params.email }).nth(0)
  next()
}

var findByIdHandler = function (Model, req, res, next) {
  req.sequence = req.model.get(req.params.id)
  next()
}

exports.find = findHandler
exports.findByName = findByNameHandler
exports.findByEmail = findByEmailHandler
exports.findByLeegId = findByLeegIdHandler
exports.findById = findByIdHandler
