"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_aql"],{

/***/ "./node_modules/refractor/lang/aql.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/aql.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = aql\naql.displayName = 'aql'\naql.aliases = []\nfunction aql(Prism) {\n  Prism.languages.aql = {\n    comment: /\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\//,\n    property: {\n      pattern:\n        /([{,]\\s*)(?:(?!\\d)\\w+|([\"'´`])(?:(?!\\2)[^\\\\\\r\\n]|\\\\.)*\\2)(?=\\s*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /([\"'])(?:(?!\\1)[^\\\\\\r\\n]|\\\\.)*\\1/,\n      greedy: true\n    },\n    identifier: {\n      pattern: /([´`])(?:(?!\\1)[^\\\\\\r\\n]|\\\\.)*\\1/,\n      greedy: true\n    },\n    variable: /@@?\\w+/,\n    keyword: [\n      {\n        pattern: /(\\bWITH\\s+)COUNT(?=\\s+INTO\\b)/i,\n        lookbehind: true\n      },\n      /\\b(?:AGGREGATE|ALL|AND|ANY|ASC|COLLECT|DESC|DISTINCT|FILTER|FOR|GRAPH|IN|INBOUND|INSERT|INTO|K_PATHS|K_SHORTEST_PATHS|LET|LIKE|LIMIT|NONE|NOT|NULL|OR|OUTBOUND|REMOVE|REPLACE|RETURN|SHORTEST_PATH|SORT|UPDATE|UPSERT|WINDOW|WITH)\\b/i, // pseudo keywords get a lookbehind to avoid false positives\n      {\n        pattern: /(^|[^\\w.[])(?:KEEP|PRUNE|SEARCH|TO)\\b/i,\n        lookbehind: true\n      },\n      {\n        pattern: /(^|[^\\w.[])(?:CURRENT|NEW|OLD)\\b/,\n        lookbehind: true\n      },\n      {\n        pattern: /\\bOPTIONS(?=\\s*\\{)/i\n      }\n    ],\n    function: /\\b(?!\\d)\\w+(?=\\s*\\()/,\n    boolean: /\\b(?:false|true)\\b/i,\n    range: {\n      pattern: /\\.\\./,\n      alias: 'operator'\n    },\n    number: [\n      /\\b0b[01]+/i,\n      /\\b0x[0-9a-f]+/i,\n      /(?:\\B\\.\\d+|\\b(?:0|[1-9]\\d*)(?:\\.\\d+)?)(?:e[+-]?\\d+)?/i\n    ],\n    operator: /\\*{2,}|[=!]~|[!=<>]=?|&&|\\|\\||[-+*/%]/,\n    punctuation: /::|[?.:,;()[\\]{}]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/aql.js?");

/***/ })

}]);