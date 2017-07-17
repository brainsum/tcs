var gulp = require('gulp');
var sass = require('gulp-sass');
var $ = require('gulp-load-plugins')();
var sourcemaps = require('gulp-sourcemaps');

var src = {
  scss: 'scss/**/*.scss',
  css: 'css/'
};

var reportError = function(error) {
  $.notify({
    title: 'Gulp Task Error',
    message: 'Check the console.'
  }).write(error);
  console.log(error.toString());
  this.emit('end');
};

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe($.sourcemaps.init())
    // Convert sass into css
    .pipe($.sass({
      outputStyle: 'expanded', // libsass doesn't support expanded yet
      precision: 3
    }))
    // Show errors
    .on('error', reportError)
    // Autoprefix properties
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 9']
    }))
    // Write sourcemaps
    .pipe($.sourcemaps.write())
    // Save css
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['sass'], function () {
  // Run sass tasks hen a .scss file changes.
  gulp.watch('scss/**/*.scss', ['sass']);
});

