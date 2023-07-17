"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_ebnf"],{

/***/ "./node_modules/refractor/lang/ebnf.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/ebnf.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = ebnf\nebnf.displayName = 'ebnf'\nebnf.aliases = []\nfunction ebnf(Prism) {\n  Prism.languages.ebnf = {\n    comment: /\\(\\*[\\s\\S]*?\\*\\)/,\n    string: {\n      pattern: /\"[^\"\\r\\n]*\"|'[^'\\r\\n]*'/,\n      greedy: true\n    },\n    special: {\n      pattern: /\\?[^?\\r\\n]*\\?/,\n      greedy: true,\n      alias: 'class-name'\n    },\n    definition: {\n      pattern: /^([\\t ]*)[a-z]\\w*(?:[ \\t]+[a-z]\\w*)*(?=\\s*=)/im,\n      lookbehind: true,\n      alias: ['rule', 'keyword']\n    },\n    rule: /\\b[a-z]\\w*(?:[ \\t]+[a-z]\\w*)*\\b/i,\n    punctuation: /\\([:/]|[:/]\\)|[.,;()[\\]{}]/,\n    operator: /[-=|*/!]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/ebnf.js?");

/***/ })

}]);