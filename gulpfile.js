var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', function () {

    browserSync.init({
        server: "."
    });

    gulp.watch(["./**/*.+(html|css|js)"]).on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src("./styles/**/*.scss")
        .pipe(sourcemaps.init())
        .pipe(sass({
            sourceMap: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./styles"))
    //.pipe(browserSync.stream());
});

gulp.task('default', ['serve']);