'use strict'
var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglyfly = require('gulp-uglyfly'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require('del'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

gulp.task('clean', function() {
    return del.sync('build');
});
//CSS
gulp.task('buildSass', function() {
    return gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss('main.css'))
        .pipe(gulp.dest('src/css'));
});
gulp.task('buildCss', gulp.series('buildSass', function() {
    return gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concatCss('css/main.css'))
        .pipe(cleanCss({ compatibility: 'ie8' }))
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
}));

gulp.task('sass:watch', function() {
    return gulp.watch('src/sass/*.scss', ['sass']);
});

//CSS
//JS
gulp.task('buildJs', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('js/scripts.js'))
        .pipe(uglyfly())
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});
//JS

//vendors
gulp.task('vendors', function() {
    return gulp.src('src/vendors/**')
        .pipe(gulp.dest('build/vendors'))
        .pipe(reload({ stream: true }));
});
//vendors
//HTML
gulp.task('buildHtml', function() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});
//HTML
//img
gulp.task('imgmin', function() {
    return gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
        .pipe(reload({ stream: true }));
});
//img
//fonts
gulp.task('buildFonts', function() {
    return gulp.src('src/fonts/*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(reload({ stream: true }));
});
//fonts
//build
gulp.task('build', gulp.series(
    'buildHtml',
    'buildCss',
    'buildJs',
    'buildFonts',
    'imgmin',
    'vendors'
));
//webserver
gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: "./build"
        },
        port: 8080,
        open: true,
        notify: false
    });
    gulp.watch('src/*.html', gulp.series('buildHtml'));
    gulp.watch('src/sass/*.scss', gulp.series('buildCss'));
    gulp.watch('src/js/*.js', gulp.series('buildJs'));
    gulp.watch('src/fonts/*', gulp.series('buildFonts'));
    gulp.watch('src/img/*.html', gulp.series('imgmin'));
    gulp.watch('src/vendors/**', gulp.series('vendors'));
});

//compile
gulp.task('default', gulp.series(
    'build',
    'webserver'
));