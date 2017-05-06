'use strict';

const config = require('./configs');

require('sticky-cluster')(

  // server initialization function
  function(callback) {
    callback(require('./server'));
  },

  // options
  {
    concurrency: config.CLUSTER_WORKERS,
    port: config.SERVER_PORT,
    debug: true,
    prefix: 'worker: ',
    env: function(index) {
      return {
        stickycluster_worker_index: index,
        wkname: `worker ${index + 1}`,
      };
    },
  }
);
