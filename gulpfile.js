var gulp = require('gulp'),
  mocha = require('gulp-mocha'),
  gutil = require('gulp-util'),
  notify = require("gulp-notify");


gulp.task('default', function() {
});

gulp.task('mocha', function() {
  return gulp.src(['test/*.js'], {
      read: false
    })
    .pipe(mocha({
      reporter: 'list',
      bail: false
    }))
    .on("error", notify.onError({
        message: 'Some test has failed!',
        sound: true
      }));
});

gulp.task('watch-mocha', function() {
  gulp.watch(['lib/**', 'test/**'], ['mocha']);
});
