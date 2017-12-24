const gulp = require('gulp'),tinypng= require('gulp-tinypng-nokey');
gulp.task('tinypng',function(){
    gulp.src('src/**/*.{jpg,png}')
    .pipe(tinypng())
    .pipe(gulp.dest('dist/'))
})