"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_elm"],{

/***/ "./node_modules/refractor/lang/elm.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/elm.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = elm\nelm.displayName = 'elm'\nelm.aliases = []\nfunction elm(Prism) {\n  Prism.languages.elm = {\n    comment: /--.*|\\{-[\\s\\S]*?-\\}/,\n    char: {\n      pattern:\n        /'(?:[^\\\\'\\r\\n]|\\\\(?:[abfnrtv\\\\']|\\d+|x[0-9a-fA-F]+|u\\{[0-9a-fA-F]+\\}))'/,\n      greedy: true\n    },\n    string: [\n      {\n        // Multiline strings are wrapped in triple \". Quotes may appear unescaped.\n        pattern: /\"\"\"[\\s\\S]*?\"\"\"/,\n        greedy: true\n      },\n      {\n        pattern: /\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"/,\n        greedy: true\n      }\n    ],\n    'import-statement': {\n      // The imported or hidden names are not included in this import\n      // statement. This is because we want to highlight those exactly like\n      // we do for the names in the program.\n      pattern:\n        /(^[\\t ]*)import\\s+[A-Z]\\w*(?:\\.[A-Z]\\w*)*(?:\\s+as\\s+(?:[A-Z]\\w*)(?:\\.[A-Z]\\w*)*)?(?:\\s+exposing\\s+)?/m,\n      lookbehind: true,\n      inside: {\n        keyword: /\\b(?:as|exposing|import)\\b/\n      }\n    },\n    keyword:\n      /\\b(?:alias|as|case|else|exposing|if|in|infixl|infixr|let|module|of|then|type)\\b/,\n    // These are builtin variables only. Constructors are highlighted later as a constant.\n    builtin:\n      /\\b(?:abs|acos|always|asin|atan|atan2|ceiling|clamp|compare|cos|curry|degrees|e|flip|floor|fromPolar|identity|isInfinite|isNaN|logBase|max|min|negate|never|not|pi|radians|rem|round|sin|sqrt|tan|toFloat|toPolar|toString|truncate|turns|uncurry|xor)\\b/,\n    // decimal integers and floating point numbers | hexadecimal integers\n    number: /\\b(?:\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?|0x[0-9a-f]+)\\b/i,\n    // Most of this is needed because of the meaning of a single '.'.\n    // If it stands alone freely, it is the function composition.\n    // It may also be a separator between a module name and an identifier => no\n    // operator. If it comes together with other special characters it is an\n    // operator too.\n    // Valid operator characters in 0.18: +-/*=.$<>:&|^?%#@~!\n    // Ref: https://groups.google.com/forum/#!msg/elm-dev/0AHSnDdkSkQ/E0SVU70JEQAJ\n    operator: /\\s\\.\\s|[+\\-/*=.$<>:&|^?%#@~!]{2,}|[+\\-/*=$<>:&|^?%#@~!]/,\n    // In Elm, nearly everything is a variable, do not highlight these.\n    hvariable: /\\b(?:[A-Z]\\w*\\.)*[a-z]\\w*\\b/,\n    constant: /\\b(?:[A-Z]\\w*\\.)*[A-Z]\\w*\\b/,\n    punctuation: /[{}[\\]|(),.:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/elm.js?");

/***/ })

}]);