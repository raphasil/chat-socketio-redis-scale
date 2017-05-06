'use strict';

const createError = require('../utils').error.createError;
const middleware = require('./middleware');
const authService = require('../services').authService;
const router = require('express')();
const endpoint = '/api/v1/auths';

const configure = function(app) {
    router.route('/')
        .get(middleware.isAuthenticated, function(req, res, next) {
            res.send({ user: req.user });
        })
        .post(function(req, res, next) {
            authService.login(req.body, function(err, user) {
                if(err || !user) return next(createError('username or password invalid', 500, err));
                res.send({ user: user });
            });
        });

    app.use(endpoint, router);
};

module.exports = {
    configure: configure,
};
