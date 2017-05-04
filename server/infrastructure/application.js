'use strict';

// modules =================================================
const logger = require('./logger');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');
const helmet = require('helmet');
const winston = require('winston');
const expressWinston = require('express-winston');
const cookieParser = require('cookie-parser');
const routes = require('../routes');

const app = express();

// secure express apps by setting various HTTP headers
app.use(helmet());

// user cookie parse
app.use(cookieParser());

// get all data/stuff of the body (POST) parameters
// ===========================================
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(path.join(__dirname, '../public')));

// cors
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, PUT, PATCH, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

app.use(expressWinston.logger({
  transports: logger.custom.transports,

  // Use the default Express/morgan request formatting. Enabling this will override any msg if true.
  // Will only output colors with colorize set to true
  expressFormat: true,

  // Color the text and status code,
  // using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  colorize: true,

}));

// routes ==================================================
routes.init(app); // pass our application into our routes

// morgan ====================================================
app.use(expressWinston.errorLogger({
  transports: logger.custom.transports,
}));

// catch generic error ==================================================
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// catch 422 and forward to error handler
app.use(function(err, req, res, next) {
  if (err.name && err.name === 'ValidationError') {
    let error = new Error('Unprocessable Entity');
    error.status = 422;
    error.details = err.errors;
    next(error);
  } else {
    next(err);
  }
});

// catch generic error handler
app.use(function(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  let result = {
    message: err.message,
    status: err.status || 500,
    details: err.details,
  };

  if (app.get('env') === 'development') {
    result.stack = err.stack;
  }

  res.status(result.status);

  res.json(result);
});

const application = app;
module.exports = application; // expose app
