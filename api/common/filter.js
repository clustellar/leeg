var withFieldsHandler = function (req, res, next) {
  req.sequence = req.sequence.withFields(req.query.withFields)
  next()
}

var pluckHandler = function (req, res, next) {
  req.sequence = req.sequence.pluck(req.query.pluck)
  next()
}

var leegHandler = function (req, res, next) {
  req.sequence = req.sequence.without('logo')
  next()
}

var defaultHandler = function (req, res, next) {
  next()
}

exports.withFields = withFieldsHandler
exports.pluck = pluckHandler
exports.leeg = leegHandler
exports.default = defaultHandler
