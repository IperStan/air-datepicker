var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clone = require('gulp-clone');
var wrap = require('gulp-wrap');
var concat = require('gulp-concat');

module.exports = function buildJs(cb) {
  var stream = gulp.src([
    'src/js/datepicker.js',
    'src/js/body.js',
    'src/js/navigation.js',
    'src/js/timepicker.js'
  ])
    .pipe(concat('datepicker.js'))
    .pipe(wrap(';(function (window, $, undefined) { <%=contents%> })(window, jQuery);'));

  stream.pipe(clone())
    .pipe(gulp.dest('dist/js'));

  stream.pipe(clone())
    .pipe(uglify())
    .pipe(rename('datepicker.min.js'))
    .pipe(gulp.dest('dist/js'));

  cb();
};