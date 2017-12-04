var errors = require('../helpers/errors')

var filterHandler = function (req, res, next) {
  console.log('FILTER -> ', req.query)
  req.sequence = req.model.filter(req.query)
  next()
}

var findByNameHandler = function (Model, req, res, next) {
  return Model.get({ name: req.params.name }).nth(0).run().then(resp => {
    next(req, res, next, resp)
  }).error(errors.error(res))
}

var findByLeegNameHandler = function (Model, req, res, next) {
  return Model.filter({ leegId: req.params.leegId }).run().then(resp => {
    next(req, res, next, resp)
  }).error(errors.error(res))
}

var findByEmailHandler = function (Model, req, res, next) {
  return Model.filter({ email: req.params.email }).nth(0).run().then(resp => {
    next(req, res, next, resp)
  })
  .error(errors.error(res))
}

var findByIdHandler = function (Model, req, res, next) {
  return Model.get(req.params.id).run().then(resp => {
    next(req, res, next, resp)
  })
  .error(errors.error(res))
}

exports.filter = filterHandler
exports.findByName = findByNameHandler
exports.findByEmail = findByEmailHandler
exports.findByLeegName = findByLeegNameHandler
exports.findById = findByIdHandler
