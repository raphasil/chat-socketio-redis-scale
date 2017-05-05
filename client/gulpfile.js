'use strict';

// const config = require('./configs');
const logger = require('./infrastructure/logger');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const uglify = require('gulp-uglify');
const minifier = require('gulp-uglify/minifier');
const inject = require('gulp-inject');
const concat = require('gulp-concat');
const print = require('gulp-print');
const del = require('del');
const runSequence = require('run-sequence');

const paths = {
    vendors: './public/vendors/',
    build: './public/build/',
    cssVendors: './public/vendors/css',
    jsVendors: './public/vendors/js',
    jsApp: './public/build/js',
};

const files = {
    index: './public/index.html',
    cssVendors: [
        'node_modules/angular-material/angular-material.min.css',
    ],
    jsVendors: [
        'node_modules/angular/angular.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        'node_modules/angular-messages/angular-messages.min.js',
        'node_modules/angular-aria/angular-aria.min.js',
        'node_modules/angular-material/angular-material.min.js',
        'node_modules/angular-material-icons/angular-material-icons.min.js',
        'node_modules/socket.io-client/dist/socket.io.min.js',
        'node_modules/angular-socket-io/socket.min.js',
    ],
    jsApp: [
        './public/js/modules/**/*.js',
        './public/js/app.js',
        './public/js/services/**/*.js',
        './public/js/directives/**/*.js',
        './public/js/controllers/**/*.js',
    ],
};

gulp.task('lint', () => {
    const files = ['**/*.js', '!node_modules/**'];

    return gulp.src(files)
        .pipe(eslint({ fix: true }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('clean-vendors', function() {
    return del([paths.vendors, paths.jsApp]);
});

gulp.task('setup-vendors-css', function() {
    const target = gulp.src(files.index);

    const cssVendor = gulp.src(files.cssVendors);

    return target
        .pipe(inject(
            cssVendor.pipe(print())
                .pipe(concat('vendor.css'))
                .pipe(gulp.dest(paths.cssVendors)), { name: 'vendors_css', relative: true })
        )
        .pipe(gulp.dest('./public'));
});

gulp.task('setup-vendors-js', function() {
    const target = gulp.src(files.index);

    const jsVendor = gulp.src(files.jsVendors);

    return target
        .pipe(inject(
            jsVendor.pipe(print())
                .pipe(concat('vendors.js'))
                .pipe(gulp.dest(paths.jsVendors)), { name: 'vendors_js', relative: true }))
        .pipe(gulp.dest('./public'));
});

gulp.task('setup-app-js', function() {
    const target = gulp.src(files.index);

    const jsApp = gulp.src(files.jsApp);

    return target
        .pipe(inject(
            jsApp.pipe(print())
            , { name: 'app_js', relative: true }))
        .pipe(gulp.dest('./public'));
});

gulp.task('setup-prod-app-js', function() {
    const target = gulp.src(files.index);

    const jsApp = gulp.src(files.jsApp);

    return target
        .pipe(inject(
            jsApp.pipe(print())
                .pipe(concat('app.js'))
                .pipe(gulp.dest(paths.jsApp))
            , { name: 'app_js', relative: true }))
        .pipe(gulp.dest('./public'));
});

gulp.task('nodemon', function() {
    let stream = nodemon({
        script: './start.js',
        ext: 'js',
        ignore: ['node_modules/', 'bower_components/', 'public/'],
        tasks: ['lint'],
    });

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

    runSequence('clean-vendors',
        'setup-app-js',
        'setup-vendors-js',
        'setup-vendors-css',
        'nodemon',
        callback);

});

gulp.task('setup-prod', function(callback) {

    runSequence('clean-vendors',
        'setup-prod-app-js',
        'setup-vendors-js',
        'setup-vendors-css',
        callback);

});
