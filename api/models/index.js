var thinky = require('./rdb')
  , type = thinky.type
  , r = thinky.r
  , User = require('./User')
  , Group = require('./Group')
  , Namespace = require('./Namespace')
  , Leeg = require('./Leeg')
  , Session = require('./Session')
  , Membership = require('./Membership')
  , Team = require('./Team')
  , Game = require('./Game')

/*
 * Model.hasOne(OtherModel, fieldName, leftKey, rightKey[, options]);
 * Model.belongsTo(OtherModel, fieldName, leftKey, rightKey[, options]);
 * Model.hasMany(OtherModel, fieldName, leftKey, rightKey[, options]);
 * Model.hasAndBelongsToMany(OtherModel, fieldName, leftKey, rightKey[, options]);
 */

// User.hasAndBelongsToMany(User, "friends", "email", "email")
User.hasAndBelongsToMany(Group, "groups", "id", "id")
User.hasAndBelongsToMany(Leeg, "leagues", "id", "id")
User.hasAndBelongsToMany(Session, "sessions", "id", "id")
User.hasMany(Membership, "memberships", "id", "id")

Group.hasAndBelongsToMany(User, "members", "id", "id")
// Group.hasAndBelongsToMany(User, "managers", "email", "groupId")

Leeg.hasMany(Session, "sessions", "id", "id")
Leeg.hasOne(Group, "manager", "id", "id")
Leeg.hasAndBelongsToMany(User, "members", "id", "id")

Session.belongsTo(Leeg, "leeg", "id", "id")
Session.hasAndBelongsToMany(Team, "teams", "id", "id")

Game.belongsTo(Session, "session", "id", "id")
Game.hasAndBelongsToMany(Team, "teams", "id", "id")

Team.hasAndBelongsToMany(Game, "games", "id", "id")
Team.hasAndBelongsToMany(User, "members", "id", "id")
Team.hasAndBelongsToMany(User, "managers", "id", "id")

Membership.belongsTo(User, "user", "id", "id")