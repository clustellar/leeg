var Thinky = require('thinky')
  , DB_HOST = process.env.DB_HOST || 'localhost'
  , DB_PORT = process.env.DB_PORT || 28015
  , DB_DATABASE = process.env.DB_DATABASE || 'tdb'
//  , DB_AUTH_KEY = process.env.DB_AUTH_KEY || ''
  , DB_USER = process.env.DB_USER || 'admin'
  , DB_PASS = process.env.DB_PASS || ''
  , DB_TIMEOUT = process.env.DB_TIMEOUT || 20
;

var thinky = Thinky({ host: DB_HOST, port: DB_PORT, db: DB_DATABASE, user: DB_USER, password: DB_PASS });

module.exports = thinky;
