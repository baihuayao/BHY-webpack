const gulp = require('gulp'), smushit = require('gulp-smushit');
gulp.task('default', function () {
    return gulp.src('src/**/*.{jpg,png}')
        .pipe(smushit({
            verbose: true    // 显示压缩率统计信息
        }))
        .pipe(gulp.dest('dist/img'));
});