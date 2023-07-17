"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_typoscript"],{

/***/ "./node_modules/refractor/lang/typoscript.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/typoscript.js ***!
  \***************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = typoscript\ntyposcript.displayName = 'typoscript'\ntyposcript.aliases = ['tsconfig']\nfunction typoscript(Prism) {\n  ;(function (Prism) {\n    var keywords =\n      /\\b(?:ACT|ACTIFSUB|CARRAY|CASE|CLEARGIF|COA|COA_INT|CONSTANTS|CONTENT|CUR|EDITPANEL|EFFECT|EXT|FILE|FLUIDTEMPLATE|FORM|FRAME|FRAMESET|GIFBUILDER|GMENU|GMENU_FOLDOUT|GMENU_LAYERS|GP|HMENU|HRULER|HTML|IENV|IFSUB|IMAGE|IMGMENU|IMGMENUITEM|IMGTEXT|IMG_RESOURCE|INCLUDE_TYPOSCRIPT|JSMENU|JSMENUITEM|LLL|LOAD_REGISTER|NO|PAGE|RECORDS|RESTORE_REGISTER|TEMPLATE|TEXT|TMENU|TMENUITEM|TMENU_LAYERS|USER|USER_INT|_GIFBUILDER|global|globalString|globalVar)\\b/\n    Prism.languages.typoscript = {\n      comment: [\n        {\n          // multiline comments /* */\n          pattern: /(^|[^\\\\])\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n          lookbehind: true\n        },\n        {\n          // double-slash comments - ignored when backslashes or colon is found in front\n          // also ignored whenever directly after an equal-sign, because it would probably be an url without protocol\n          pattern: /(^|[^\\\\:= \\t]|(?:^|[^= \\t])[ \\t]+)\\/\\/.*/,\n          lookbehind: true,\n          greedy: true\n        },\n        {\n          // hash comments - ignored when leading quote is found for hex colors in strings\n          pattern: /(^|[^\"'])#.*/,\n          lookbehind: true,\n          greedy: true\n        }\n      ],\n      function: [\n        {\n          // old include style\n          pattern:\n            /<INCLUDE_TYPOSCRIPT:\\s*source\\s*=\\s*(?:\"[^\"\\r\\n]*\"|'[^'\\r\\n]*')\\s*>/,\n          inside: {\n            string: {\n              pattern: /\"[^\"\\r\\n]*\"|'[^'\\r\\n]*'/,\n              inside: {\n                keyword: keywords\n              }\n            },\n            keyword: {\n              pattern: /INCLUDE_TYPOSCRIPT/\n            }\n          }\n        },\n        {\n          // new include style\n          pattern: /@import\\s*(?:\"[^\"\\r\\n]*\"|'[^'\\r\\n]*')/,\n          inside: {\n            string: /\"[^\"\\r\\n]*\"|'[^'\\r\\n]*'/\n          }\n        }\n      ],\n      string: {\n        pattern: /^([^=]*=[< ]?)(?:(?!\\]\\n).)*/,\n        lookbehind: true,\n        inside: {\n          function: /\\{\\$.*\\}/,\n          // constants include\n          keyword: keywords,\n          number: /^\\d+$/,\n          punctuation: /[,|:]/\n        }\n      },\n      keyword: keywords,\n      number: {\n        // special highlighting for indexes of arrays in tags\n        pattern: /\\b\\d+\\s*[.{=]/,\n        inside: {\n          operator: /[.{=]/\n        }\n      },\n      tag: {\n        pattern: /\\.?[-\\w\\\\]+\\.?/,\n        inside: {\n          punctuation: /\\./\n        }\n      },\n      punctuation: /[{}[\\];(),.:|]/,\n      operator: /[<>]=?|[!=]=?=?|--?|\\+\\+?|&&?|\\|\\|?|[?*/~^%]/\n    }\n    Prism.languages.tsconfig = Prism.languages.typoscript\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/typoscript.js?");

/***/ })

}]);