/* eslint-disable import/no-dynamic-require */
const build = require(`${__dirname}/build`);
const lint = require(`${__dirname}/lint`);
const optimize = require(`${__dirname}/optimize`);

module.exports = {
	build,
	lint,
	optimize,
};
