const fs = require('fs');
const TemplateEngine = require('../src/templateEngine.js');
const assert = require('assert');
const async = require('async');

class TemplateEngineTesterResult {
	constructor() {
		this._err = null;
		this._resultFile = null;
		this._finished = null;
	}

	withError(error) {
		this._err = error;
		return this;
	}

	withResultFile(file) {
		this._resultFile = file;
		return this;
	}

	onFinished(callback) {
		this._finished = callback;
		return this;
	}

	handleResult(err, result) {
		const scope = this;
		async.waterfall([
			function(callback) {
				if (scope._err) {
					assert.equal(err, scope._err, "Expected errors to be the same");
				} else {
					return callback(err);
				}
				callback();
			},
			function(callback) {
				if (scope._resultFile) {
					fs.readFile(scope._resultFile, 'utf8', (err, data) => {
						if (err) {
							return callback(err);
						}
						assert.equal(result, data, "Expected result to equal file contents");
						callback();
					});
				} else {
					callback();
				}
			}
		], function(err) {
			if (err) {
				console.error("Unexpected error:", err);
				assert(false, "Unhandled exception");
			}
			if (scope._finished) {
				scope._finished();
			}
		});
	}
}

class TemplateEngineTester{
	constructor() {
		this.templateEngine = new TemplateEngine({});
		this._inFile = "";
		this._namespace = {};
	}

	/**
	 * Use this file with the next render call
	 * @param filename
	 * @returns {TemplateEngineTester}
	 */
	withInputFile(filename) {
		this._inFile = filename;
		return this;
	}

	/**
	 * Uses this namespace with the render call
	 * @param namespace
	 * @returns {TemplateEngineTester}
	 */
	withNamespace(namespace) {
		this._namespace = namespace;
		return this;
	}

	/**
	 * @return {TemplateEngineTesterResult}
	 */
	render() {
		const retTest = new TemplateEngineTesterResult();
		this.templateEngine.render(this._inFile, this._namespace, retTest.handleResult.bind(retTest));
		return retTest;
	}
}

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
	getFile: function (name, callback) {
		fs.readFile(__dirname + '/resources/' + name, 'utf8', (err, data) => {
			if (err) {
				throw err; //We don't want to continue if there are errors
			}

			callback(data);
		});
	},

	TemplateEngineTester: TemplateEngineTester
};
