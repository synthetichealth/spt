"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_sml"],{

/***/ "./node_modules/refractor/lang/sml.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/sml.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = sml\nsml.displayName = 'sml'\nsml.aliases = ['smlnj']\nfunction sml(Prism) {\n  // https://smlfamily.github.io/sml97-defn.pdf\n  // https://people.mpi-sws.org/~rossberg/sml.html\n  ;(function (Prism) {\n    var keywords =\n      /\\b(?:abstype|and|andalso|as|case|datatype|do|else|end|eqtype|exception|fn|fun|functor|handle|if|in|include|infix|infixr|let|local|nonfix|of|op|open|orelse|raise|rec|sharing|sig|signature|struct|structure|then|type|val|where|while|with|withtype)\\b/i\n    Prism.languages.sml = {\n      // allow one level of nesting\n      comment:\n        /\\(\\*(?:[^*(]|\\*(?!\\))|\\((?!\\*)|\\(\\*(?:[^*(]|\\*(?!\\))|\\((?!\\*))*\\*\\))*\\*\\)/,\n      string: {\n        pattern: /#?\"(?:[^\"\\\\]|\\\\.)*\"/,\n        greedy: true\n      },\n      'class-name': [\n        {\n          // This is only an approximation since the real grammar is context-free\n          //\n          // Why the main loop so complex?\n          // The main loop is approximately the same as /(?:\\s*(?:[*,]|->)\\s*<TERMINAL>)*/ which is, obviously, a lot\n          // simpler. The difference is that if a comma is the last iteration of the loop, then the terminal must be\n          // followed by a long identifier.\n          pattern: RegExp(\n            /((?:^|[^:]):\\s*)<TERMINAL>(?:\\s*(?:(?:\\*|->)\\s*<TERMINAL>|,\\s*<TERMINAL>(?:(?=<NOT-LAST>)|(?!<NOT-LAST>)\\s+<LONG-ID>)))*/.source\n              .replace(/<NOT-LAST>/g, function () {\n                return /\\s*(?:[*,]|->)/.source\n              })\n              .replace(/<TERMINAL>/g, function () {\n                return /(?:'[\\w']*|<LONG-ID>|\\((?:[^()]|\\([^()]*\\))*\\)|\\{(?:[^{}]|\\{[^{}]*\\})*\\})(?:\\s+<LONG-ID>)*/\n                  .source\n              })\n              .replace(/<LONG-ID>/g, function () {\n                return /(?!<KEYWORD>)[a-z\\d_][\\w'.]*/.source\n              })\n              .replace(/<KEYWORD>/g, function () {\n                return keywords.source\n              }),\n            'i'\n          ),\n          lookbehind: true,\n          greedy: true,\n          inside: null // see below\n        },\n        {\n          pattern:\n            /((?:^|[^\\w'])(?:datatype|exception|functor|signature|structure|type)\\s+)[a-z_][\\w'.]*/i,\n          lookbehind: true\n        }\n      ],\n      function: {\n        pattern: /((?:^|[^\\w'])fun\\s+)[a-z_][\\w'.]*/i,\n        lookbehind: true\n      },\n      keyword: keywords,\n      variable: {\n        pattern: /(^|[^\\w'])'[\\w']*/,\n        lookbehind: true\n      },\n      number: /~?\\b(?:\\d+(?:\\.\\d+)?(?:e~?\\d+)?|0x[\\da-f]+)\\b/i,\n      word: {\n        pattern: /\\b0w(?:\\d+|x[\\da-f]+)\\b/i,\n        alias: 'constant'\n      },\n      boolean: /\\b(?:false|true)\\b/i,\n      operator: /\\.\\.\\.|:[>=:]|=>?|->|[<>]=?|[!+\\-*/^#|@~]/,\n      punctuation: /[(){}\\[\\].:,;]/\n    }\n    Prism.languages.sml['class-name'][0].inside = Prism.languages.sml\n    Prism.languages.smlnj = Prism.languages.sml\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/sml.js?");

/***/ })

}]);