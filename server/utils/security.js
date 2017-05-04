'use strict';

const configs = require('../configs');
const jwt = require('jsonwebtoken');

const createJwt = function(data, callback) {
  jwt.sign(data, configs.JWT_TOKEN, { expiresIn: '1d' }, callback);
};

const checkJwt = function(token, callback) {
  jwt.verify(token, configs.JWT_TOKEN, callback);
};

module.exports = {
    createJwt: createJwt,
    checkJwt: checkJwt,
};
