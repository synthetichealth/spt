"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_jexl"],{

/***/ "./node_modules/refractor/lang/jexl.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/jexl.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = jexl\njexl.displayName = 'jexl'\njexl.aliases = []\nfunction jexl(Prism) {\n  Prism.languages.jexl = {\n    string: /([\"'])(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1/,\n    transform: {\n      pattern:\n        /(\\|\\s*)[a-zA-Zа-яА-Я_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF$][\\wа-яА-Я\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF$]*/,\n      alias: 'function',\n      lookbehind: true\n    },\n    function:\n      /[a-zA-Zа-яА-Я_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF$][\\wа-яА-Я\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u00FF$]*\\s*(?=\\()/,\n    number: /\\b\\d+(?:\\.\\d+)?\\b|\\B\\.\\d+\\b/,\n    operator: /[<>!]=?|-|\\+|&&|==|\\|\\|?|\\/\\/?|[?:*^%]/,\n    boolean: /\\b(?:false|true)\\b/,\n    keyword: /\\bin\\b/,\n    punctuation: /[{}[\\](),.]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/jexl.js?");

/***/ })

}]);