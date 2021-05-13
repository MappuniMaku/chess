const { task, series, watch, src, dest } = require('gulp');

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const { reload } = browserSync;
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

// Compile SCSS(SASS) files
task('scss', () => {
    return src('./src/scss/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(concat('styles.min.css'))
        .pipe(dest('./dist'));
});

task('ts', () => {
    return src('./src/ts/script.ts')
        .pipe(webpackStream(webpackConfig), webpack)
        .pipe(dest('./dist'));
});

// Configure the browserSync task and watch file path for change
task('dev', (done) => {
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
    watch(['src/scss/*.scss', 'src/scss/**/*.scss'], series('scss', (done) => {
        reload();
        done();
    }));
    watch(['src/ts/*.ts', 'src/ts/**/*.ts'], series('ts', (done) => {
        reload();
        done();
    }));
    watch(['*.html']).on('change', reload);
    done();
});

task('default', gulp.series('scss'));