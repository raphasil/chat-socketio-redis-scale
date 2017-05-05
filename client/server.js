'use strict';

const config = require('./configs');
const infrastructure = require('./infrastructure');
const app = infrastructure.application;
const logger = infrastructure.logger;
const events = require('./events');
const http = require('http');

// create server =====================================================
const server = http.createServer(app);

// start server =====================================================
server.listen(config.SERVER_PORT, function() {
  let host = server.address().address;
  let port = server.address().port;

  logger.debug('listening at http://%s:%s', host, port);
});

server.on('error', function(err) {
  logger.debug('server error ', err);
});

events.onShutdown(function() {
  logger.debug('finalizando server');
  server.close();
});

module.exports = server; // expose server
