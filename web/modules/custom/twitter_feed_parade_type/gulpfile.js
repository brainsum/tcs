'use strict';

const gulp              = require('gulp');
const autoprefixer      = require('autoprefixer');
const postcss           = require('gulp-postcss');
const sass              = require('gulp-sass');
const sourcemaps        = require('gulp-sourcemaps');

const config = {
  paths: {
    sass: './scss/*.scss',
    css: './css/',
    img: './images/',
  }
};

/**
 * SASS:Development Task
 *
 * Sass task for development with live injecting into all browsers
 * @return {object} Autoprefixed CSS files with expanded style and sourcemaps.
 */
function sassDevTask(done) {
  gulp
    .src(config.paths.sass)
    .pipe(sourcemaps.init({ largeFile: true }))
    .pipe(sass({
      outputStyle: 'expanded',
      precision: 10
    }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.paths.css));
  done();
}

/**
 * SASS:Production Task
 *
 * Sass task for production with linting, to be stored in Git (run before
 * commit)
 * @return {object} Autoprefixed, minified, ordered and linted* CSS files without
 * sourcemaps.
 */
function sassProdTask(done) {
  gulp
    .src(config.paths.sass)
    .pipe(sass({
      outputStyle: 'compact',
      precision: 10
    }))
    .on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(gulp.dest(config.paths.css));
  done();
}

// export tasks
exports.default = sassDevTask;
exports.prod = sassProdTask;
