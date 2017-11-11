"use strict";

const assert = require('assert');
const TemplateEngine = require('../src/templateEngine.js');
const utils = require('./testUtil.js');

describe("TemplateEngine", function () {

	const engine = new TemplateEngine();

	const resourceRoot = __dirname + '/resources/';

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
						return;
					}

					assert.equal(result, expected);
					done();
				});
			});
		});

		it("Basic Replacement 2", function (done) {
			new utils.TemplateEngineTester()
				.withInputFile(resourceRoot + "basicReplacement.ftl")
				.withNamespace({
					user: "John Doe",
					latestProduct: {
						name: "green mouse",
						url: "products/greenmouse.html"
					}
				})
				.render()
				.withResultFile(resourceRoot + "basicReplacementExpected.html")
				.onFinished(done);
		});

		it("Array replacement", function (done) {
			utils.getFile("arrayReplacementExpected.html", function (expected) {
				const testObj = {
					smallArray: [1, 2, 3, 4, "5", "squirrel", ["otherSquirrel"], {theOtherestSquirrel: "king"}]
				};

				engine.render(__dirname + '/resources/arrayReplacement.ftl', testObj, function (err, result) {
					if (err) {
						done(err);
						return;
					}

					assert.equal(result, expected);
					done();
				});
			});
		});

		it("Array Replacement 2", function (done) {
			new utils.TemplateEngineTester()
				.withInputFile(resourceRoot + "arrayReplacement.ftl")
				.withNamespace({
					smallArray: [1, 2, 3, 4, "5", "squirrel", ["otherSquirrel"], {theOtherestSquirrel: "king"}]
				})
				.render()
				.withResultFile(resourceRoot + "arrayReplacementExpected.html")
				.onFinished(done);
		});

		it("Map replacement", function (done) {
			utils.getFile("mapReplacementExpected.html", function (expected) {
				const testObj = {
					smallMap: {
						maps: 'maps',
						myMaps: 'myMaps Real',
						_testing: "real testing",
						"What?": "what is real?",
						cool_: "This is real cool",
						8: [4],
						5: {theOtherestSquirrel: "king"}
					},
					smallArray: [1, 2, {testing: "testing Array"}]
				};

				engine.render(__dirname + '/resources/mapReplacement.ftl', testObj, function (err, result) {
					if (err) {
						done(err);
						return;
					}

					assert.equal(result, expected);
					done();
				});
			});
		});
	});
});
