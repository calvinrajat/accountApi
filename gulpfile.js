var istanbul = require('gulp-istanbul');
// We'll use mocha in this example, but any test framework will work
var mocha = require('gulp-mocha');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var path     = require('path');
var fs       = require('fs');
var runSequence = require('run-sequence');
var process = require('process');

gulp.task('test', function() {
  return gulp.src(['test/*.js'])
    .pipe(mocha())
    // Creating the reports after tests ran
    .pipe(istanbul.writeReports())
    // Enforce a coverage of at least 90%
    .pipe(istanbul.enforceThresholds({thresholds: {global: 90}}));
});

gulp.task('startServer', function(cb) {
  var app = require('./server/server');
  app.start();
  return cb();
});

gulp.task('stopServer', function(cb) {
  process.exit(1);
  cb('Sever Stopped');
});

gulp.task('eslint', function() {
  var target = path.resolve(__dirname, 'reports');
  return gulp.src(['common/**/*.js', 'server/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format('html', function(results) {
      fs.writeFileSync(target + '/lint-results.html', results);
    }));
  // Break on failure to be super strict
  //.pipe(eslint.failOnError());
});

// default task
gulp.task('default', function(callback) {
  runSequence(
    'eslint',
    'startServer',
    'test',
    'stopServer',
    function(error) {
      if (error) {
        console.log(error.message);
      }
      callback(error);
    });
});
