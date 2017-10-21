var http = require('http')
  , express = require('express')
  , bodyParser = require('body-parser')
  , Primus = require('./lib/primus')
  , GoogleOauth = require('./lib/google-oauth')
  , handlers = require('./lib/handlers')
  , PORT = process.env.PORT || 3030
  , GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
  , GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
;

var loginCallback = function (accessToken, refreshToken, profile, done) {
  console.log('LOGGED IN: ', profile);
  done();
};

var app = express();
var server = http.createServer(app);

// parser json body
app.use(bodyParser());

// primus websocket handler
Primus(server, { transformer: 'uws' });

// middleware
GoogleOauth(app, { clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, success: loginCallback });

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.route('/users').get(handlers.user.get);

server.listen(PORT, function () { console.log('Listening on port ' + PORT) });
