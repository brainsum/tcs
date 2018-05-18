const gulp = require('gulp');
const path = require('path');
const exec = require('child_process').exec;
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const each = require('gulp-each');
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
    .pipe(each(function(content, file, callback) {
      let fileName = 'src/js/' + path.basename(file.path);
      exec(`parcel build ${fileName} --out-dir js`, {}, function(error, stdout, stderr) {
        console.log(stdout);
      });
      // the first argument is an error,
      // second is modified file
      callback(null, null);
    }));
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