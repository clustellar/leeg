var thinky = require('./rdb');
var uuid = require('uuid/v4');
var type = thinky.type;
var r = thinky.r;

var protectedAttributes = ['id', 'createdAt']; // will need to protect these on every save

var Group = thinky.createModel('groups', {
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