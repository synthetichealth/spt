"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_bnf"],{

/***/ "./node_modules/refractor/lang/bnf.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/bnf.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = bnf\nbnf.displayName = 'bnf'\nbnf.aliases = ['rbnf']\nfunction bnf(Prism) {\n  Prism.languages.bnf = {\n    string: {\n      pattern: /\"[^\\r\\n\"]*\"|'[^\\r\\n']*'/\n    },\n    definition: {\n      pattern: /<[^<>\\r\\n\\t]+>(?=\\s*::=)/,\n      alias: ['rule', 'keyword'],\n      inside: {\n        punctuation: /^<|>$/\n      }\n    },\n    rule: {\n      pattern: /<[^<>\\r\\n\\t]+>/,\n      inside: {\n        punctuation: /^<|>$/\n      }\n    },\n    operator: /::=|[|()[\\]{}*+?]|\\.{3}/\n  }\n  Prism.languages.rbnf = Prism.languages.bnf\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/bnf.js?");

/***/ })

}]);