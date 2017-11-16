var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r

var protectedAttributes = ['id', 'createdAt']; // will need to protect these on every save

var Namespace = thinky.createModel('Namespace', {
  name: type.string(),
  subtitle: type.string(),
  logo: type.string(),
  description: type.string(),
  privacy: type.string().default('default'),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Namespace.ensureIndex('name');
Namespace.ensureIndex('subtitle');
Namespace.ensureIndex('createdAt');

Namespace.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Namespace;