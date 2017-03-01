var gulp = require('gulp');
var load = require('gulp-load-plugins')();

gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(load.jshint())
        .pipe(load.uglify())
        .pipe(gulp.dest('dist/js'))
    gulp.src('src/js/src/**/*')
        .pipe(load.jshint())
        .pipe(gulp.dest('dist/js/src'))
    gulp.src('src/js/zrender/**/*')
        .pipe(load.jshint())
        .pipe(gulp.dest('dist/js/zrender'))
});

gulp.task('css', function () {
    gulp.src('src/css/*.css')
        .pipe(load.minifyCss())
        .pipe(gulp.dest('dist/css'))
    gulp.src('src/css/*.scss')
        .pipe(load.sass())
        .pipe(load.minifyCss())
        .pipe(gulp.dest('dist/css'))
});
gulp.task('font', function () {
    gulp.src('src/font/*')
        .pipe(gulp.dest('dist/font'))
});

gulp.task('build', ['html','css', 'js', 'font']);