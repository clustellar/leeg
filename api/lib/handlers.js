var thinky = require('./rdb')
  , User = require('../models/user')
  , handleError = require('./error-handler')
;

module.exports = {
  user: {
    get: function (req, res, next) {
      User.orderBy({ index: 'createdAt' }).run().then(function (result) {
        res.send(JSON.stringify(result));
      }).error(handleError(res));
    }
  }
}
