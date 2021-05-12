const { task, series, watch, src, dest } = require('gulp');

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const browserSync = require('browser-sync').create();
const { reload } = browserSync;
const tsProject = ts.createProject('tsconfig.json');

// Compile SCSS(SASS) files
task('scss', () => {
    return src('./src/scss/*.scss', '!variables.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(dest('./dist'));
});

task('ts', () => {
    return tsProject.src()
        .pipe(tsProject())
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