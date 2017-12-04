module.exports = function (req, res, next) {
  console.log(req.method.toUpperCase(), ' -> ', req.originalUrl)
  next()
}
