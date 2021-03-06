var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r

var protectedAttributes = ['id', 'createdAt'];

var Group = thinky.createModel('Group', {
  id: type.string(),
  name: type.string(),
  description: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Group.ensureIndex('name');
Group.ensureIndex('createdAt');

Group.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Group;