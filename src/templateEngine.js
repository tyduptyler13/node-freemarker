"use strict";

const fs = require('fs');
const exceptions = require('./Exceptions.js');

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
    var rendered = data.replace(TemplateEngine._inlineVariableRegex, (/** @type {string} */ match, offset, original) => {
        const valueExpr = match.slice(2, -1);

        try {
            return this._getValueFromNamespace(namespace, valueExpr);
        } catch (e) {
            if (e instanceof exceptions.ValueExprException) {
                let prevLines = original.slice(0, offset).split(/\r\n|\r|\n/);
                throw new exceptions.TemplateException("Failed to inline variable.", e, prevLines.length, ':' + prevLines[prevLines.length - 1].length);
            }
        }

    });

    callback(null, rendered);
};

/**
 * Handles a value expression and finds the corresponding data in the namespace.
 *
 * Things to keep in mind: Values can be immediately in the namespace, they can be sub
 * values of a value in that namespace (recursion), they can be array offset, they can
 * be function calls, and the function calls can have parameters passed in by the freemarker.
 *
 * @param {Object} namespace
 * @param {string} valueExpr
 * @returns {*}
 * @private
 */
TemplateEngine.prototype._getValueFromNamespace = function(namespace, valueExpr) {
    const parts = valueExpr.split('.', 1);
    var valueRef = namespace[parts[0]];
    if (valueRef === null || valueRef === undefined){
        valueRef = this._global[parts[0]];
    }

    if (valueRef === null || valueRef === undefined) {
        throw new exceptions.ValueExprException("Value could not be found in the existing variables/namespace.");
    }

    //TODO Handle arrays, maps, and function calls
    if (parts.length !== 1) {
        return this._getValueFromNamespace(valueRef, parts[1]);
    } else {
        return valueRef;
    }
};


if (module) {
    module.exports = TemplateEngine;
}
