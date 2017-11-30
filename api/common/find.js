var errors = require('../helpers/errors')

var filterHandler = function (Model, req, res, next) {
  return Model.filter(req.query).run().then(resp => {
    return res.send(JSON.stringify(resp))
  })
  .error(errors.error(res))
}

var findByNameHandler = function (Model, req, res, next) {
  return Model.filter({ name: req.params.name }).nth(0).run().then(resp => {
    return res.send(JSON.stringify(resp))
  })
  .error(errors.error(res))
}

var findByEmailHandler = function (Model, req, res, next) {
  return Model.filter({ email: req.params.email }).nth(0).run().then(resp => {
    return res.send(JSON.stringify(resp))
  })
  .error(errors.error(res))
}

var findByIdHandler = function (Model, req, res, next) {
  return Model.get(req.params.id).run().then(resp => {
    return res.send(JSON.stringify(resp))
  })
  .error(errors.error(res))
}

exports.filter = filterHandler
exports.findByName = findByNameHandler
exports.findByEmail = findByEmailHandler
exports.find = findByIdHandler
