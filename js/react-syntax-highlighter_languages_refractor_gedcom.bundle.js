"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_gedcom"],{

/***/ "./node_modules/refractor/lang/gedcom.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/gedcom.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = gedcom\ngedcom.displayName = 'gedcom'\ngedcom.aliases = []\nfunction gedcom(Prism) {\n  Prism.languages.gedcom = {\n    'line-value': {\n      // Preceded by level, optional pointer, and tag\n      pattern:\n        /(^[\\t ]*\\d+ +(?:@\\w[\\w!\"$%&'()*+,\\-./:;<=>?[\\\\\\]^`{|}~\\x80-\\xfe #]*@ +)?\\w+ ).+/m,\n      lookbehind: true,\n      inside: {\n        pointer: {\n          pattern: /^@\\w[\\w!\"$%&'()*+,\\-./:;<=>?[\\\\\\]^`{|}~\\x80-\\xfe #]*@$/,\n          alias: 'variable'\n        }\n      }\n    },\n    tag: {\n      // Preceded by level and optional pointer\n      pattern:\n        /(^[\\t ]*\\d+ +(?:@\\w[\\w!\"$%&'()*+,\\-./:;<=>?[\\\\\\]^`{|}~\\x80-\\xfe #]*@ +)?)\\w+/m,\n      lookbehind: true,\n      alias: 'string'\n    },\n    level: {\n      pattern: /(^[\\t ]*)\\d+/m,\n      lookbehind: true,\n      alias: 'number'\n    },\n    pointer: {\n      pattern: /@\\w[\\w!\"$%&'()*+,\\-./:;<=>?[\\\\\\]^`{|}~\\x80-\\xfe #]*@/,\n      alias: 'variable'\n    }\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/gedcom.js?");

/***/ })

}]);