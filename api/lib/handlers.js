var thinky = require('./rdb')
  , User = require('../models/user')
  , parser = require('./parser')
  , handleError = require('./error-handler')
;

var handlers = {
  user: {
    get: function (req, res, next) {
      User.orderBy({ index: 'createdAt' }).run().then(function (result) {
        res.send(JSON.stringify(result));
      }).error(handleError(res));
    }
  }
}

module.exports = handlers;
