var gulp = require('gulp');
var connect = require('gulp-connect');

// Static Server + watching scss/html files
gulp.task('livereload', function () {
    gulp.src('').pipe(connect.reload());
});

gulp.task('default', function () {
    connect.server({
        livereload: true,
        port: 5001
    });

    gulp.watch(["./**/*.+(html|css|js)", "!./gulpfile.js"], ['livereload']);
});
