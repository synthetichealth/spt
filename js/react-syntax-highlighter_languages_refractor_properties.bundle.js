"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_properties"],{

/***/ "./node_modules/refractor/lang/properties.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/properties.js ***!
  \***************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = properties\nproperties.displayName = 'properties'\nproperties.aliases = []\nfunction properties(Prism) {\n  Prism.languages.properties = {\n    comment: /^[ \\t]*[#!].*$/m,\n    'attr-value': {\n      pattern:\n        /(^[ \\t]*(?:\\\\(?:\\r\\n|[\\s\\S])|[^\\\\\\s:=])+(?: *[=:] *(?! )| ))(?:\\\\(?:\\r\\n|[\\s\\S])|[^\\\\\\r\\n])+/m,\n      lookbehind: true\n    },\n    'attr-name': /^[ \\t]*(?:\\\\(?:\\r\\n|[\\s\\S])|[^\\\\\\s:=])+(?= *[=:]| )/m,\n    punctuation: /[=:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/properties.js?");

/***/ })

}]);