const gulp = require('gulp'), smushit = require('gulp-smushit');
gulp.task('smushit', function () {
    return gulp.src('src/img/*/*')
        .pipe(smushit({
            verbose: true    // 显示压缩率统计信息
        }))
        .pipe(gulp.dest('dist/img'))
})