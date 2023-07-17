"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_monkey"],{

/***/ "./node_modules/refractor/lang/monkey.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/monkey.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = monkey\nmonkey.displayName = 'monkey'\nmonkey.aliases = []\nfunction monkey(Prism) {\n  Prism.languages.monkey = {\n    comment: {\n      pattern: /^#Rem\\s[\\s\\S]*?^#End|'.+/im,\n      greedy: true\n    },\n    string: {\n      pattern: /\"[^\"\\r\\n]*\"/,\n      greedy: true\n    },\n    preprocessor: {\n      pattern: /(^[ \\t]*)#.+/m,\n      lookbehind: true,\n      greedy: true,\n      alias: 'property'\n    },\n    function: /\\b\\w+(?=\\()/,\n    'type-char': {\n      pattern: /\\b[?%#$]/,\n      alias: 'class-name'\n    },\n    number: {\n      pattern:\n        /((?:\\.\\.)?)(?:(?:\\b|\\B-\\.?|\\B\\.)\\d+(?:(?!\\.\\.)\\.\\d*)?|\\$[\\da-f]+)/i,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:Abstract|Array|Bool|Case|Catch|Class|Const|Continue|Default|Eachin|Else|ElseIf|End|EndIf|Exit|Extends|Extern|False|Field|Final|Float|For|Forever|Function|Global|If|Implements|Import|Inline|Int|Interface|Local|Method|Module|New|Next|Null|Object|Private|Property|Public|Repeat|Return|Select|Self|Step|Strict|String|Super|Then|Throw|To|True|Try|Until|Void|Wend|While)\\b/i,\n    operator:\n      /\\.\\.|<[=>]?|>=?|:?=|(?:[+\\-*\\/&~|]|\\b(?:Mod|Shl|Shr)\\b)=?|\\b(?:And|Not|Or)\\b/i,\n    punctuation: /[.,:;()\\[\\]]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/monkey.js?");

/***/ })

}]);