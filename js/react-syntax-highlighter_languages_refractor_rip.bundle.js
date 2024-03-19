"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_rip"],{

/***/ "./node_modules/refractor/lang/rip.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/rip.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = rip\nrip.displayName = 'rip'\nrip.aliases = []\nfunction rip(Prism) {\n  Prism.languages.rip = {\n    comment: {\n      pattern: /#.*/,\n      greedy: true\n    },\n    char: {\n      pattern: /\\B`[^\\s`'\",.:;#\\/\\\\()<>\\[\\]{}]\\b/,\n      greedy: true\n    },\n    string: {\n      pattern: /(\"|')(?:\\\\.|(?!\\1)[^\\\\\\r\\n])*\\1/,\n      greedy: true\n    },\n    regex: {\n      pattern:\n        /(^|[^/])\\/(?!\\/)(?:\\[[^\\n\\r\\]]*\\]|\\\\.|[^/\\\\\\r\\n\\[])+\\/(?=\\s*(?:$|[\\r\\n,.;})]))/,\n      lookbehind: true,\n      greedy: true\n    },\n    keyword:\n      /(?:=>|->)|\\b(?:case|catch|class|else|exit|finally|if|raise|return|switch|try)\\b/,\n    builtin: /@|\\bSystem\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    date: /\\b\\d{4}-\\d{2}-\\d{2}\\b/,\n    time: /\\b\\d{2}:\\d{2}:\\d{2}\\b/,\n    datetime: /\\b\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\b/,\n    symbol: /:[^\\d\\s`'\",.:;#\\/\\\\()<>\\[\\]{}][^\\s`'\",.:;#\\/\\\\()<>\\[\\]{}]*/,\n    number: /[+-]?\\b(?:\\d+\\.\\d+|\\d+)\\b/,\n    punctuation: /(?:\\.{2,3})|[`,.:;=\\/\\\\()<>\\[\\]{}]/,\n    reference: /[^\\d\\s`'\",.:;#\\/\\\\()<>\\[\\]{}][^\\s`'\",.:;#\\/\\\\()<>\\[\\]{}]*/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/rip.js?");

/***/ })

}]);