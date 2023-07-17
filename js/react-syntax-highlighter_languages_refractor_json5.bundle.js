"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_json5"],{

/***/ "./node_modules/refractor/lang/json.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/json.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = json\njson.displayName = 'json'\njson.aliases = ['webmanifest']\nfunction json(Prism) {\n  // https://www.json.org/json-en.html\n  Prism.languages.json = {\n    property: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"(?=\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"(?!\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    comment: {\n      pattern: /\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n      greedy: true\n    },\n    number: /-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b/i,\n    punctuation: /[{}[\\],]/,\n    operator: /:/,\n    boolean: /\\b(?:false|true)\\b/,\n    null: {\n      pattern: /\\bnull\\b/,\n      alias: 'keyword'\n    }\n  }\n  Prism.languages.webmanifest = Prism.languages.json\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/json.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/json5.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/json5.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorJson = __webpack_require__(/*! ./json.js */ \"./node_modules/refractor/lang/json.js\")\nmodule.exports = json5\njson5.displayName = 'json5'\njson5.aliases = []\nfunction json5(Prism) {\n  Prism.register(refractorJson)\n  ;(function (Prism) {\n    var string = /(\"|')(?:\\\\(?:\\r\\n?|\\n|.)|(?!\\1)[^\\\\\\r\\n])*\\1/\n    Prism.languages.json5 = Prism.languages.extend('json', {\n      property: [\n        {\n          pattern: RegExp(string.source + '(?=\\\\s*:)'),\n          greedy: true\n        },\n        {\n          pattern:\n            /(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*(?=\\s*:)/,\n          alias: 'unquoted'\n        }\n      ],\n      string: {\n        pattern: string,\n        greedy: true\n      },\n      number:\n        /[+-]?\\b(?:NaN|Infinity|0x[a-fA-F\\d]+)\\b|[+-]?(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:[eE][+-]?\\d+\\b)?/\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/json5.js?");

/***/ })

}]);