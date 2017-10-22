var thinky = require('../lib/rdb');
var type = thinky.type;
var r = thinky.r;

var User = thinky.createModel('users', {
  id: type.string(),
  displayName: type.string(),
  email: type.string(),
  gender: type.string(),
  photo: type.string(),
  createdAt: type.date().default(r.now())
})

User.ensureIndex('createdAt');

User.findOrCreate = function (id, attrs) {
  console.log('FIND OR CREATE: ', id);
  return User.get(id).then(function (user) {
    console.log('user already exists', user);
    return user.update(attrs);
  })
  .catch(function (err) {
    console.log('Creating new user...', err);
    var user = new User(attrs);
    return user.save();
  })
}

module.exports = User;