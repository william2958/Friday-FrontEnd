var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var cleanHTML = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var iife = require('gulp-iife');
// var connect = require('gulp-connect');
var browserSync = require('browser-sync');

gulp.task('css', function () {
    gulp.src('application/css/**/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('minimizedApplication/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function() {
    gulp.src('application/src/**/*.html')
    .pipe(cleanHTML({
      removeEmptyAttributes: true,
      removeAttributeQuotes: true,
      removeComments: true,
      collapseBooleanAttributes: true,
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('minimizedApplication/src'))
    .pipe(browserSync.reload({stream:true}))
})
    

gulp.task('vendorjs', function() {
    gulp.src([
        'application/lib/jquery-2.1.4.min.js',
        'application/lib/bootstrap.min.js',
        'application/lib/angular.min.js',
        'application/lib/angular-ui-router.min.js',
        'application/lib/angular-animate/angular-animate.min.js',
        'application/lib/**/*.js'
        ])
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest('minimizedApplication/src/js'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('js', function() {
	gulp.src([
        'application/src/common/common.module.js',
        'application/src/dashboard/dashboard.module.js',
        'application/src/**/*.module.js',
        'application/src/**/!(mainapp)*.js',
        '!application/src/security/*.js',
        'application/src/mainapp.js'
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
		.pipe(concat('main.min.js'))
    	.pipe(uglify({mangle:false}))
        // .pipe(iife())
    	.pipe(gulp.dest('minimizedApplication/src/js'))
    	.pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['css', 'html', 'js']);

gulp.task('watch', function () {
   gulp.watch('application/css/**/*.css', ['css']);
   gulp.watch('application/src/**/*.html', ['html']);
   gulp.watch('application/src/**/*.js', ['js']);
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "minimizedApplication"
        }
    });
});

gulp.task('start', ['browser-sync', 'watch']);