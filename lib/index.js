const fs = require('fs');
const _ = require('lodash');

const modules = {};
const libFiles = fs.readdirSync('./lib');

function wrapped(handler) {
	return () => {
		console.log('*********************************');
		console.log('*********************************');
		handler();
	};
}


/**
 * Module Loader
 */
libFiles.forEach((file) => {
	if (file !== 'index.js') {
		// Remove file extension
		const camelCasedModule = _.camelCase(file.split('.')[0]);
		modules[camelCasedModule] = wrapped(require(`./${file}`));
	}
});

module.exports = modules;
