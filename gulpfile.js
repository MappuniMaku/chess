const { parallel, task, series, watch, src, dest } = require("gulp");
const gulpClean = require("gulp-clean");
const eslint = require("gulp-eslint");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();

const { reload } = browserSync;

const paths = {
  ts: ["./src/ts/**/*.ts", "!./src/ts/bundle.ts"],
};

task("build:styles", () => {
  return src("./src/scss/*.scss")
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(concat("styles.min.css"))
    .pipe(dest("./public/"));
});

task("clean", () => {
  return src("dist/*").pipe(
    gulpClean({
      force: true,
    })
  );
});

const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");

task("build:js", () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err);
      }
      if (stats.hasErrors()) {
        return reject(new Error());
      }
      resolve();
      return null;
    });
  });
});

task(
  "eslint",
  parallel(() => {
    return src(paths.ts)
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError());
  })
);

// Configure the browserSync task and watch file path for change
task("watch", (done) => {
  browserSync.init({
    server: {
      baseDir: "./public/",
      directory: false,
      https: false,
    },
    watch: true,
    port: 3000,
    open: true,
    cors: true,
    notify: false,
  });
  watch(
    ["src/scss/*.scss", "src/scss/**/*.scss"],
    series("build:styles", (done) => {
      reload();
      done();
    })
  );
  watch(
    ["src/ts/*.ts", "src/ts/**/*.ts"],
    series("build:js", (done) => {
      reload();
      done();
    })
  );
  watch(["*.html"]).on("change", reload);
  done();
});

task("dev", series("clean", "build:styles", "build:js", "watch"));

task("default", series("dev"));
