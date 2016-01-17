//<gulpfile.js>

//-- VARIAVEIS
var gulp = require('gulp'),
	browserSync = require('browser-sync'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),
	less = require('gulp-less'),
	path = require('path'),
	autoprefixer = require('gulp-autoprefixer'),
	minifyCSS = require('gulp-cssnano'),
	minifyHTML = require('gulp-htmlmin'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	concat = require('gulp-concat'),
	concatCss = require('gulp-concat-css'),
	gulpif = require('gulp-if'),
	LessPluginCleanCSS = require('less-plugin-clean-css'),
    LessPluginAutoPrefix = require('less-plugin-autoprefix'),
    cleancss = new LessPluginCleanCSS({ advanced: true }),
    autoprefix = new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

// -- ARGUMENTOS
var args = require('yargs')
	.default('production', false)
	.alias('p', 'production')
	.argv;

	var isProduction = args.production;

// <TASKS>

// --BROWSER SYNC
	gulp.task('browser-sync', function() {
	  browserSync({
	    server: {
	      baseDir: "./_build"
	    }
	  });
	});



// --STYLES

	// MAIN
	gulp.task('styles:main', function () {
	  return gulp.src('./sources/less/main.less')
	    .pipe(less())
	    .pipe(gulpif(isProduction, less({plugins: [autoprefix, cleancss]})))
	    .pipe(gulp.dest('./_build/sources/css'))
	    .pipe(browserSync.reload({stream:true}))
	});

	// VENDORS
	gulp.task('styles:vendors', function () {
		var src = [
			'./bower_components/bootstrap-css/css/bootstrap.min.css',
		];
	  return gulp.src(src)
	    .pipe(concatCss('vendors.css'))
	    .pipe(gulp.dest('./_build/sources/css'))
	});


	gulp.task('styles', ['styles:main','styles:vendors']);



// --SCRIPTS


	// MAIN
	gulp.task('scripts:main', function() {
		return gulp.src('./sources/js/*.js')
	    .pipe(concat('app.js'))
	    .pipe(gulpif(isProduction, uglify()))
	    .pipe(gulp.dest('./_build/sources/js'))
	    .pipe(browserSync.reload({stream:true}))
	});
	
	// VENDORS
	gulp.task('scripts:vendors', function() {
		var src = [
			'./bower_components/jquery/dist/jquery.min.js',
			'./bower_components/bootstrap-css/js/bootstrap.min.js',
			'./bower_components/jquery-breakpoint-check/js/jquery-breakpoint-check.min.js',
		];

		return gulp.src(src)
	    .pipe(concat('vendors.js'))
	    .pipe(gulp.dest('./_build/sources/js'))
	});

	gulp.task('scripts', ['scripts:main','scripts:vendors']);



// --COPY
	// IMAGES
	gulp.task('copy:images', function () {
	    return gulp.src('./sources/images/**/*.{jpg,png,gif}')
	        .pipe(gulpif(isProduction, imagemin({
		            progressive: true,
		            svgoPlugins: [{removeViewBox: false}],
		            use: [pngquant()]
	        	})))
	        .pipe(gulp.dest('./_build/sources/images'));
	});

	// FONTS
	gulp.task('copy:fonts', function () {
		var extensions = '{eot,svg,ttf,woff,woff2}'
		var src = [
		'./bower_components/bootstrap-css/fonts/*.' + extensions,
		'./sources/fonts/*.' + extensions,
		]

	  return gulp.src(src)
	    .pipe(gulp.dest('./_build/sources/fonts'))
	});

	gulp.task('copy', ['copy:images', 'copy:fonts']);


// -- HMTL
	gulp.task('html', function() {
	  return gulp.src('./sources/html/*.html')
	  	.pipe(gulpif(isProduction, minifyHTML({collapseWhitespace: true})))
	    .pipe(gulp.dest('./_build'))
	    .pipe(browserSync.reload({stream:true}))
	});




// * * EXECUÇÃO

	// --WATCH
	gulp.task('watch', function () {
		var onChange = function(event){
			console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
		}

	   gulp.watch('./sources/less/**/*.less', ['styles:main']).on('change',onChange);
	   gulp.watch('./sources/js/**/*.js', ['scripts:main']).on('change',onChange);
	   gulp.watch('./sources/images/**/*.{jpg,png,gif}', ['copy:images']).on('change',onChange);
	   gulp.watch('./sources/html/*.html', ['html']).on('change',onChange);
	});

	// --START
	gulp.task('start', ['browser-sync', 'watch']);

	// --DEFAULT
	gulp.task('default', ['styles', 'scripts', 'copy', 'html']);