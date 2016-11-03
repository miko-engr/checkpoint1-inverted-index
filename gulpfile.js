"use strict";
var gulp = require('gulp'),
    connect = require("gulp-connect");
var browserSync = require('browser-sync').create(),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');



gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./",
            port: process.env.PORT || 3000
        }
    });
});

gulp.task('reload', function (done) {
    browserSync.reload();
    done();
});


gulp.task('watch', function () {
    gulp.watch('src/*.js', ['reload']);
    gulp.watch('css/*.css', ['reload']);
    gulp.watch('*.html', ['reload']);
});

gulp.task('browserify', () => {
    return browserify('./jasmine/spec/inverted-index-spec.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./jasmine/spec/browser'));
});

gulp.task('default', ['browser-sync', 'browserify', 'watch']);