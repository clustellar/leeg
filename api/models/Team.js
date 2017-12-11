var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r

var protectedAttributes = ['id', 'createdAt'];

var Team = thinky.createModel('Team', {
  id: type.string(),
  name: type.string(),
  description: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Team.ensureIndex('name');
Team.ensureIndex('createdAt');

Team.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Team;