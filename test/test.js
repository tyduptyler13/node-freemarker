"use strict";

const TemplateEngine = require('../src/templateEngine.js');
const utils = require('./testUtil.js');

describe("TemplateEngine", function () {
	const resourceRoot = __dirname + '/resources/';

	describe("#render", function () {
		it("Basic Replacement", function (done) {
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

		it("Array Replacement", function (done) {
			new utils.TemplateEngineTester()
				.withInputFile(resourceRoot + "arrayReplacement.ftl")
				.withNamespace({
					smallArray: [1, 2, 3, 4, "5", "squirrel", ["otherSquirrel"], {theOtherestSquirrel: "king"}]
				})
				.render()
				.withResultFile(resourceRoot + "arrayReplacementExpected.html")
				.onFinished(done);
		});

		it("Map Replacement", function (done) {
			new utils.TemplateEngineTester()
				.withInputFile(resourceRoot + "mapReplacement.ftl")
				.withNamespace({
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
				})
				.render()
				.withResultFile(resourceRoot + "mapReplacementExpected.html")
				.onFinished(done);
		});
	});
});
