const autoprefixer = require('autoprefixer'); // https://www.npmjs.com/package/autoprefixer
const postcss = require('gulp-postcss'); // https://github.com/postcss/gulp-postcss
const sass = require('gulp-sass'); // https://www.npmjs.com/package/gulp-sass
// const sassGlob = require('gulp-sass-glob'); // https://www.npmjs.com/package/gulp-sass-glob

/* eslint-disable-next-line object-curly-newline */
const { src, dest, newer, notify, prettyError, sourcemaps, size } = require('../common-packages');

const SASS_OPTIONS = {
	style: 'expanded',
	includePaths: ['./'],
};

const POSTCSS_PLUGINS = [
    autoprefixer(), // browserconfig in .browserslistrc
];

function build (sourceFiles, destinationDirectory, sassOptions = SASS_OPTIONS, postcssPlugins = POSTCSS_PLUGINS) {
	return src(sourceFiles)
        .pipe(prettyError())

        .pipe(newer({
			dest: destinationDirectory,
			ext: '.css',
			extra: sourceFiles,
		}))

		.pipe(sourcemaps.init())

		// .pipe(sassGlob())
		.pipe(sass(sassOptions))
		.pipe(postcss(postcssPlugins))

		.pipe(sourcemaps.write('.'))

		.pipe(size({ showFiles: true, title: 'CSS built --->' })) // size before dest results in better output in the console
		.pipe(dest(destinationDirectory))
		.pipe(notify({ message: 'CSS Build complete', onLast: true }));
}
build.description = 'Build CSS from SCSS';
build.defaults = {
	SASS_OPTIONS,
	POSTCSS_PLUGINS,
};

module.exports = build;
