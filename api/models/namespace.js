var thinky = require('./rdb');
var uuid = require('uuid/v4');
var type = thinky.type;
var r = thinky.r;

var protectedAttributes = ['id', 'createdAt']; // will need to protect these on every save

var Namespace = thinky.createModel('namespaces', {
  name: type.string(),
  subtitle: type.string(),
  logo: type.string(),
  description: type.string(),
  privacy: type.string().default('default'),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
}, { pk: 'name' })

Namespace.ensureIndex('name');
Namespace.ensureIndex('subtitle');
Namespace.ensureIndex('createdAt');

Namespace.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Namespace;