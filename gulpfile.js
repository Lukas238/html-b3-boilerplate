var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    header  = require('gulp-header'),
    rename = require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	changed = require('gulp-changed'),
	package = require('./package.json');
	

var cfg = {
	src: './src',
	dist: './dist',
	vendors: './src/vendors'
}

var banner = [
  '/*!\n' +
  ' * <%= package.title %>\n' +
  ' * <%= package.url %>\n' +
  ' * @author <%= package.author %>\n' +
  ' * @version <%= package.version %>\n' +
  ' * Copyright ' + new Date().getFullYear() + '. <%= package.license %> licensed.\n' +
  ' */',
  '\n'
].join('');



gulp.task('html', function () {
	/* HTML */
	gulp.src(cfg.src+'/*.html')
	.pipe(changed(cfg.dist))
	.pipe(gulp.dest(cfg.dist));
});

gulp.task('css', function () {
	
	gulp.src(cfg.src+'/scss/styles.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({
		style: 'compressed',
		errLogToConsole: true,
		includePaths: [ 
			cfg.vendors + '/bootstrap-sass-official/assets/stylesheets',
			cfg.vendors + '/fontawesome/scss'
		]
	}))
	//.pipe(autoprefixer('last 4 version'))
	//.pipe(header(banner, { package : package }))
	.pipe(gulp.dest(cfg.dist+'/css'))
	.pipe(minifyCSS())
	.pipe(rename({ suffix: '.min' }))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(cfg.dist+'/css'));
	
});


gulp.task('browser-sync', function() {
    browserSync.init(null, {
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['css', 'html', 'browser-sync'], function () {
    gulp.watch([
		cfg.src+'/scss/*.scss',
		cfg.src+'/scss/**/*.scss'
	], ['css']);
    gulp.watch(cfg.src+'/**/*.html', ['html']);
    
	gulp.watch(cfg.dist+'/css/*.css', ['bs-reload']);
	gulp.watch(cfg.dist+'/*.html', ['bs-reload']);
});
