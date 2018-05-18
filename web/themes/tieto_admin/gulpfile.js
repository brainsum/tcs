const gulp = require('gulp');
const path = require('path');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const jsImport = require('gulp-js-import');
const minify = require('gulp-minify');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
 

gulp.task('default', function() {
  gulp.watch('src/js/*.js', ['js']);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/img/*', ['img']);
});

gulp.task('js', function(done) {

  return gulp.src('src/js/*.js')
    .pipe(changed('js'))
    .pipe(jsImport({hideConsole: true}))
    .pipe(minify({
      ext:{
        src:null,
        min:'.js'
      },
      noSource: true
    }))
    .pipe(gulp.dest('js'));
});

gulp.task('sass', function (done) {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'));
});

gulp.task('img', function (done) {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('images'))
});

gulp.task('sync', function() {
  browserSync.init({
      proxy: "project.localhost"
  });
});