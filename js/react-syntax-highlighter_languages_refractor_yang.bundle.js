"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_yang"],{

/***/ "./node_modules/refractor/lang/yang.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/yang.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = yang\nyang.displayName = 'yang'\nyang.aliases = []\nfunction yang(Prism) {\n  Prism.languages.yang = {\n    // https://tools.ietf.org/html/rfc6020#page-34\n    // http://www.yang-central.org/twiki/bin/view/Main/YangExamples\n    comment: /\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*/,\n    string: {\n      pattern: /\"(?:[^\\\\\"]|\\\\.)*\"|'[^']*'/,\n      greedy: true\n    },\n    keyword: {\n      pattern: /(^|[{};\\r\\n][ \\t]*)[a-z_][\\w.-]*/i,\n      lookbehind: true\n    },\n    namespace: {\n      pattern: /(\\s)[a-z_][\\w.-]*(?=:)/i,\n      lookbehind: true\n    },\n    boolean: /\\b(?:false|true)\\b/,\n    operator: /\\+/,\n    punctuation: /[{};:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/yang.js?");

/***/ })

}]);