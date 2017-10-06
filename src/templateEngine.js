"use strict";

const fs = require('fs');

/**
 * @param {Object} globalNamespace A raw object of things that could be included in a template
 * @param {?Object} options TODO
 * @constructor
 */ 
const TemplateEngine = function(globalNamespace, options) {
    this._global = globalNamespace;
};
TemplateEngine.constructor = TemplateEngine;

TemplateEngine._inlineVariableRegex = /\${[^}]+}/g;

/**
 * @callback DefaultCallback
 * @param {Error|String} [err] An error if applicable
 * @param {string} data The data expected unless an error occured
 */

/**
 * Accepts a target file path and renders it
 * 
 * @param {string} target The path of the file that is to get rendered
 * @param {Object} namespace Variables to be available to the template
 * @param {DefaultCallback} callback Returns the rendered data when complete
 */ 
TemplateEngine.prototype.render = function(target, namespace, callback) {
    fs.readFile(target, 'utf8', (err, data) => {
        if (err) {
            callback(err);
            return;
        }
        this.renderRaw(data, namespace, callback);
    });
};

/**
 * Accepts raw template text and renders it
 * 
 * @param {string} data The template data
 * @param {Object} namespace The data the template will use to render
 * @param {DefaultCallback} callback Returns the rendered data when complete
 */
TemplateEngine.prototype.renderRaw = function(data, namespace, callback) {
    var rendered = data.replace(TemplateEngine._inlineVariableRegex, (/** @type {string} */ match) => {
        const valueExpr = match.slice(2, -1);
    });


    callback(null, rendered);
};


if (module) {
    module.exports = TemplateEngine;
}
