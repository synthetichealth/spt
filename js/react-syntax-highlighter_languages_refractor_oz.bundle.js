"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_oz"],{

/***/ "./node_modules/refractor/lang/oz.js":
/*!*******************************************!*\
  !*** ./node_modules/refractor/lang/oz.js ***!
  \*******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = oz\noz.displayName = 'oz'\noz.aliases = []\nfunction oz(Prism) {\n  Prism.languages.oz = {\n    comment: {\n      pattern: /\\/\\*[\\s\\S]*?\\*\\/|%.*/,\n      greedy: true\n    },\n    string: {\n      pattern: /\"(?:[^\"\\\\]|\\\\[\\s\\S])*\"/,\n      greedy: true\n    },\n    atom: {\n      pattern: /'(?:[^'\\\\]|\\\\[\\s\\S])*'/,\n      greedy: true,\n      alias: 'builtin'\n    },\n    keyword:\n      /\\$|\\[\\]|\\b(?:_|at|attr|case|catch|choice|class|cond|declare|define|dis|else(?:case|if)?|end|export|fail|false|feat|finally|from|fun|functor|if|import|in|local|lock|meth|nil|not|of|or|prepare|proc|prop|raise|require|self|skip|then|thread|true|try|unit)\\b/,\n    function: [\n      /\\b[a-z][A-Za-z\\d]*(?=\\()/,\n      {\n        pattern: /(\\{)[A-Z][A-Za-z\\d]*\\b/,\n        lookbehind: true\n      }\n    ],\n    number:\n      /\\b(?:0[bx][\\da-f]+|\\d+(?:\\.\\d*)?(?:e~?\\d+)?)\\b|&(?:[^\\\\]|\\\\(?:\\d{3}|.))/i,\n    variable: /`(?:[^`\\\\]|\\\\.)+`/,\n    'attr-name': /\\b\\w+(?=[ \\t]*:(?![:=]))/,\n    operator:\n      /:(?:=|::?)|<[-:=]?|=(?:=|<?:?)|>=?:?|\\\\=:?|!!?|[|#+\\-*\\/,~^@]|\\b(?:andthen|div|mod|orelse)\\b/,\n    punctuation: /[\\[\\](){}.:;?]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/oz.js?");

/***/ })

}]);