'use strict';

const user = require('./user');
const auth = require('./auth');

const configure = function(app) {
    user.configure(app);
    auth.configure(app);
};

module.exports = {
    configure: configure,
};
