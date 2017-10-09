"use strict";

const assert = require('assert');
const fs = require('fs');
const TemplateEngine = require('../src/templateEngine.js');

const testObj = {
    user: "John Doe",
    latestProduct: {
        name: "green mouse",
        url: "products/greenmouse.html"
    }
};

describe("TemplateEngine", function () {
    describe("#render", function () {
        it("Testing the testing framework.", function (done) {
            fs.readFile('resources/basicReplacementExpected.html', 'utf8', function (err, expected) {
                if (err) {
                    throw err; //We don't want errors here!
                }

                let engine = new TemplateEngine();

                engine.render("resources/basicReplacement.ftl", testObj, function (err, result) {
                    if (err) {
                        done("Render threw an error.");
                        return;
                    }

                    assert.equals(tmpBuf, testBuf);
                });
            });
        });
    });
});
