"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_kusto"],{

/***/ "./node_modules/refractor/lang/kusto.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/kusto.js ***!
  \**********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = kusto\nkusto.displayName = 'kusto'\nkusto.aliases = []\nfunction kusto(Prism) {\n  Prism.languages.kusto = {\n    comment: {\n      pattern: /\\/\\/.*/,\n      greedy: true\n    },\n    string: {\n      pattern:\n        /```[\\s\\S]*?```|[hH]?(?:\"(?:[^\\r\\n\\\\\"]|\\\\.)*\"|'(?:[^\\r\\n\\\\']|\\\\.)*'|@(?:\"[^\\r\\n\"]*\"|'[^\\r\\n']*'))/,\n      greedy: true\n    },\n    verb: {\n      pattern: /(\\|\\s*)[a-z][\\w-]*/i,\n      lookbehind: true,\n      alias: 'keyword'\n    },\n    command: {\n      pattern: /\\.[a-z][a-z\\d-]*\\b/,\n      alias: 'keyword'\n    },\n    'class-name':\n      /\\b(?:bool|datetime|decimal|dynamic|guid|int|long|real|string|timespan)\\b/,\n    keyword:\n      /\\b(?:access|alias|and|anti|as|asc|auto|between|by|(?:contains|(?:ends|starts)with|has(?:perfix|suffix)?)(?:_cs)?|database|declare|desc|external|from|fullouter|has_all|in|ingestion|inline|inner|innerunique|into|(?:left|right)(?:anti(?:semi)?|inner|outer|semi)?|let|like|local|not|of|on|or|pattern|print|query_parameters|range|restrict|schema|set|step|table|tables|to|view|where|with|matches\\s+regex|nulls\\s+(?:first|last))(?![\\w-])/,\n    boolean: /\\b(?:false|null|true)\\b/,\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/,\n    datetime: [\n      {\n        // RFC 822 + RFC 850\n        pattern:\n          /\\b(?:(?:Fri|Friday|Mon|Monday|Sat|Saturday|Sun|Sunday|Thu|Thursday|Tue|Tuesday|Wed|Wednesday)\\s*,\\s*)?\\d{1,2}(?:\\s+|-)(?:Apr|Aug|Dec|Feb|Jan|Jul|Jun|Mar|May|Nov|Oct|Sep)(?:\\s+|-)\\d{2}\\s+\\d{2}:\\d{2}(?::\\d{2})?(?:\\s*(?:\\b(?:[A-Z]|(?:[ECMT][DS]|GM|U)T)|[+-]\\d{4}))?\\b/,\n        alias: 'number'\n      },\n      {\n        // ISO 8601\n        pattern:\n          /[+-]?\\b(?:\\d{4}-\\d{2}-\\d{2}(?:[ T]\\d{2}:\\d{2}(?::\\d{2}(?:\\.\\d+)?)?)?|\\d{2}:\\d{2}(?::\\d{2}(?:\\.\\d+)?)?)Z?/,\n        alias: 'number'\n      }\n    ],\n    number:\n      /\\b(?:0x[0-9A-Fa-f]+|\\d+(?:\\.\\d+)?(?:[Ee][+-]?\\d+)?)(?:(?:min|sec|[mnµ]s|[dhms]|microsecond|tick)\\b)?|[+-]?\\binf\\b/,\n    operator: /=>|[!=]~|[!=<>]=?|[-+*/%|]|\\.\\./,\n    punctuation: /[()\\[\\]{},;.:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/kusto.js?");

/***/ })

}]);