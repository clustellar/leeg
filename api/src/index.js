/* eslint-disable no-console */
const logger = require('winston');
const app = require('./app');
const port = app.get('port');

setTimeout(function () {
  const server = app.listen(port);
  
  process.on('unhandledRejection', (reason, p) =>
    logger.error('Unhandled Rejection at: Promise ', p, reason)
  );
  
  server.on('listening', () =>
    logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
  );
}, 4000);
