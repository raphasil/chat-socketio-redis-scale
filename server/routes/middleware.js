'use strict';

const createError = require('../utils').error.createError;
const authService = require('../services').authService;

const AUTH_TYPE = 'Bearer ';

const isAuthenticated = function(req, res, next) {
    const authorization = req.headers.authorization;

    if (authorization && authorization.indexOf(AUTH_TYPE)) {
        const token = authorization.replace(AUTH_TYPE, '');

        authService.isAuthenticated(token, function(err, user) {
            if (err) return next(createError('Authentication error', 401, err));
            req.user = user;
            next();
        });

    } else {
        return next(createError('Authentication error', 401));
    }
};

module.exports = {
    isAuthenticated: isAuthenticated,
};
