var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r

var protectedAttributes = ['createdAt']; // will need to protect these on every save

var Membership = thinky.createModel('Membership', {
  id: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Membership.ensureIndex('createdAt')

Membership.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] })
  return attrs
}

module.exports = Membership