"use strict";

const assert = require('assert');
const TemplateEngine = require('../src/templateEngine.js');
const utils = require('./testUtil.js');

describe("TemplateEngine", function () {

	const engine = new TemplateEngine();

	describe("#render", function () {
		it("Basic Replacement", function (done) {
			utils.getFile('basicReplacementExpected.html', function (expected) {
				const testObj = {
					user: "John Doe",
					latestProduct: {
						name: "green mouse",
						url: "products/greenmouse.html"
					}
				};

				engine.render(__dirname + '/resources/basicReplacement.ftl', testObj, function (err, result) {
					if (err) {
						done(err);
					}

					assert.equal(result, expected);
					done();
				});
			});
		});

		it("Array replacement", function (done) {
			utils.getFile("arrayReplacementExpected.html", function (expected) {
				const testObj = {
					smallArray: [1, 2, 3, 4, "5", "squirrel", ["otherSquirrel"], {theOtherestSquirrel: "king"}]
				};

				engine.render(__dirname + '/resources/arrayReplacement.ftl', testObj, function(err, result) {
					if (err) {
						done("Render threw an error.");
					}

					assert.equal(result, expected);
					done();
				});
			});
		});
	});
});
