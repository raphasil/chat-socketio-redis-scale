'use strict';

const async = require('async');
const User = require('../models').user;

const findById = function(id, callback) {
    User.findById(id, '-password', callback);
};

const findByUserName = function(username, scope, callback) {
    User.findOne({ username: username }, '-password', callback);
};

const all = function(param, callback) {
    User.find({}, '-password', callback);
};

const create = function(user, callback) {
    User.create(user, function(err, result) {
        if (err || !result) return callback(new Error('error user create'));
        callback(null, result);
    });
};

const verifyPassword = function(username, password, callback) {

    const _verifyPassword = function(user, next) {
        user.verifyPassword(password, function(perr, valid) {

            if (perr) return next(perr);

            if (!valid) {
                return next(new Error('invalid password'));
            }

            findById(user._id, next);
        });
    };

    let seq = async.seq(User.findOne, _verifyPassword);

    seq({ username: username }, callback);
};

module.exports = {
    findById: findById,
    findByUserName: findByUserName,
    verifyPassword: verifyPassword,
    all: all,
    create: create,
};
