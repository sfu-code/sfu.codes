var gulp = require('gulp');
var sass = require('gulp-sass');
var child = require('child_process');
var log = require('fancy-log');
var browserSync = require('browser-sync').create();

let scssPath = './_scss/*.scss';
let siteRoot = '_site';

gulp.task('jekyll', function() {
    var jekyll = child.spawn('jekyll', [
        'build',
        '--watch',
        '--incremental',
        '--drafts'
    ]);

    var jekyllLogger = function(buffer) {
      buffer.toString()
        .split(/\n/)
        .forEach(function(message){ log('Jekyll: ' + message);});
    };

    jekyll.stdout.on('data', jekyllLogger);
    jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('scss', function () {
  return gulp.src('./_scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('serve', function() {
    browserSync.init({
      files: [siteRoot + '/**'],
      port: 4000,
      server: {
        baseDir: siteRoot
      }
    });
    gulp.watch(scssPath, gulp.series('scss'));
  });

gulp.task('default', gulp.parallel('jekyll', 'serve'));
