'use strict';
 
const gulp = require('gulp');
const sass = require('gulp-sass');
const svgo = require('gulp-svgo');
 
sass.compiler = require('sass');
 
gulp.task('sass', function () {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('svg', () => {
    return gulp.src('svg/*')
        .pipe(svgo())
        .pipe(gulp.dest('dest/svg'));
});