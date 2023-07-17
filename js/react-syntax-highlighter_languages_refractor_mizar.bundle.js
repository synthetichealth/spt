"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_mizar"],{

/***/ "./node_modules/refractor/lang/mizar.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/mizar.js ***!
  \**********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = mizar\nmizar.displayName = 'mizar'\nmizar.aliases = []\nfunction mizar(Prism) {\n  Prism.languages.mizar = {\n    comment: /::.+/,\n    keyword:\n      /@proof\\b|\\b(?:according|aggregate|all|and|antonym|are|as|associativity|assume|asymmetry|attr|be|begin|being|by|canceled|case|cases|clusters?|coherence|commutativity|compatibility|connectedness|consider|consistency|constructors|contradiction|correctness|def|deffunc|define|definitions?|defpred|do|does|end|environ|equals|ex|exactly|existence|for|from|func|given|hence|hereby|holds|idempotence|identity|iff?|implies|involutiveness|irreflexivity|is|it|let|means|mode|non|not|notations?|now|of|or|otherwise|over|per|pred|prefix|projectivity|proof|provided|qua|reconsider|redefine|reduce|reducibility|reflexivity|registrations?|requirements|reserve|sch|schemes?|section|selector|set|sethood|st|struct|such|suppose|symmetry|synonym|take|that|the|then|theorems?|thesis|thus|to|transitivity|uniqueness|vocabular(?:ies|y)|when|where|with|wrt)\\b/,\n    parameter: {\n      pattern: /\\$(?:10|\\d)/,\n      alias: 'variable'\n    },\n    variable: /\\b\\w+(?=:)/,\n    number: /(?:\\b|-)\\d+\\b/,\n    operator: /\\.\\.\\.|->|&|\\.?=/,\n    punctuation: /\\(#|#\\)|[,:;\\[\\](){}]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/mizar.js?");

/***/ })

}]);