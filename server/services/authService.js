'use strict';

const async = require('async');
const utils = require('../utils');
const User = require('../models').user;

const isAuthenticated = function(token, callback) {

    const _findById = function(decode, next) {
        User.findById(decode.id, '-password', next);
    };

    const seq = async.seq(utils.security.checkJwt, _findById);

    seq(token, callback);
};

const login = function(form, callback) {

    const _verifyPassword = function(user, next) {
        user.verifyPassword(form.password, function(perr, valid) {

            if (perr) return next(utils.error.createError('invalid password', 500, perr));

            if (!valid) {
                return next(utils.error.createError('invalid password'));
            }

            User.findById(user.id || user._id, '-password', next);
        });
    };

    const _createToken = function(user, next) {
        utils.security.createJwt({ id: user.id || user._id }, function(err, token) {
            next(err, { user: user, token: token } );
        });
    };

    const seq = async.seq(User.findOne, _verifyPassword, _createToken);

    seq({ username: form.username }, callback);
};

module.exports = {
    isAuthenticated: isAuthenticated,
    login: login,
};
