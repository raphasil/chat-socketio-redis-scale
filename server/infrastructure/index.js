'use strict';

module.exports = {
    application: require('./application'),
    logger: require('./logger'),
    mongo: require('./mongodatabase'),
    redis: require('./redisdatabase'),
    websocket: require('./websocket'),
};
