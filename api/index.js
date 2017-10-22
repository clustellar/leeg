var http = require('http')
  , express = require('express')
  , bodyParser = require('body-parser')
  , Primus = require('./lib/primus')
  , sessionHandler = require('./lib/session-handler')
  , authHandler = require('./lib/auth-handler')
  , handlers = require('./lib/handlers')
  , PORT = process.env.PORT || 3030
;

var app = express();
var server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(sessionHandler());  // setup custom session handler with redis
authHandler(app);           // auth handler (oauth google)

// primus websocket handler
Primus(server, { transformer: 'uws' });

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.route('/users').get(handlers.user.get);

server.listen(PORT, function () { console.log('Listening on port ' + PORT) });
