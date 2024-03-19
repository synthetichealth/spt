"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_lua"],{

/***/ "./node_modules/refractor/lang/lua.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/lua.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = lua\nlua.displayName = 'lua'\nlua.aliases = []\nfunction lua(Prism) {\n  Prism.languages.lua = {\n    comment: /^#!.+|--(?:\\[(=*)\\[[\\s\\S]*?\\]\\1\\]|.*)/m,\n    // \\z may be used to skip the following space\n    string: {\n      pattern:\n        /([\"'])(?:(?!\\1)[^\\\\\\r\\n]|\\\\z(?:\\r\\n|\\s)|\\\\(?:\\r\\n|[^z]))*\\1|\\[(=*)\\[[\\s\\S]*?\\]\\2\\]/,\n      greedy: true\n    },\n    number:\n      /\\b0x[a-f\\d]+(?:\\.[a-f\\d]*)?(?:p[+-]?\\d+)?\\b|\\b\\d+(?:\\.\\B|(?:\\.\\d*)?(?:e[+-]?\\d+)?\\b)|\\B\\.\\d+(?:e[+-]?\\d+)?\\b/i,\n    keyword:\n      /\\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\\b/,\n    function: /(?!\\d)\\w+(?=\\s*(?:[({]))/,\n    operator: [\n      /[-+*%^&|#]|\\/\\/?|<[<=]?|>[>=]?|[=~]=?/,\n      {\n        // Match \"..\" but don't break \"...\"\n        pattern: /(^|[^.])\\.\\.(?!\\.)/,\n        lookbehind: true\n      }\n    ],\n    punctuation: /[\\[\\](){},;]|\\.+|:+/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/lua.js?");

/***/ })

}]);