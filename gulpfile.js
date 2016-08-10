'use strict'

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var browserify = require('gulp-browserify');
var minify = require('gulp-minify');
var surge = require('gulp-surge');

gulp.task('default', ['html', 'js', 'css'])

gulp.task('html', function(){
  gulp.src('./templates/*.html')
    .pipe(gulp.dest('./public/templates'));

  return gulp.src('./index.html')
    .pipe(gulp.dest('./public'));
});


gulp.task('js', function(){
  gulp.src('./js/app.js')
    .pipe(browserify())
    .pipe(gulp.dest('./public/js'))
});

gulp.task('css', function(){
  gulp.src('./scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('./public/css'))
});

gulp.task('deploy', [], function () {
  return surge({
    project: './public',         // Path to your static build directory
    domain: 'Mosey.surge.sh'  // Your domain or Surge subdomain
  })
});

gulp.task('watch', function(){
  gulp.watch('./index.html', ['html'])
  gulp.watch('./templates/*.html', ['html'])
  gulp.watch('./templates/*/*.html', ['html'])
  gulp.watch('./js/*.js', ['js'])
  gulp.watch('./js/*/*.js', ['js'])
  gulp.watch('./scss/*.scss', ['css'])
})
