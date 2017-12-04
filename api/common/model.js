module.exports = function (Model) {
  return function (req, res, next) {
    req.model = Model
    next()
  }
}
