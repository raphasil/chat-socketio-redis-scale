'use strict';

const configs = require('../configs');
const events = require('../events');
const logger = require('./logger');
const mongoose = require('mongoose');

// Config promise library
mongoose.Promise = global.Promise;

// Create the database connection
mongoose.connect(configs.MONGODB_URL);

// When successfully connected
mongoose.connection.on('connected', function() {
    logger.debug(`Mongoose default connection open to `, configs.MONGODB_URL);
});

// If the connection throws an error
mongoose.connection.on('error', function(err) {
    logger.debug('Mongoose default connection error: ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    logger.debug('Mongoose default connection disconnected');
});

// When the connection is open
mongoose.connection.on('open', function() {
    logger.debug('Mongoose default connection is open');
});

// If the Node process ends, close the Mongoose connection
events.onShutdown(function() {
    mongoose.connection.close(function() {
        logger.debug('Mongoose default connection disconnected through app termination');
    });
});

const mongodatabase = mongoose;
module.exports = mongodatabase;
