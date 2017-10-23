var thinky = require('../lib/rdb');
var type = thinky.type;
var r = thinky.r;

var User = thinky.createModel('users', {
  id: type.string(),
  displayName: type.string(),
  email: type.string(),
  gender: type.string(),
  photo: type.string(),
  createdAt: type.date().default(r.now()),
  updatedAt: type.date().default(r.now())
})

User.ensureIndex('createdAt');

User.findOrCreate = function (id, attrs) {
  return User.get(id).update(Object.assign({ updatedAt: r.now() }, attrs)).run().error(function (err) {
    if (err instanceof thinky.Errors.DocumentNotFound) {
      var user = new User(Object.assign({ id: id }, attrs)); // if error is document not found, then no user exists and create the new user
      return user.save();
    } else {
      throw new Error(err);
    }
  })
}

module.exports = User;