///////////////////////////////////////////////
/// 			@require   				///////
///////////////////////////////////////////////
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	sass = require('gulp-sass')(require('sass'));
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rigger = require('gulp-rigger'),
	autoprefixer = require('gulp-autoprefixer');

var paths = {
	styles: {
		src: 'app/sass/**/*.sass',
		dest: 'app/css/'
	},
	templates: {
		src: 'app/templates/*.html',
	},
	html: {
		src: 'app/build/*.html',
		dest: 'app/'
	}
};

/////////////////////////////////////////////////
//////  		Tasks					/////////
/////////////////////////////////////////////////
function styles(){
	return gulp.src(paths.styles.src)
	.pipe(plumber())
	.pipe(sass())
    .pipe(autoprefixer({cascade: false}))
    .pipe(gulp.dest(paths.styles.dest));
};

function scripts(){
    gulp.src(['app/js/**/*.js','!app/js/main.min.js'])
    .pipe(uglify())
    .pipe(concat('main.min.js', {newLine: ';'}))
    .pipe(gulp.dest('app/js/'));
};

function html(){
	return gulp.src(paths.html.src)
		.pipe(plumber())
		.pipe(rigger())
		.pipe(gulp.dest(paths.html.dest));
};



////////////////////////////////////////////////
/////               Watch              /////////
////////////////////////////////////////////////

function watch() {
   gulp.watch('app/sass/**/*.sass', styles);
   // gulp.watch('app/js/**/*.js', gulp.series['scripts']);
   gulp.watch('app/build/*.html', html);
   gulp.watch('app/templates/*.html', html);
};

////////////////////////////////////////////////
////////         Default              //////////
////////////////////////////////////////////////

gulp.task('default', gulp.parallel(watch)); // 'scripts'