'use strict';

const _ = require('lodash');
const configs = require('../configs');
const moment = require('moment');
const winston = require('winston');

const transports = [
  new winston.transports.Console({
      level: 'silly',
      handleExceptions: true,
      // json: true,
      colorize: true,
      timestamp: function() {
        return moment().format();
      },
      formatter: function(options) {
        const time = options.timestamp();
        const name = configs.CLUSTER_NAME;
        const level = options.level.toUpperCase();
        const message = options.message || '';
        const meta = options.meta || '';

        if(_.isString(meta)) {
          return `[${name}][${time}][${level}] - ${message} ${meta} `;
        } else if(_.isObject(meta) && Object.keys(meta).length) {
          return `[${name}][${time}][${level}] - ${message} \n${JSON.stringify(meta, null, 4)}`;
        } else {
          return `[${name}][${time}][${level}] - ${message}`;
        }
      },
    }),
];

const logger = new (winston.Logger)({
  transports: transports,
  exitOnError: false,
});

logger.custom = {
  transports: transports,
};

module.exports = logger;


