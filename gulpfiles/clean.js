const del = require('del'); // https://www.npmjs.com/package/del

const DEL_OPTIONS = {};

function clean(directoryToDelete, delOptions = DEL_OPTIONS) {
	return del(directoryToDelete, delOptions);
}
clean.description = 'Clean a directory by deleting it';
clean.defaults = {
	DEL_OPTIONS,
};

module.exports = clean;
