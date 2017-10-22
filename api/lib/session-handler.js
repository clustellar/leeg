var session = require('express-session')
  , connectRedis = require('connect-redis')
  , REDIS_HOST = process.env.REDIS_HOST || 'localhost'
  , REDIS_PORT = process.env.REDIS_PORT || 6379
  , SESSION_SECRET = process.env.SESSION_SECRET || ''
  , SESSION_RETRIES = parseInt(process.env.SESSION_RETRIES) || 3
;

var RedisStore = connectRedis(session);
var sessionMiddleware = session({
  store: new RedisStore({ host: REDIS_HOST, port: REDIS_PORT }),
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
});

module.exports = function () {
  return function (req, res, next) {
    var tries = SESSION_RETRIES;
  
    function lookupSession(error) {
      if (error) {
        return next(error)
      }
  
      tries -= 1;
      
      if (req.session !== undefined) {
        return next();
      }
  
      if (tries < 0) {
        return next(new Error('Could not connect to session store!'));
      }
  
      sessionMiddleware(req, res, lookupSession)
    }
  
    lookupSession()
  }
}
