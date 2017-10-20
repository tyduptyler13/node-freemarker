
const fs = require('fs');
const TemplateEngine = require('../src/templateEngine.js');

module.exports = {
	/**
	 * @callback GetFileCallback
	 * @param {string} data The data returned from the file
	 */

	/**
	 * Shorthand file retrieve from resources
	 * @param {string} name
	 * @param {GetFileCallback} callback
	 */
	getFile: function(name, callback) {
		fs.readFile(__dirname + '/resources/' + name, 'utf8', (err, data) => {
			if (err) {
				throw err; //We don't want to continue if there are errors
			}

			callback(data);
		});
	},

	chainTest: (function(){
		let chainTest = function() {

		};
		chainTest.constructor = chainTest;
		//chainTest.prototype.
	})()
};
