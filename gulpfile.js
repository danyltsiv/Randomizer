const gulp = require('gulp');
const connect = require('gulp-connect');
const babelify = require("babelify");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");

gulp.task('es6', () => {
  browserify("src/scripts/main.js")
    .transform('babelify',{
	presets:['es2015']
	})
	.bundle()
	.pipe(source('main.js'))
	.pipe(buffer())
    .pipe(gulp.dest("build/scripts/"));
});

gulp.task('default',['server','es6'],
() => {gulp.watch('src/scripts/main.js',['es6'])});

gulp.task('server', function(){
	connect.server({
		port:8000,
		livereload:true
	});
});