var gulp = require('gulp');
var sass = require('gulp-sass');
var child = require('child_process');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

let scssPath = './scss/**/*.scss';
let siteRoot = '_site';

gulp.task('jekyll', function() {
    var jekyll = child.spawn('jekyll', ['build', '--watch']);

    var jekyllLogger = function(buffer) {
      buffer.toString()
        .split(/\n/)
        .forEach(function(message){ gutil.log('Jekyll: ' + message);});
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('scss', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./_site/css'));
});

gulp.task('serve', function() {
    browserSync.init({
      files: [siteRoot + '/**'],
      port: 4000,
      server: {
        baseDir: siteRoot
      }
    });
    gulp.watch(scssPath, ['scss']);
  });

gulp.task('default', [ 'jekyll', 'serve' ]);
