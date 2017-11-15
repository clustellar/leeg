var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r
  , User = require('./User')

var protectedAttributes = ['id', 'createdAt'];

var Group = thinky.createModel('Group', {
  id: type.string(),
  name: type.string(),
  description: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

console.log('GROUP: ', Group)
console.log('USER: ', User)
// Group.hasAndBelongsToMany(User, "members", "email", "groupId")
// Group.hasAndBelongsToMany(User, "managers", "email", "groupId")

Group.ensureIndex('name');
Group.ensureIndex('createdAt');

Group.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Group;