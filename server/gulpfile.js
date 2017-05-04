'use strict';

// const config = require('./configs');
const logger = require('./infrastructure/logger');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');

gulp.task('lint', () => {
    const files = ['**/*.js', '!node_modules/**', '!public/**'];

    return gulp.src(files)
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('nodemon', function() {
  let stream = nodemon({ script: './start.js',
    ext: 'js',
    ignore: ['node_modules/', 'bower_components/', 'public/'],
    tasks: [] });

  stream
      .on('restart', function() {
        logger.debug('restarted!');
      })
      .on('crash', function() {
        logger.error('Application has crashed!\n');
        stream.emit('restart', 10);  // restart the server in 10 seconds
      });
});

gulp.task('dev', function(callback) {

  runSequence('nodemon',
              callback);

});
