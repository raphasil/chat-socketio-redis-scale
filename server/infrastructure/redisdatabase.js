'use strict';

const events = require('../events');
const config = require('../configs');
const logger = require('./logger');
const redis = require('redis');
const client = redis.createClient({
  port: config.REDIS_PORT,
  host: config.REDIS_HOST,
  password: config.REDIS_PASSWORD,
});

client.on('connect', function() {
    logger.debug('Redis default connection open');
});

client.on('ready', function() {
    logger.debug('Redis default connection established');
});

client.on('reconnecting', function() {
    logger.debug('Redis default connection reconnecting');
});

client.on('end', function() {
    logger.debug('Redis default connection disconnected');
});

client.on('error', function(err) {
    logger.debug('Redis default connection error: ' + err);
});

events.onShutdown(function() {
    client.end(true);
});

client.set('connection:count', 0);

const redisdatabase = client;
module.exports = redisdatabase; // expose client
