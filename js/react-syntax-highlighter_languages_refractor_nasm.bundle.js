"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_nasm"],{

/***/ "./node_modules/refractor/lang/nasm.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/nasm.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = nasm\nnasm.displayName = 'nasm'\nnasm.aliases = []\nfunction nasm(Prism) {\n  Prism.languages.nasm = {\n    comment: /;.*$/m,\n    string: /([\"'`])(?:\\\\.|(?!\\1)[^\\\\\\r\\n])*\\1/,\n    label: {\n      pattern: /(^\\s*)[A-Za-z._?$][\\w.?$@~#]*:/m,\n      lookbehind: true,\n      alias: 'function'\n    },\n    keyword: [\n      /\\[?BITS (?:16|32|64)\\]?/,\n      {\n        pattern: /(^\\s*)section\\s*[a-z.]+:?/im,\n        lookbehind: true\n      },\n      /(?:extern|global)[^;\\r\\n]*/i,\n      /(?:CPU|DEFAULT|FLOAT).*$/m\n    ],\n    register: {\n      pattern:\n        /\\b(?:st\\d|[xyz]mm\\d\\d?|[cdt]r\\d|r\\d\\d?[bwd]?|[er]?[abcd]x|[abcd][hl]|[er]?(?:bp|di|si|sp)|[cdefgs]s)\\b/i,\n      alias: 'variable'\n    },\n    number:\n      /(?:\\b|(?=\\$))(?:0[hx](?:\\.[\\da-f]+|[\\da-f]+(?:\\.[\\da-f]+)?)(?:p[+-]?\\d+)?|\\d[\\da-f]+[hx]|\\$\\d[\\da-f]*|0[oq][0-7]+|[0-7]+[oq]|0[by][01]+|[01]+[by]|0[dt]\\d+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:\\.?e[+-]?\\d+)?[dt]?)\\b/i,\n    operator: /[\\[\\]*+\\-\\/%<>=&|$!]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/nasm.js?");

/***/ })

}]);