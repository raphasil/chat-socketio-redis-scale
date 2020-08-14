'use strict';

const logger = require('../infrastructure').logger;

module.exports = {
  options: {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
      transform: function(doc, ret, options) {
        if (!ret.id && ret._id) {
          ret.id = ret._id;
        }
      },
    },
  },

  handdleError: function(txt, error, res, next) {
    if(error) {
      logger.error(txt, error);
    }

    next(error, res);
  },
};
