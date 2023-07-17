"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_bro"],{

/***/ "./node_modules/refractor/lang/bro.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/bro.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = bro\nbro.displayName = 'bro'\nbro.aliases = []\nfunction bro(Prism) {\n  Prism.languages.bro = {\n    comment: {\n      pattern: /(^|[^\\\\$])#.*/,\n      lookbehind: true,\n      inside: {\n        italic: /\\b(?:FIXME|TODO|XXX)\\b/\n      }\n    },\n    string: {\n      pattern: /([\"'])(?:\\\\(?:\\r\\n|[\\s\\S])|(?!\\1)[^\\\\\\r\\n])*\\1/,\n      greedy: true\n    },\n    boolean: /\\b[TF]\\b/,\n    function: {\n      pattern: /(\\b(?:event|function|hook)[ \\t]+)\\w+(?:::\\w+)?/,\n      lookbehind: true\n    },\n    builtin:\n      /(?:@(?:load(?:-(?:plugin|sigs))?|unload|prefixes|ifn?def|else|(?:end)?if|DIR|FILENAME))|(?:&?(?:add_func|create_expire|default|delete_func|encrypt|error_handler|expire_func|group|log|mergeable|optional|persistent|priority|raw_output|read_expire|redef|rotate_interval|rotate_size|synchronized|type_column|write_expire))/,\n    constant: {\n      pattern: /(\\bconst[ \\t]+)\\w+/i,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:add|addr|alarm|any|bool|break|const|continue|count|delete|double|else|enum|event|export|file|for|function|global|hook|if|in|int|interval|local|module|next|of|opaque|pattern|port|print|record|return|schedule|set|string|subnet|table|time|timeout|using|vector|when)\\b/,\n    operator: /--?|\\+\\+?|!=?=?|<=?|>=?|==?=?|&&|\\|\\|?|\\?|\\*|\\/|~|\\^|%/,\n    number: /\\b0x[\\da-f]+\\b|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?/i,\n    punctuation: /[{}[\\];(),.:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/bro.js?");

/***/ })

}]);