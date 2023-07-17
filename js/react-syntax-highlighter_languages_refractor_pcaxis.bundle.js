"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_pcaxis"],{

/***/ "./node_modules/refractor/lang/pcaxis.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/pcaxis.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = pcaxis\npcaxis.displayName = 'pcaxis'\npcaxis.aliases = ['px']\nfunction pcaxis(Prism) {\n  Prism.languages.pcaxis = {\n    string: /\"[^\"]*\"/,\n    keyword: {\n      pattern:\n        /((?:^|;)\\s*)[-A-Z\\d]+(?:\\s*\\[[-\\w]+\\])?(?:\\s*\\(\"[^\"]*\"(?:,\\s*\"[^\"]*\")*\\))?(?=\\s*=)/,\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        keyword: /^[-A-Z\\d]+/,\n        language: {\n          pattern: /^(\\s*)\\[[-\\w]+\\]/,\n          lookbehind: true,\n          inside: {\n            punctuation: /^\\[|\\]$/,\n            property: /[-\\w]+/\n          }\n        },\n        'sub-key': {\n          pattern: /^(\\s*)\\S[\\s\\S]*/,\n          lookbehind: true,\n          inside: {\n            parameter: {\n              pattern: /\"[^\"]*\"/,\n              alias: 'property'\n            },\n            punctuation: /^\\(|\\)$|,/\n          }\n        }\n      }\n    },\n    operator: /=/,\n    tlist: {\n      pattern:\n        /TLIST\\s*\\(\\s*\\w+(?:(?:\\s*,\\s*\"[^\"]*\")+|\\s*,\\s*\"[^\"]*\"-\"[^\"]*\")?\\s*\\)/,\n      greedy: true,\n      inside: {\n        function: /^TLIST/,\n        property: {\n          pattern: /^(\\s*\\(\\s*)\\w+/,\n          lookbehind: true\n        },\n        string: /\"[^\"]*\"/,\n        punctuation: /[(),]/,\n        operator: /-/\n      }\n    },\n    punctuation: /[;,]/,\n    number: {\n      pattern: /(^|\\s)\\d+(?:\\.\\d+)?(?!\\S)/,\n      lookbehind: true\n    },\n    boolean: /NO|YES/\n  }\n  Prism.languages.px = Prism.languages.pcaxis\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/pcaxis.js?");

/***/ })

}]);