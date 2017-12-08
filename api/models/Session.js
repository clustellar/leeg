var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r

var protectedAttributes = ['id', 'createdAt'];

var Session = thinky.createModel('Session', {
  id: type.string(),
  name: type.string(),
  description: type.string(),
  startAt: type.date().default(r.now()),
  endAt: type.date().default(r.now() * 90),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Session.ensureIndex('name')
Session.ensureIndex('createdAt')

Session.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Session;