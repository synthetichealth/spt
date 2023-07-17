"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_brightscript"],{

/***/ "./node_modules/refractor/lang/brightscript.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/brightscript.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = brightscript\nbrightscript.displayName = 'brightscript'\nbrightscript.aliases = []\nfunction brightscript(Prism) {\n  Prism.languages.brightscript = {\n    comment: /(?:\\brem|').*/i,\n    'directive-statement': {\n      pattern: /(^[\\t ]*)#(?:const|else(?:[\\t ]+if)?|end[\\t ]+if|error|if).*/im,\n      lookbehind: true,\n      alias: 'property',\n      inside: {\n        'error-message': {\n          pattern: /(^#error).+/,\n          lookbehind: true\n        },\n        directive: {\n          pattern: /^#(?:const|else(?:[\\t ]+if)?|end[\\t ]+if|error|if)/,\n          alias: 'keyword'\n        },\n        expression: {\n          pattern: /[\\s\\S]+/,\n          inside: null // see below\n        }\n      }\n    },\n    property: {\n      pattern:\n        /([\\r\\n{,][\\t ]*)(?:(?!\\d)\\w+|\"(?:[^\"\\r\\n]|\"\")*\"(?!\"))(?=[ \\t]*:)/,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /\"(?:[^\"\\r\\n]|\"\")*\"(?!\")/,\n      greedy: true\n    },\n    'class-name': {\n      pattern: /(\\bAs[\\t ]+)\\w+/i,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:As|Dim|Each|Else|Elseif|End|Exit|For|Function|Goto|If|In|Print|Return|Step|Stop|Sub|Then|To|While)\\b/i,\n    boolean: /\\b(?:false|true)\\b/i,\n    function: /\\b(?!\\d)\\w+(?=[\\t ]*\\()/,\n    number: /(?:\\b\\d+(?:\\.\\d+)?(?:[ed][+-]\\d+)?|&h[a-f\\d]+)\\b[%&!#]?/i,\n    operator:\n      /--|\\+\\+|>>=?|<<=?|<>|[-+*/\\\\<>]=?|[:^=?]|\\b(?:and|mod|not|or)\\b/i,\n    punctuation: /[.,;()[\\]{}]/,\n    constant: /\\b(?:LINE_NUM)\\b/i\n  }\n  Prism.languages.brightscript['directive-statement'].inside.expression.inside =\n    Prism.languages.brightscript\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/brightscript.js?");

/***/ })

}]);