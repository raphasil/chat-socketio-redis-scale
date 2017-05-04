'use strict';

const createError = function(message, status, err) {
    let error = new Error(message);
    error.status = status;
    error.details = err;
    return error;
};

module.exports = {
    createError: createError,
};
