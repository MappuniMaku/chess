const { series, watch } = require('gulp');

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

function scss(cb) {
    gulp.src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
    cb();
}

function browsersync(cb) {
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
    if (cb) {
        cb();
    }
}

exports.default = function() {
    browsersync();
    watch('./src/scss/*.scss', series(scss, browsersync));
};