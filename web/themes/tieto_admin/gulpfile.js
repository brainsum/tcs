const gulp = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const Parcel = require('parcel-bundler');

const paths = {
    scripts: {
        src: 'src/js/*.js',
        dest: 'js',
    },
    styles: {
        src: 'src/scss/*.scss',
        dest: 'css',
    },
    images: {
        src: 'src/img/*',
        dest: 'images',
    }
}

async function scripts() {
    const parcel = new Parcel(paths.scripts.src, {watch: true, minify: true, outDir: './js', publicUrl: './'});

    parcel.on('buildEnd', () => {
        console.log('Scripts bundled.')
    });

    return await parcel.bundle();
}

function styles () {
    return gulp.src(paths.styles.src, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'expanded', linefeed: 'lf' }).on('error', sass.logError))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
    return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest))
}

function watch() {
    scripts();
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.images.src, images);
}

exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;

exports.default = watch;
