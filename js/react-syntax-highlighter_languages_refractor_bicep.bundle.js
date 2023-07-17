"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_bicep"],{

/***/ "./node_modules/refractor/lang/bicep.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/bicep.js ***!
  \**********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = bicep\nbicep.displayName = 'bicep'\nbicep.aliases = []\nfunction bicep(Prism) {\n  // based loosely upon: https://github.com/Azure/bicep/blob/main/src/textmate/bicep.tmlanguage\n  Prism.languages.bicep = {\n    comment: [\n      {\n        // multiline comments eg /* ASDF */\n        pattern: /(^|[^\\\\])\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n        lookbehind: true,\n        greedy: true\n      },\n      {\n        // singleline comments eg // ASDF\n        pattern: /(^|[^\\\\:])\\/\\/.*/,\n        lookbehind: true,\n        greedy: true\n      }\n    ],\n    property: [\n      {\n        pattern: /([\\r\\n][ \\t]*)[a-z_]\\w*(?=[ \\t]*:)/i,\n        lookbehind: true\n      },\n      {\n        pattern: /([\\r\\n][ \\t]*)'(?:\\\\.|\\$(?!\\{)|[^'\\\\\\r\\n$])*'(?=[ \\t]*:)/,\n        lookbehind: true,\n        greedy: true\n      }\n    ],\n    string: [\n      {\n        pattern: /'''[^'][\\s\\S]*?'''/,\n        greedy: true\n      },\n      {\n        pattern: /(^|[^\\\\'])'(?:\\\\.|\\$(?!\\{)|[^'\\\\\\r\\n$])*'/,\n        lookbehind: true,\n        greedy: true\n      }\n    ],\n    'interpolated-string': {\n      pattern: /(^|[^\\\\'])'(?:\\\\.|\\$(?:(?!\\{)|\\{[^{}\\r\\n]*\\})|[^'\\\\\\r\\n$])*'/,\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern: /\\$\\{[^{}\\r\\n]*\\}/,\n          inside: {\n            expression: {\n              pattern: /(^\\$\\{)[\\s\\S]+(?=\\}$)/,\n              lookbehind: true\n            },\n            punctuation: /^\\$\\{|\\}$/\n          }\n        },\n        string: /[\\s\\S]+/\n      }\n    },\n    datatype: {\n      pattern: /(\\b(?:output|param)\\b[ \\t]+\\w+[ \\t]+)\\w+\\b/,\n      lookbehind: true,\n      alias: 'class-name'\n    },\n    boolean: /\\b(?:false|true)\\b/,\n    // https://github.com/Azure/bicep/blob/114a3251b4e6e30082a58729f19a8cc4e374ffa6/src/textmate/bicep.tmlanguage#L184\n    keyword:\n      /\\b(?:existing|for|if|in|module|null|output|param|resource|targetScope|var)\\b/,\n    decorator: /@\\w+\\b/,\n    function: /\\b[a-z_]\\w*(?=[ \\t]*\\()/i,\n    number: /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:E[+-]?\\d+)?/i,\n    operator:\n      /--|\\+\\+|\\*\\*=?|=>|&&=?|\\|\\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\\.{3}|\\?\\?=?|\\?\\.?|[~:]/,\n    punctuation: /[{}[\\];(),.:]/\n  }\n  Prism.languages.bicep['interpolated-string'].inside['interpolation'].inside[\n    'expression'\n  ].inside = Prism.languages.bicep\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/bicep.js?");

/***/ })

}]);