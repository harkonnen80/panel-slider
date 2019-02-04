'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var scssPath = './shared/scss/**/*.scss';
var cssPath = './public/css/';

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src(
        scssPath
    )
    .pipe(
        sourcemaps.init()
    )
    .pipe(
        sass().on(
            'error', sass.logError
        )
    )
    .pipe(
        autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        })
    )
    .pipe(rename('page.css'))
    .pipe(
        sourcemaps.write()
    )
    .pipe(
        gulp.dest(
            cssPath
        )
    );
});

gulp.task('watch', function () {
    gulp.watch(
        scssPath, gulp.series('sass')
    );
});