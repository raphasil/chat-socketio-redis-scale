'use strict';

const middleware = require('./middleware');
const userService = require('../services').userService;
const router = require('express')();
const endpoint = '/api/v1/users';

const init = function(app) {
    router.route('/')
        .get(middleware.isAuthenticated, function(req, res, next) {
            userService.all(req.params, function(err, users) {
                if(err) return next(err);
                res.send({ users: users });
            });
        })
        .post(function(req, res, next) {
            userService.create(req.body, function(err, user) {
                if(err) return next(err);
                if(!user) return next(new Error('service error'));
                res.send({ user: user });
            });
        });

    app.use(endpoint, router);
};

module.exports = {
    init: init,
};
