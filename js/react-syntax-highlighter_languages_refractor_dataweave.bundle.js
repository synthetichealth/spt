"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_dataweave"],{

/***/ "./node_modules/refractor/lang/dataweave.js":
/*!**************************************************!*\
  !*** ./node_modules/refractor/lang/dataweave.js ***!
  \**************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = dataweave\ndataweave.displayName = 'dataweave'\ndataweave.aliases = []\nfunction dataweave(Prism) {\n  ;(function (Prism) {\n    Prism.languages.dataweave = {\n      url: /\\b[A-Za-z]+:\\/\\/[\\w/:.?=&-]+|\\burn:[\\w:.?=&-]+/,\n      property: {\n        pattern: /(?:\\b\\w+#)?(?:\"(?:\\\\.|[^\\\\\"\\r\\n])*\"|\\b\\w+)(?=\\s*[:@])/,\n        greedy: true\n      },\n      string: {\n        pattern: /([\"'`])(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1/,\n        greedy: true\n      },\n      'mime-type':\n        /\\b(?:application|audio|image|multipart|text|video)\\/[\\w+-]+/,\n      date: {\n        pattern: /\\|[\\w:+-]+\\|/,\n        greedy: true\n      },\n      comment: [\n        {\n          pattern: /(^|[^\\\\])\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n          lookbehind: true,\n          greedy: true\n        },\n        {\n          pattern: /(^|[^\\\\:])\\/\\/.*/,\n          lookbehind: true,\n          greedy: true\n        }\n      ],\n      regex: {\n        pattern: /\\/(?:[^\\\\\\/\\r\\n]|\\\\[^\\r\\n])+\\//,\n        greedy: true\n      },\n      keyword:\n        /\\b(?:and|as|at|case|do|else|fun|if|input|is|match|not|ns|null|or|output|type|unless|update|using|var)\\b/,\n      function: /\\b[A-Z_]\\w*(?=\\s*\\()/i,\n      number: /-?\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?\\b/i,\n      punctuation: /[{}[\\];(),.:@]/,\n      operator: /<<|>>|->|[<>~=]=?|!=|--?-?|\\+\\+?|!|\\?/,\n      boolean: /\\b(?:false|true)\\b/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/dataweave.js?");

/***/ })

}]);