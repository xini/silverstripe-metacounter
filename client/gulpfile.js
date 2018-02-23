// load modules
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var runSequence = require('run-sequence');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');

// load paths
var paths = {
    "src": "./src/",
    "dist": "./dist/",
    "webroot": "../../",

    "scripts": {
        "src": "javascript",
        "filter": "/**/*.+(js)",
        "dist": "javascript"
    },

    "css": {
        "src": "css",
        "filter": "/**/*.+(css)",
        "dist": "css"
    }
};

gulp.task('css', ['cleancss'], function() {
    return gulp
        .src(paths.src + paths.css.src + paths.css.filter)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(rename({suffix: ".min"}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist + paths.css.dist));
});

gulp.task('cleancss', function() {
    return del.sync([
        paths.dist + paths.css.dist
    ]);
});

gulp.task('scripts', ['cleanscripts'], function() {
    return gulp
        .src(paths.src + paths.scripts.src + paths.scripts.filter)
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(concat('metacounter.min.js'))
        .pipe(stripDebug())
        .pipe(uglify({mangle: false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.dist + paths.scripts.dist));
});

gulp.task('cleanscripts', function() {
    return del.sync([
        paths.dist + paths.scripts.dist
    ]);
});

gulp.task('watch', function() {
    gulp.watch(paths.src + paths.scripts.src + paths.scripts.filter, ['scripts']);
});

gulp.task('build', function (callback) {
    runSequence(
        ['scripts', 'css'],
        callback
    )
});

gulp.task('default', function (callback) {
    runSequence(
        ['scripts', 'css', 'watch'],
        callback
    )
});

var onError = function(err) {
    console.log(err);
}