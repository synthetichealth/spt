"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_j"],{

/***/ "./node_modules/refractor/lang/j.js":
/*!******************************************!*\
  !*** ./node_modules/refractor/lang/j.js ***!
  \******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = j\nj.displayName = 'j'\nj.aliases = []\nfunction j(Prism) {\n  Prism.languages.j = {\n    comment: {\n      pattern: /\\bNB\\..*/,\n      greedy: true\n    },\n    string: {\n      pattern: /'(?:''|[^'\\r\\n])*'/,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:(?:CR|LF|adverb|conjunction|def|define|dyad|monad|noun|verb)\\b|(?:assert|break|case|catch[dt]?|continue|do|else|elseif|end|fcase|for|for_\\w+|goto_\\w+|if|label_\\w+|return|select|throw|try|while|whilst)\\.)/,\n    verb: {\n      // Negative look-ahead prevents bad highlighting\n      // of ^: ;. =. =: !. !:\n      pattern:\n        /(?!\\^:|;\\.|[=!][.:])(?:\\{(?:\\.|::?)?|p(?:\\.\\.?|:)|[=!\\]]|[<>+*\\-%$|,#][.:]?|[?^]\\.?|[;\\[]:?|[~}\"i][.:]|[ACeEIjLor]\\.|(?:[_\\/\\\\qsux]|_?\\d):)/,\n      alias: 'keyword'\n    },\n    number:\n      /\\b_?(?:(?!\\d:)\\d+(?:\\.\\d+)?(?:(?:ad|ar|[ejpx])_?\\d+(?:\\.\\d+)?)*(?:b_?[\\da-z]+(?:\\.[\\da-z]+)?)?|_\\b(?!\\.))/,\n    adverb: {\n      pattern: /[~}]|[\\/\\\\]\\.?|[bfM]\\.|t[.:]/,\n      alias: 'builtin'\n    },\n    operator: /[=a][.:]|_\\./,\n    conjunction: {\n      pattern: /&(?:\\.:?|:)?|[.:@][.:]?|[!D][.:]|[;dHT]\\.|`:?|[\\^LS]:|\"/,\n      alias: 'variable'\n    },\n    punctuation: /[()]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/j.js?");

/***/ })

}]);