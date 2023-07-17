"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_antlr4"],{

/***/ "./node_modules/refractor/lang/antlr4.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/antlr4.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = antlr4\nantlr4.displayName = 'antlr4'\nantlr4.aliases = ['g4']\nfunction antlr4(Prism) {\n  Prism.languages.antlr4 = {\n    comment: /\\/\\/.*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n    string: {\n      pattern: /'(?:\\\\.|[^\\\\'\\r\\n])*'/,\n      greedy: true\n    },\n    'character-class': {\n      pattern: /\\[(?:\\\\.|[^\\\\\\]\\r\\n])*\\]/,\n      greedy: true,\n      alias: 'regex',\n      inside: {\n        range: {\n          pattern: /([^[]|(?:^|[^\\\\])(?:\\\\\\\\)*\\\\\\[)-(?!\\])/,\n          lookbehind: true,\n          alias: 'punctuation'\n        },\n        escape:\n          /\\\\(?:u(?:[a-fA-F\\d]{4}|\\{[a-fA-F\\d]+\\})|[pP]\\{[=\\w-]+\\}|[^\\r\\nupP])/,\n        punctuation: /[\\[\\]]/\n      }\n    },\n    action: {\n      pattern: /\\{(?:[^{}]|\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})*\\})*\\}/,\n      greedy: true,\n      inside: {\n        content: {\n          // this might be C, C++, Python, Java, C#, or any other language ANTLR4 compiles to\n          pattern: /(\\{)[\\s\\S]+(?=\\})/,\n          lookbehind: true\n        },\n        punctuation: /[{}]/\n      }\n    },\n    command: {\n      pattern:\n        /(->\\s*(?!\\s))(?:\\s*(?:,\\s*)?\\b[a-z]\\w*(?:\\s*\\([^()\\r\\n]*\\))?)+(?=\\s*;)/i,\n      lookbehind: true,\n      inside: {\n        function: /\\b\\w+(?=\\s*(?:[,(]|$))/,\n        punctuation: /[,()]/\n      }\n    },\n    annotation: {\n      pattern: /@\\w+(?:::\\w+)*/,\n      alias: 'keyword'\n    },\n    label: {\n      pattern: /#[ \\t]*\\w+/,\n      alias: 'punctuation'\n    },\n    keyword:\n      /\\b(?:catch|channels|finally|fragment|grammar|import|lexer|locals|mode|options|parser|returns|throws|tokens)\\b/,\n    definition: [\n      {\n        pattern: /\\b[a-z]\\w*(?=\\s*:)/,\n        alias: ['rule', 'class-name']\n      },\n      {\n        pattern: /\\b[A-Z]\\w*(?=\\s*:)/,\n        alias: ['token', 'constant']\n      }\n    ],\n    constant: /\\b[A-Z][A-Z_]*\\b/,\n    operator: /\\.\\.|->|[|~]|[*+?]\\??/,\n    punctuation: /[;:()=]/\n  }\n  Prism.languages.g4 = Prism.languages.antlr4\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/antlr4.js?");

/***/ })

}]);