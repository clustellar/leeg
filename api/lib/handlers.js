var thinky = require('./rdb')
  , User = require('../models/user')
  , parser = require('./parser')
;

var handlers = {
  user: {
    whoami: function (req, res, next) {
      if (!req.query.token) {
        return res.send(null);
      }
      User.filter({ sessionSecret: req.query.token }).run().then(function (resp) {
        if (resp.length === 1) {
          return res.send(JSON.stringify(resp[0]));
        } else {
          res.send(null);
        }
      }).error(handlers.error(res));
    },
    get: function (req, res, next) {
      User.orderBy({ index: 'createdAt' }).run().then(function (result) {
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
