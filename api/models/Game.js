var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r

var protectedAttributes = ['id', 'createdAt'];

var Game = thinky.createModel('Game', {
  id: type.string(),
  name: type.string(),
  description: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

Game.ensureIndex('name');
Game.ensureIndex('createdAt');

Game.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] });
  return attrs
}

module.exports = Game;