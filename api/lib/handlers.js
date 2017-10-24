var thinky = require('./rdb')
  , User = require('../models/user')
  , parser = require('./parser')
;

var handlers = {
  user: {
    whoami: function (req, res, next) {
      User.filter({ sessionSecret: req.params.token }).limit(1).run().then(function (resp) {
        res.send(JSON.stringify(resp[0]));
      }).error(handlers.error(res));
    },
    get: function (req, res, next) {
      User.orderBy({ index: 'createdAt' }).limit(1).run().then(function (result) {
        res.send(JSON.stringify(result[0]));
      }).error(handlers.error(res));
    }
  },
  error: function (res) {
    return function (err) {
      res.send(500, { error: err.message });
    }
  }
}

module.exports = handlers;
