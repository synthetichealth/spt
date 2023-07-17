"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_jsstacktrace"],{

/***/ "./node_modules/refractor/lang/jsstacktrace.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/jsstacktrace.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = jsstacktrace\njsstacktrace.displayName = 'jsstacktrace'\njsstacktrace.aliases = []\nfunction jsstacktrace(Prism) {\n  Prism.languages.jsstacktrace = {\n    'error-message': {\n      pattern: /^\\S.*/m,\n      alias: 'string'\n    },\n    'stack-frame': {\n      pattern: /(^[ \\t]+)at[ \\t].*/m,\n      lookbehind: true,\n      inside: {\n        'not-my-code': {\n          pattern:\n            /^at[ \\t]+(?!\\s)(?:node\\.js|<unknown>|.*(?:node_modules|\\(<anonymous>\\)|\\(<unknown>|<anonymous>$|\\(internal\\/|\\(node\\.js)).*/m,\n          alias: 'comment'\n        },\n        filename: {\n          pattern: /(\\bat\\s+(?!\\s)|\\()(?:[a-zA-Z]:)?[^():]+(?=:)/,\n          lookbehind: true,\n          alias: 'url'\n        },\n        function: {\n          pattern:\n            /(\\bat\\s+(?:new\\s+)?)(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF<][.$\\w\\xA0-\\uFFFF<>]*/,\n          lookbehind: true,\n          inside: {\n            punctuation: /\\./\n          }\n        },\n        punctuation: /[()]/,\n        keyword: /\\b(?:at|new)\\b/,\n        alias: {\n          pattern: /\\[(?:as\\s+)?(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF][$\\w\\xA0-\\uFFFF]*\\]/,\n          alias: 'variable'\n        },\n        'line-number': {\n          pattern: /:\\d+(?::\\d+)?\\b/,\n          alias: 'number',\n          inside: {\n            punctuation: /:/\n          }\n        }\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/jsstacktrace.js?");

/***/ })

}]);