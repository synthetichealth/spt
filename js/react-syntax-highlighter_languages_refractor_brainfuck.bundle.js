"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_brainfuck"],{

/***/ "./node_modules/refractor/lang/brainfuck.js":
/*!**************************************************!*\
  !*** ./node_modules/refractor/lang/brainfuck.js ***!
  \**************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = brainfuck\nbrainfuck.displayName = 'brainfuck'\nbrainfuck.aliases = []\nfunction brainfuck(Prism) {\n  Prism.languages.brainfuck = {\n    pointer: {\n      pattern: /<|>/,\n      alias: 'keyword'\n    },\n    increment: {\n      pattern: /\\+/,\n      alias: 'inserted'\n    },\n    decrement: {\n      pattern: /-/,\n      alias: 'deleted'\n    },\n    branching: {\n      pattern: /\\[|\\]/,\n      alias: 'important'\n    },\n    operator: /[.,]/,\n    comment: /\\S+/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/brainfuck.js?");

/***/ })

}]);