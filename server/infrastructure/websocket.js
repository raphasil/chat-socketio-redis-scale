'use strict';

const config = require('../configs');
const logger = require('./logger');
const authService = require('../services').authService;
const socketio = require('socket.io');
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


const init = function(server) {

  const io = socketio(server, { path: '/ws' });

  io.adapter(ioredis({
    port: config.REDIS_PORT,
    host: config.REDIS_HOST,
    password: config.REDIS_PASSWORD,
  }));

  io.origins('*:*');

  io.on('connection', function(socket) {
    logger.debug(`client default ${socket.id} connected`);

    socket.on('test', function(message) {
      logger.debug(`client default ${socket.id} test ${message}`);
      socket.emit('message', 'default recebi');
    });

    socket.on('disconnect', function() {
      logger.debug(`client default ${socket.id} disconnected`);
    });
  });

  const ws = io.of('/ws');
  ws.on('connection', function(socket) {
    logger.debug(`client ws ${socket.id} connected`);

    socket.on('test', function(message) {
      logger.debug(`client ws ${socket.id} test ${message}`);
      socket.emit('message', 'ws recebi');
    });

    socket.on('disconnect', function() {
      logger.debug(`client ws ${socket.id} disconnected`);
    });
  });

  const chat = io.of('/ws/chat');
  chat.use(isAuthenticated);
  chat.on('connection', function(socket) {
    logger.debug(`user chat ${socket.user.name} connected`);

    socket.on('disconnect', function() {
      logger.debug(`user chat ${socket.user.name} disconnected`);
    });
  });

};

module.exports = {
  init: init,
};
