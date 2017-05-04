'use strict';

const user = require('./user');

const init = function(app) {
    user.init(app);
};

module.exports = {
    init: init,
};
