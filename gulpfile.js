const { task, series, watch } = require('gulp');

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const { reload } = browserSync;

// Compile SCSS(SASS) files
task('scss', function compileScss() {
    return gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

// Configure the browserSync task and watch file path for change
task('dev', function browserDev(done) {
    browserSync.init({
        server: {
            baseDir: './',
            directory: false,
            https: false,
        },
        watch: true,
        port: 8083,
        open: true,
        cors: true,
        notify: false
    });
    watch(['src/scss/*.scss','src/scss/**/*.scss'], series('scss', function cssBrowserReload (done) {
        reload();
        done();
    }));
    watch(['*.html']).on('change', reload);
    done();
});

task('default', gulp.series('scss'));