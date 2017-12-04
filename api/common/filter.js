module.exports = function (req, res, next) {
  if (req.query.withFields) {
    req.sequence = req.sequence.withFields(req.query.withFields.split(','))
    next()
  } else {
    req.sequence = req.sequence.without('logo')
    next()
  }
}
