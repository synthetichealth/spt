"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_gcode"],{

/***/ "./node_modules/refractor/lang/gcode.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/gcode.js ***!
  \**********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = gcode\ngcode.displayName = 'gcode'\ngcode.aliases = []\nfunction gcode(Prism) {\n  Prism.languages.gcode = {\n    comment: /;.*|\\B\\(.*?\\)\\B/,\n    string: {\n      pattern: /\"(?:\"\"|[^\"])*\"/,\n      greedy: true\n    },\n    keyword: /\\b[GM]\\d+(?:\\.\\d+)?\\b/,\n    property: /\\b[A-Z]/,\n    checksum: {\n      pattern: /(\\*)\\d+/,\n      lookbehind: true,\n      alias: 'number'\n    },\n    // T0:0:0\n    punctuation: /[:*]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/gcode.js?");

/***/ })

}]);