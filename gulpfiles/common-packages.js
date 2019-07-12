/* eslint-disable global-require */
const { src, dest, parallel, series, watch } = require('gulp');
const sourcemaps = require('gulp-sourcemaps'); // https://github.com/floridoo/gulp-sourcemaps
const newer = require('gulp-newer'); // https://www.npmjs.com/package/gulp-newer
const notify = require('gulp-notify'); // https://www.npmjs.com/package/gulp-notify
const prettyError = require('gulp-prettyerror'); // https://andidittrich.de/2016/03/prevent-errors-from-breaking-gulp-watch.html
const size = require('gulp-size'); // https://www.npmjs.com/package/gulp-size

module.exports = {
    dest, 
    parallel, 
    series,
    src,
	// del: require('del'),
	newer,
	notify,
    // plumber: require('gulp-plumber'), // https://www.npmjs.com/package/gulp-plumber
    prettyError,
	// rename: require('gulp-rename'), // https://www.npmjs.com/package/gulp-rename
	size,
    sourcemaps,
    watch,
};
