'use strict';

const configs = require('../configs');
const events = require('events');
const control = new events.EventEmitter();

const SHUTDOWN = 'global::shutdown';

// end process
configs.STOP_SIGNALS.forEach(function(signal) {
    process.on(signal, function() {
        control.emit(SHUTDOWN);
        const logger = require('../infrastructure').logger;
        logger.debug(`Got ${signal}, stopping...`);
        process.exit(1);
    });
});

const onShutdown = function(fn) {
    control.once(SHUTDOWN, fn);
};

module.exports = {
    onShutdown: onShutdown,
};

