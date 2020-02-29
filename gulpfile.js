///////////////////////////////////////////////
/// 			@require   				///////
///////////////////////////////////////////////
var gulp = require('gulp'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rigger = require('gulp-rigger'),
	autoprefixer = require('gulp-autoprefixer');


/////////////////////////////////////////////////
//////  		Tasks					/////////
/////////////////////////////////////////////////
gulp.task('sass', function(){
	gulp.src('app/sass/style.sass')
    .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 10 version'], cascade: false}))
    .pipe(gulp.dest('app/css/'));
});

gulp.task('scripts', function(){
    gulp.src(['app/js/**/*.js','!app/js/main.min.js'])
    .pipe(uglify())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulp.dest('app/js/'));
});

gulp.task('html', function(){
	gulp.src('app/build/*.html')
	.pipe(rigger())
	.pipe(gulp.dest('app/'));
});



////////////////////////////////////////////////
/////               Watch              /////////
////////////////////////////////////////////////

gulp.task('watch', function () {
   gulp.watch('app/sass/**/*.sass', gulp.series['sass']);
   // gulp.watch('app/js/**/*.js', gulp.series['scripts']);
   gulp.watch('app/build/*.html', gulp.series['html']);
   gulp.watch('app/templates/*.html', gulp.series['html']);
});

////////////////////////////////////////////////
////////         Default              //////////
////////////////////////////////////////////////

gulp.task('default', gulp.parallel('watch', 'sass', 'html')); // 'scripts'
