// https://gulpjs.com/docs/en/api/concepts

const { parallel, series, watch } = require('./gulpfiles/common-packages');
const clean = require('./gulpfiles/clean');
const css = require('./gulpfiles/css');
const js = require('./gulpfiles/js');

/* ****************************** *\
	CSS
\* ****************************** */
const CSS_SOURCES = './scss/**/*.scss';
const CSS_DESTINATION = './css';

function cssClean () {
    return clean(CSS_DESTINATION);
}

function cssBuild () {
    return css.build(CSS_SOURCES, CSS_DESTINATION);
}

function cssOptimize () {
    return css.optimize(`${CSS_DESTINATION}/**/*.css`, CSS_DESTINATION);
}

function cssLint () {
    return css.lint(CSS_SOURCES);
}

exports['css'] = series(cssClean, cssBuild, cssOptimize);
exports['css:build'] = cssBuild;
exports['css:optimize'] = cssOptimize;
exports['css:lint'] = cssLint;

/* ****************************** *\
	JS
\* ****************************** */
const JS_SOURCES = './es/**/*.js';
const JS_DESTINATION = './js';

function jsClean () {
    return clean(JS_DESTINATION);
}

function jsBuild () {
    return js.build(JS_SOURCES, JS_DESTINATION);
}

function jsOptimize () {
    return js.optimize(`${JS_DESTINATION}/**/*.js`, JS_DESTINATION);
}

exports['js'] = series(jsClean, jsBuild, jsOptimize);
exports['js:build'] = jsBuild;
exports['js:optimize'] = jsOptimize;

/* ****************************** *\
	Common Tasks
\* ****************************** */
function filesWatch (done) {
	watch(CSS_SOURCES, series(cssBuild, cssOptimize));
	watch(JS_SOURCES, series(jsBuild, jsOptimize));
	done();
}

exports['watch'] = parallel(filesWatch);
exports['default'] = parallel(filesWatch);
