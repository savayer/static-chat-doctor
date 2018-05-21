var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	sass = require('gulp-sass'),
	livereload = require('gulp-livereload'),
	connect = require('gulp-connect'),
	babel = require('gulp-babel');

gulp.task('connect', function() {
	connect.server({
		root: 'app',
		livereload: true
	})
})

gulp.task('convertCss', function() {
    gulp.src('app/css/styles.scss')
		.pipe(sass())
		.pipe(gulp.dest("app/css"))
		.pipe(connect.reload())
	gulp.src('app/css/styles.css')
    	.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('app/css/min'))
		.pipe(connect.reload())
});

gulp.task('babel', function() {
    gulp.src('src/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('app/js'))
		.pipe(connect.reload())
});

gulp.task('html', function() {
	gulp.src('app/index.html')
		.pipe(connect.reload())
});

gulp.task('default', ['watch', 'convertCss', 'html', 'connect', 'babel']);

gulp.task('watch', function() {
	gulp.watch('app/css/styles.scss', ['convertCss']);
	gulp.watch('app/index.html', ['html']);
	gulp.watch('src/main.js', ['babel']);
});