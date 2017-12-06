module.exports = function (req, res, next) {
  if (req.query.withFields) {
    console.log('WITH FIELDS: ', req.query.withFields.split(','))
    req.sequence = req.sequence.withFields(req.query.withFields)
    next()
  } else if (req.query.pluck) {
    console.log('PLUCK: ', req.query.pluck)
    req.sequence = req.sequence.pluck(req.query.pluck)
    next()
  } else {
    req.sequence = req.sequence.without('logo')
    next()
  }
}
