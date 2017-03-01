var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

gulp.task('scripts',function(){
	gulp.src('js/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest('js/build'));
});

gulp.task('default',function(){
	gulp.src('js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('default'))
});
