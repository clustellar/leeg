var thinky = require('./rdb')
  , type = thinky.type
  , r = thinky.r
  , User = require('./User')
  , Group = require('./Group')
  , Namespace = require('./Namespace')
  , Leeg = require('./Leeg')
  , Session = require('./Session')

// User.hasAndBelongsToMany(User, "friends", "email", "email")
User.hasAndBelongsToMany(Group, "groups", "email", "email")
User.hasAndBelongsToMany(Leeg, "leagues", "id", "userId")
User.hasAndBelongsToMany(Session, "sessions", "id", "userId")

Group.hasAndBelongsToMany(User, "members", "email", "groupId")
// Group.hasAndBelongsToMany(User, "managers", "email", "groupId")

Leeg.hasMany(Session, "sessions", "id", "sessionId")
Leeg.hasOne(Group, "manager", "id", "groupId")
Leeg.hasAndBelongsToMany(User, "members", "email", "leegId")

Session.belongsTo(Leeg, "leeg", "id", "leegId")
Session.hasAndBelongsToMany(User, "members", "email", "leegId")
Session.hasAndBelongsToMany(User, "managers", "email", "leegId")