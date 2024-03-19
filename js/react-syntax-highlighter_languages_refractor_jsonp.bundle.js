"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_jsonp"],{

/***/ "./node_modules/refractor/lang/json.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/json.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = json\njson.displayName = 'json'\njson.aliases = ['webmanifest']\nfunction json(Prism) {\n  // https://www.json.org/json-en.html\n  Prism.languages.json = {\n    property: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"(?=\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"(?!\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    comment: {\n      pattern: /\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n      greedy: true\n    },\n    number: /-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b/i,\n    punctuation: /[{}[\\],]/,\n    operator: /:/,\n    boolean: /\\b(?:false|true)\\b/,\n    null: {\n      pattern: /\\bnull\\b/,\n      alias: 'keyword'\n    }\n  }\n  Prism.languages.webmanifest = Prism.languages.json\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/json.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/jsonp.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/jsonp.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorJson = __webpack_require__(/*! ./json.js */ \"./node_modules/refractor/lang/json.js\")\nmodule.exports = jsonp\njsonp.displayName = 'jsonp'\njsonp.aliases = []\nfunction jsonp(Prism) {\n  Prism.register(refractorJson)\n  Prism.languages.jsonp = Prism.languages.extend('json', {\n    punctuation: /[{}[\\]();,.]/\n  })\n  Prism.languages.insertBefore('jsonp', 'punctuation', {\n    function: /(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*(?=\\s*\\()/\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/jsonp.js?");

/***/ })

}]);