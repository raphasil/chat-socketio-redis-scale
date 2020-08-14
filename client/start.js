'use strict';

const cluster = require('cluster');
const logger = require('./infrastructure/logger');
const config = require('./configs');
const production = config.PRODUCTION;
const stopSignals = config.STOP_SIGNALS;
const workerCount = config.CLUSTER_WORKERS;

let stopping = false;

cluster.on('disconnect', function() {
  if (production) {
    if (!stopping) {
      cluster.fork();
    }
  } else {
     process.exit(1);
  }
});

cluster.on('online', function(worker) {
  logger.debug(`Worker ${worker.process.wkname} (${worker.process.pid}) is online`);
});

cluster.on('exit', function(worker, code, signal) {
  logger.debug(
    `Worker ${worker.process.wkname} (${worker.process.pid}) 
    died with code: ${code}, and signal: ${signal}`
  );

  logger.debug('Starting a new worker');

  const wkname = worker.process.wkname;
  const nworker = cluster.fork({ wkname: wkname });
  nworker.process.wkname = wkname;
});

if (cluster.isMaster) {
  logger.debug(`Starting ${workerCount} workers...`);

  for (let i = 0; i < workerCount; i++) {
    const wkname = 'worker ' + (i + 1);
    const worker = cluster.fork({ wkname: wkname });
    worker.process.wkname = worker;
  }

  if (production) {
    stopSignals.forEach(function(signal) {
      process.on(signal, function() {
        logger.debug(`Got ${signal}, stopping workers...`);
        stopping = true;
        cluster.disconnect(function() {
          logger.debug('All workers stopped, exiting.');
          process.exit(0);
        });
      });
    });
  }
} else {
  require('./server');
}
