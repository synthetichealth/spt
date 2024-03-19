"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_dhall"],{

/***/ "./node_modules/refractor/lang/dhall.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/dhall.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = dhall\ndhall.displayName = 'dhall'\ndhall.aliases = []\nfunction dhall(Prism) {\n  // ABNF grammar:\n  // https://github.com/dhall-lang/dhall-lang/blob/master/standard/dhall.abnf\n  Prism.languages.dhall = {\n    // Multi-line comments can be nested. E.g. {- foo {- bar -} -}\n    // The multi-line pattern is essentially this:\n    //   \\{-(?:[^-{]|-(?!\\})|\\{(?!-)|<SELF>)*-\\}\n    comment:\n      /--.*|\\{-(?:[^-{]|-(?!\\})|\\{(?!-)|\\{-(?:[^-{]|-(?!\\})|\\{(?!-))*-\\})*-\\}/,\n    string: {\n      pattern: /\"(?:[^\"\\\\]|\\\\.)*\"|''(?:[^']|'(?!')|'''|''\\$\\{)*''(?!'|\\$)/,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern: /\\$\\{[^{}]*\\}/,\n          inside: {\n            expression: {\n              pattern: /(^\\$\\{)[\\s\\S]+(?=\\}$)/,\n              lookbehind: true,\n              alias: 'language-dhall',\n              inside: null // see blow\n            },\n            punctuation: /\\$\\{|\\}/\n          }\n        }\n      }\n    },\n    label: {\n      pattern: /`[^`]*`/,\n      greedy: true\n    },\n    url: {\n      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L596\n      pattern:\n        /\\bhttps?:\\/\\/[\\w.:%!$&'*+;=@~-]+(?:\\/[\\w.:%!$&'*+;=@~-]*)*(?:\\?[/?\\w.:%!$&'*+;=@~-]*)?/,\n      greedy: true\n    },\n    env: {\n      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L661\n      pattern: /\\benv:(?:(?!\\d)\\w+|\"(?:[^\"\\\\=]|\\\\.)*\")/,\n      greedy: true,\n      inside: {\n        function: /^env/,\n        operator: /^:/,\n        variable: /[\\s\\S]+/\n      }\n    },\n    hash: {\n      // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L725\n      pattern: /\\bsha256:[\\da-fA-F]{64}\\b/,\n      inside: {\n        function: /sha256/,\n        operator: /:/,\n        number: /[\\da-fA-F]{64}/\n      }\n    },\n    // https://github.com/dhall-lang/dhall-lang/blob/5fde8ef1bead6fb4e999d3c1ffe7044cd019d63a/standard/dhall.abnf#L359\n    keyword:\n      /\\b(?:as|assert|else|forall|if|in|let|merge|missing|then|toMap|using|with)\\b|\\u2200/,\n    builtin: /\\b(?:None|Some)\\b/,\n    boolean: /\\b(?:False|True)\\b/,\n    number:\n      /\\bNaN\\b|-?\\bInfinity\\b|[+-]?\\b(?:0x[\\da-fA-F]+|\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?)\\b/,\n    operator:\n      /\\/\\\\|\\/\\/\\\\\\\\|&&|\\|\\||===|[!=]=|\\/\\/|->|\\+\\+|::|[+*#@=:?<>|\\\\\\u2227\\u2a53\\u2261\\u2afd\\u03bb\\u2192]/,\n    punctuation: /\\.\\.|[{}\\[\\](),./]/,\n    // we'll just assume that every capital word left is a type name\n    'class-name': /\\b[A-Z]\\w*\\b/\n  }\n  Prism.languages.dhall.string.inside.interpolation.inside.expression.inside =\n    Prism.languages.dhall\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/dhall.js?");

/***/ })

}]);