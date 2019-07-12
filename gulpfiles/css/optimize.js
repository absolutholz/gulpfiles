const cssnano = require('cssnano'); // https://www.npmjs.com/package/cssnano
const mqpacker = require('css-mqpacker'); // https://github.com/hail2u/node-css-mqpacker
const postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss
// const postcssSVG = require('postcss-svg'); // https://www.npmjs.com/package/postcss-svg

/* eslint-disable-next-line object-curly-newline */
const { src, dest, notify, prettyError, sourcemaps, size } = require('../common-packages');

const MQPACKER_OPTIONS = {
	sort: true,
};

const CSSNANO_OPTIONS = {
	reduceIdents: false,
	minifyFontValues: false,
	discardComments: true,
	colormin: {},
};

function optimize (sourceFiles, destinationDirectory, mqpackerOptions = MQPACKER_OPTIONS, cssnanoOptions = CSSNANO_OPTIONS) {
	return src(sourceFiles)
		.pipe(prettyError())

		.pipe(sourcemaps.init())

		.pipe(postcss([
			// postcssSVG(),
			mqpacker(mqpackerOptions),
			cssnano(cssnanoOptions),
		]))

		.pipe(sourcemaps.write('/'))

		.pipe(size({ showFiles: true, title: 'CSS Optimized --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory))
		.pipe(notify({ message: 'CSS Optimization complete', onLast: true }));
};
optimize.description = 'Optimize CSS';
optimize.defaults = {
	MQPACKER_OPTIONS,
	CSSNANO_OPTIONS,
};

module.exports = optimize;
