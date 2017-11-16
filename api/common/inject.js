module.exports = function (Model, handler) {
  if (!handler || typeof handler !== 'function') {
    console.error('Handler is not a function ', handler)
    throw new Error('Handler is not a function')
  }
  return function (req, res, next) {
    return handler(Model, req, res, next)
  }
}
