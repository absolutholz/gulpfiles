const babel = require('gulp-babel'); // https://www.npmjs.com/package/gulp-babel

/* eslint-disable-next-line object-curly-newline */
const { src, dest, newer, notify, prettyError, sourcemaps, size } = require('../common-packages');

const BABEL_PRESETS = [
	[
		'@babel/preset-env',
		// browserconfig in .browserslistrc
		// https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
	],
];
const BABEL_PLUGINS = [
	// ['@babel/plugin-syntax-dynamic-import'],
];

function build(sourceFiles, destinationDirectory, babelPresets = BABEL_PRESETS, babelPlugins = BABEL_PLUGINS) {
	return src(sourceFiles)
		.pipe(prettyError())

		.pipe(newer({
			dest: destinationDirectory,
		}))

		.pipe(sourcemaps.init())

		.pipe(babel(
			{
				presets: babelPresets,
				plugins: babelPlugins,
			},
		))

		.pipe(sourcemaps.write('/'))

		.pipe(size({ showFiles: true, title: 'JS Built --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory))
		.pipe(notify({ message: 'JS build complete', onLast: true }));
}
build.description = 'Build JavaScript from ECMAScript';
build.defaults = {
	BABEL_PRESETS,
	BABEL_PLUGINS,
};

module.exports = build;
