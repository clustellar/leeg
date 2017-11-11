var express = require('express')
  , http = require('http')
  , app = express()
  , bodyParser = require('body-parser')
  , cors = require('cors')
  , Primus = require('./middlewares/primus')
  , authHandler = require('./middlewares/auth')
  , sessionHandler = require('./middlewares/session')
  , port = process.env.PORT || 3030

var server = http.createServer(app);

app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(sessionHandler());  // setup custom session handler with redis
authHandler(app);           // auth handler (oauth google)
app.use('/api', require('./controllers'))

// primus websocket handler
app.primus = Primus(server, { transformer: 'websockets' });

server.listen(port, function() {
  console.log('Listening on port ' + port)
})