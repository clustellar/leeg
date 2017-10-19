const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const feathers = require('feathers');
const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');

// const primus = require('feathers-primus');
const socketio = require('feathers-socketio');
const handler = require('feathers-errors/handler');
const notFound = require('feathers-errors/not-found');
const rest = require('feathers-rest');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const rethinkdb = require('./rethinkdb');
const authentication = require('./authentication');
const connected = require('./middleware/connected');

const app = feathers();

// Load app configuration
app.configure(configuration());
app.use(rest());
app.use(cors());
app.use(helmet());
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', feathers.static(app.get('public')));

// Set up Plugins and providers
app.configure(hooks());

app.configure(rethinkdb);

// app.configure(primus({ transformer: 'websockets' }));
app.configure(socketio(function (io) { connected(io, app) }))
// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Configure a middleware for 404s and the error handler
app.use(notFound());
app.use(handler());

app.hooks(appHooks);

module.exports = app;
