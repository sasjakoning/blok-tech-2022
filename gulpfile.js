function defaultTask(cb) {

  cb();
}

exports.default = defaultTask;

let gulp = require("gulp")  
let webphtml = require("gulp-webp-html-nosvg");

function html(cb) {
    gulp
    .src("./*.html")
    .pipe(webphtml())
    .pipe(gulp.dest("./public/"));

    cb();
}

exports.build = html

// gulp.task("html", function () {
//   gulp
//     .src("./*.html")
//     .pipe(webphtml())
//     .pipe(gulp.dest("./public/"));
// });
