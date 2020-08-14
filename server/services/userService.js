'use strict';

const async = require('async');
const User = require('../models').user;
const utils = require('../utils');

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
    User.create(user, callback);
};


module.exports = {
    findById: findById,
    findByUserName: findByUserName,
    all: all,
    create: create,
};
