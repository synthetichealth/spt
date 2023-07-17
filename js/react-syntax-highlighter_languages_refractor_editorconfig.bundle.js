"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_editorconfig"],{

/***/ "./node_modules/refractor/lang/editorconfig.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/editorconfig.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = editorconfig\neditorconfig.displayName = 'editorconfig'\neditorconfig.aliases = []\nfunction editorconfig(Prism) {\n  Prism.languages.editorconfig = {\n    // https://editorconfig-specification.readthedocs.io\n    comment: /[;#].*/,\n    section: {\n      pattern: /(^[ \\t]*)\\[.+\\]/m,\n      lookbehind: true,\n      alias: 'selector',\n      inside: {\n        regex: /\\\\\\\\[\\[\\]{},!?.*]/,\n        // Escape special characters with '\\\\'\n        operator: /[!?]|\\.\\.|\\*{1,2}/,\n        punctuation: /[\\[\\]{},]/\n      }\n    },\n    key: {\n      pattern: /(^[ \\t]*)[^\\s=]+(?=[ \\t]*=)/m,\n      lookbehind: true,\n      alias: 'attr-name'\n    },\n    value: {\n      pattern: /=.*/,\n      alias: 'attr-value',\n      inside: {\n        punctuation: /^=/\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/editorconfig.js?");

/***/ })

}]);