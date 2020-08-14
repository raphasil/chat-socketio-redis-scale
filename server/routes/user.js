'use strict';

const createError = require('../utils').error.createError;
const middleware = require('./middleware');
const userService = require('../services').userService;
const router = require('express')();
const endpoint = '/api/v1/users';

const configure = function(app) {
    router.route('/')
        .get(middleware.isAuthenticated, function(req, res, next) {
            userService.all(req.params, function(err, users) {
                if(err) return next(err);
                res.send({ users: users });
            });
        })
        .post(function(req, res, next) {
            userService.create(req.body, function(err, user) {
                if(err || !user) return next(createError('Service Error', 500, err));
                res.send({ user: user });
            });
        });

    app.use(endpoint, router);
};

module.exports = {
    configure: configure,
};
