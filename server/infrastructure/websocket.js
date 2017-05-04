'use strict';

const config = require('../configs');
const logger = require('./logger');
const authService = require('../services').authService;
const io = require('socket.io')();
const ioredis = require('socket.io-redis');

const AUTH_TYPE = 'Bearer ';

const isAuthenticated = function(socket, next) {
  const authorization = socket.request.headers.authorization;

  if (authorization && authorization.indexOf(AUTH_TYPE)) {
    const token = authorization.replace(AUTH_TYPE, '');

    authService.isAuthenticated(token, function(err, user) {
      if (err) return next(new Error('Authentication error'));

      socket.user = user;
      next();
    });

  } else {
    return next(new Error('Authentication error'));
  }
};

io.adapter(ioredis({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
}));

io.origins('*:*');

io.on('connection', function(socket) {
  logger.debug(`client ${socket.id} connected`);

  socket.on('test', function(message) {
    logger.debug(`client ${socket.id} test ${message}`);
    socket.emit('message', 'recebi');
  });

  socket.on('disconnect', function() {
    logger.debug(`client ${socket.id} disconnected`);
  });
});

const chat = io.of('/chat');
chat.use(isAuthenticated);

chat.on('connection', function(socket) {
  logger.debug(`user ${socket.user.name} connected`);

  socket.on('disconnect', function() {
    logger.debug(`user ${socket.user.name} disconnected`);
  });
});

const websocket = io;
module.exports = websocket;
