'use strict';

const os = require('os');
const uuid = require('uuid');

// mongodb config
const MONGODB_USERNAME = process.env.OPENSHIFT_MONGODB_DB_USERNAME || process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD || process.env.MONGODB_PASSWORD;
const MONGODB_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || process.env.MONGODB_HOST || 'localhost';
const MONGODB_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || process.env.MONGODB_PORT || '27017';
const MONGODB_APP = process.env.OPENSHIFT_APP_NAME || process.env.MONGODB_APP || 'devdatabase';
const MONGODB_AUTH_URL = MONGODB_PASSWORD ? `${MONGODB_USERNAME}:${MONGODB_PASSWORD}@` : '';
const MONGODB_URL = `${MONGODB_AUTH_URL}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_APP}`;

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
  DEVELOPMENT: process.env.NODE_ENV === 'development',

  // cluster
  CLUSTER_NAME: process.env.wkname || 'master',
  CLUSTER_WORKERS: process.env.NODE_CLUSTER_WORKERS || process.env.CLUSTER_WORKERS || os.cpus().length,

  // application
  SERVER_PORT: process.env.PORT || process.env.NODE_PORT || 3000,
  SERVER_HOST: process.env.NODE_IP || 'localhost',

  // redis
  REDIS_PORT: process.env.OPENSHIFT_REDIS_PORT || process.env.REDIS_PORT || '6379',
  REDIS_HOST: process.env.OPENSHIFT_REDIS_HOST || process.env.REDIS_HOST || 'localhost',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,

  // mongo
  MONGODB_USERNAME: MONGODB_USERNAME,
  MONGODB_PASSWORD: MONGODB_PASSWORD,
  MONGODB_HOST: MONGODB_HOST,
  MONGODB_PORT: MONGODB_PORT,
  MONGODB_APP: MONGODB_APP,
  MONGODB_URL: MONGODB_URL,

  // tokens
  JWT_TOKEN: process.env.JWT_TOKEN || uuid.v4(),

  // utils
  STOP_SIGNALS: STOP_SIGNALS,
};
