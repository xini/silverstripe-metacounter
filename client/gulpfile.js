const { src, dest, watch, series, parallel } = require('gulp');
const del = require('del');
const path = require('path');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const cssimport = require('gulp-cssimport');
const concat = require('gulp-concat-util');
const stripdebug = require('gulp-strip-debug');
const uglify = require('gulp-uglify');

// load paths
const paths = {
	"src": "./src/",
	"dist": "./dist/",

	"styles": {
		"src": "scss/",
		"filter": "/**/*.+(scss)",
		"dist": "css/"
	},
	"scripts": {
		"src": "javascript/",
		"filter": "/**/*.+(js)",
		"dist": "javascript/"
	}
};

const scriptFiles = {
	"metacounter.js": [
		"src/javascript/metacounter.js"
	]
}

const sassOptions = {
	errLogToConsole: true,
	outputStyle: 'compressed'
};

const autoprefixerOptions = {
	browserlist: ['last 2 versions', '> 1%', 'IE >= 9'],
	cascade: false,
	supports: false
};

function styles(cb) {
	src(paths.src + paths.styles.src + paths.styles.filter)
		.pipe(plumber({
			errorHandler: onError
		}))
		.pipe(sourcemaps.init())
		.pipe(cssimport({matchPattern: "*.css"}))
		.pipe(sass(sassOptions).on('error', sass.logError))
		.pipe(autoprefixer(autoprefixerOptions))
		.pipe(cleancss({processImport: true, keepSpecialComments: 0}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest(paths.dist + paths.styles.dist));
	cb();
}

function cleanStyles(cb) {
	del([
		paths.dist + paths.styles.dist + "*.(css|map)"
	]);
	cb();
}

function scripts(cb) {
	var scriptNames = Object.keys(scriptFiles);
	scriptNames.forEach(function(scriptName) {
		src(
			scriptFiles[scriptName],
			{
				cwd: path.join(process.cwd(), './'),
				nosort: true
			}
		)
			.pipe(plumber({
				errorHandler: onError
			}))
			.pipe(sourcemaps.init())
			.pipe(concat(scriptName))
			.pipe(stripdebug())
			.pipe(uglify({
				mangle: false,
				compress: false
			}))
			.pipe(sourcemaps.write('.'))
			.pipe(dest(paths.dist + paths.scripts.dist));
	});
	cb();
}

function cleanScripts(cb) {
	del([
		paths.dist + paths.scripts.dist + "*.(js|map)"
	]);
	cb();
}

function watchAll() {
	// watch for style changes
	watch(paths.src + paths.styles.src + paths.styles.filter, series(cleanStyles, styles));
	// watch for script changes
	watch(paths.src + paths.scripts.src + paths.scripts.filter, series(cleanScripts, scripts));
}

function onError(err) {
	console.log(err);
}

exports.build = series(
	parallel(
		cleanStyles,
		cleanScripts
	),
	parallel(
		styles,
		scripts
	)
);

exports.default = series(
	parallel(
		cleanStyles,
		cleanScripts
	),
	parallel(
		styles,
		scripts
	),
	watchAll
);
