const sassLint = require('gulp-sass-lint'); // https://www.npmjs.com/package/gulp-sass-lint

/* eslint-disable-next-line object-curly-newline */
const { src } = require('../common-packages');

function lint(sourceFiles) {
	return src(sourceFiles)
		.pipe(sassLint())
		.pipe(sassLint.format());
}
lint.description = 'Lint SCSS files';
lint.defaults = {};

module.exports = lint;
