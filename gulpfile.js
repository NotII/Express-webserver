// Initialize Modules
var { src, dest, watch, series } = require("gulp");
var sass = require("gulp-sass");
var terser = require("gulp-terser");
var plumber = require("gulp-plumber");
var wait = require("gulp-wait");
var rename = require("gulp-rename");

// File Path Variables
const files = {
  scssPath: "public/assets/scss/styles.scss",
  jsPath: "public/assets/js/scripts.js",
  cssDest: "./public/assets/css",
  jsDest: "./public/assets/js",
};

// SASS
function compileScss() {
  return src(files.scssPath)
    .pipe(wait(250))
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(dest(files.cssDest));
}

// JS
function compileJs() {
  return src(files.jsPath)
    .pipe(
      plumber(
        plumber({
          errorHandler: function (err) {
            console.log(err);
            this.emit("end");
          },
        })
      )
    )
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(dest(files.jsDest));
}

// Watch
function watchFiles() {
  watch(files.jsPath, series(compileJs));
  watch(files.scssPath, series(compileScss));
}

// Default
exports.default = series(compileScss, compileJs, watchFiles);
