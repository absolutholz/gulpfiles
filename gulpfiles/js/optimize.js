const uglify = require('gulp-uglify-es').default; // https://www.npmjs.com/package/gulp-uglify-es

/* eslint-disable-next-line object-curly-newline */
const { src, dest, notify, prettyError, sourcemaps, size } = require('../common-packages');

function optimize(sourceFiles, destinationDirectory) {
	return src(sourceFiles)
		.pipe(prettyError())

		.pipe(sourcemaps.init())

		.pipe(uglify())

		.pipe(sourcemaps.write('/'))

		.pipe(size({ showFiles: true, title: 'JS Optimized --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory))
		.pipe(notify({ message: 'JS Optimization complete', onLast: true }));
};
optimize.description = 'Optimize JS';
optimize.defaults = {};

module.exports = optimize;
