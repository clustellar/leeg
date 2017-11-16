var thinky = require('./rdb')
  , uuid = require('uuid/v4')
  , type = thinky.type
  , r = thinky.r
  , Group = require('./Group')

var protectedAttributes = ['sessionSecret', 'createdAt']; // will need to protect these on every save

var User = thinky.createModel('User', {
  id: type.string(),
  displayName: type.string(),
  email: type.string(),
  gender: type.string(),
  photo: type.string(),
  sessionSecret: type.string().default(uuid),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

User.hasAndBelongsToMany(User, "friends", "email", "email")
User.hasAndBelongsToMany(Group, "groups", "email", "email")

User.ensureIndex('email')
User.ensureIndex('createdAt')
User.ensureIndex('sessionSecret')

User.cleanAttributes = function (attrs) {
  protectedAttributes.forEach(function (attr) { delete attrs[attr] })
  return attrs
}

User.findOrCreate = function (email, attrs) {
  User.cleanAttributes(attrs)
  return User.get(email).update(Object.assign({ updatedAt: r.now() }, attrs)).run().error(function (err) {
    if (err instanceof thinky.Errors.DocumentNotFound) {
      var user = new User(Object.assign({ email: email }, attrs)) // if error is document not found, then no user exists and create the new user
      return user.save()
    } else {
      throw new Error(err)
    }
  })
}

module.exports = User