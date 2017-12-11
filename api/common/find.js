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
  console.log('FIND BY LEEG ID: ', req.params)
  req.sequence = req.model.filter({ leegId: req.params.leegId })
  next()
}

var findBySessionIdHandler = function (req, res, next) {
  console.log('FIND BY SESSION ID: ', req.params.sessionId)
  req.sequence = req.model.filter({ sessionId: req.params.sessionId })
  next()
}

var findByGameIdHandler = function (req, res, next) {
  console.log('FIND BY GAME ID: ', req.params.gameId)
  req.sequence = req.model.filter({ gameId: req.params.gameId })
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
exports.findBySessionId = findBySessionIdHandler
exports.findByGameId = findByGameIdHandler
exports.findById = findByIdHandler
