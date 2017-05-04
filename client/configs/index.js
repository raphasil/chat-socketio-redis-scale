'use strict';

const os = require('os');

const STOP_SIGNALS = [
  'SIGHUP',  // Hangup detected on controlling terminal or death of controlling process
  'SIGINT',  // Interrupt from keyboard
  'SIGQUIT', // Quit from keyboard
  'SIGILL',  // Illegal Instruction
  'SIGTRAP', // Trace/breakpoint trap
  'SIGABRT', // Abort signal from cause abnormal process termination
  'SIGBUS',  // Bus error (bad memory access)
  'SIGFPE',  // Floating-point exception
  'SIGUSR1', // User-defined signal 1
  'SIGUSR2', // User-defined signal 2
  'SIGSEGV', // Invalid memory reference
  'SIGTERM', // Termination signal
];

module.exports = {
  // env
  CI: process.env.NODE_ENV === 'build',
  PRODUCTION: process.env.NODE_ENV === 'production',

  // cluster
  CLUSTER_NAME: process.env.wkname || 'master',
  CLUSTER_WORKERS: process.env.NODE_CLUSTER_WORKERS || process.env.CLUSTER_WORKERS || os.cpus().length,

  // application
  SERVER_PORT: process.env.PORT || process.env.NODE_PORT || 3001,
  SERVER_HOST: process.env.NODE_IP || 'localhost',

  // utils
  STOP_SIGNALS: STOP_SIGNALS,
};
