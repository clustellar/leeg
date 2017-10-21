var thinky = require('../lib/rdb');
var type = thinky.type;
var r = thinky.r;

var User = thinky.createModel('users', {
  id: type.string(),
  name: type.string(),
  createdAt: type.date().default(r.now())
})

User.ensureIndex('createdAt');

module.exports = User;