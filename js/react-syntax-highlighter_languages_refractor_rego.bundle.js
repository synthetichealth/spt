"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_rego"],{

/***/ "./node_modules/refractor/lang/rego.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/rego.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = rego\nrego.displayName = 'rego'\nrego.aliases = []\nfunction rego(Prism) {\n  // https://www.openpolicyagent.org/docs/latest/policy-reference/\n  Prism.languages.rego = {\n    comment: /#.*/,\n    property: {\n      pattern:\n        /(^|[^\\\\.])(?:\"(?:\\\\.|[^\\\\\"\\r\\n])*\"|`[^`]*`|\\b[a-z_]\\w*\\b)(?=\\s*:(?!=))/i,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /(^|[^\\\\])\"(?:\\\\.|[^\\\\\"\\r\\n])*\"|`[^`]*`/,\n      lookbehind: true,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:as|default|else|import|not|null|package|set(?=\\s*\\()|some|with)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    function: {\n      pattern: /\\b[a-z_]\\w*\\b(?:\\s*\\.\\s*\\b[a-z_]\\w*\\b)*(?=\\s*\\()/i,\n      inside: {\n        namespace: /\\b\\w+\\b(?=\\s*\\.)/,\n        punctuation: /\\./\n      }\n    },\n    number: /-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b/i,\n    operator: /[-+*/%|&]|[<>:=]=?|!=|\\b_\\b/,\n    punctuation: /[,;.\\[\\]{}()]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/rego.js?");

/***/ })

}]);