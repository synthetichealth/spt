"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_erlang"],{

/***/ "./node_modules/refractor/lang/erlang.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/erlang.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = erlang\nerlang.displayName = 'erlang'\nerlang.aliases = []\nfunction erlang(Prism) {\n  Prism.languages.erlang = {\n    comment: /%.+/,\n    string: {\n      pattern: /\"(?:\\\\.|[^\\\\\"\\r\\n])*\"/,\n      greedy: true\n    },\n    'quoted-function': {\n      pattern: /'(?:\\\\.|[^\\\\'\\r\\n])+'(?=\\()/,\n      alias: 'function'\n    },\n    'quoted-atom': {\n      pattern: /'(?:\\\\.|[^\\\\'\\r\\n])+'/,\n      alias: 'atom'\n    },\n    boolean: /\\b(?:false|true)\\b/,\n    keyword: /\\b(?:after|case|catch|end|fun|if|of|receive|try|when)\\b/,\n    number: [\n      /\\$\\\\?./,\n      /\\b\\d+#[a-z0-9]+/i,\n      /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?/i\n    ],\n    function: /\\b[a-z][\\w@]*(?=\\()/,\n    variable: {\n      // Look-behind is used to prevent wrong highlighting of atoms containing \"@\"\n      pattern: /(^|[^@])(?:\\b|\\?)[A-Z_][\\w@]*/,\n      lookbehind: true\n    },\n    operator: [\n      /[=\\/<>:]=|=[:\\/]=|\\+\\+?|--?|[=*\\/!]|\\b(?:and|andalso|band|bnot|bor|bsl|bsr|bxor|div|not|or|orelse|rem|xor)\\b/,\n      {\n        // We don't want to match <<\n        pattern: /(^|[^<])<(?!<)/,\n        lookbehind: true\n      },\n      {\n        // We don't want to match >>\n        pattern: /(^|[^>])>(?!>)/,\n        lookbehind: true\n      }\n    ],\n    atom: /\\b[a-z][\\w@]*/,\n    punctuation: /[()[\\]{}:;,.#|]|<<|>>/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/erlang.js?");

/***/ })

}]);