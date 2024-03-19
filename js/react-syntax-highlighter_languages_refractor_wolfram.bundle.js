"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_wolfram"],{

/***/ "./node_modules/refractor/lang/wolfram.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/wolfram.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = wolfram\nwolfram.displayName = 'wolfram'\nwolfram.aliases = ['mathematica', 'wl', 'nb']\nfunction wolfram(Prism) {\n  Prism.languages.wolfram = {\n    // Allow one level of nesting - note: regex taken from applescipt\n    comment: /\\(\\*(?:\\(\\*(?:[^*]|\\*(?!\\)))*\\*\\)|(?!\\(\\*)[\\s\\S])*?\\*\\)/,\n    string: {\n      pattern: /\"(?:\\\\.|[^\"\\\\\\r\\n])*\"/,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:Abs|AbsArg|Accuracy|Block|Do|For|Function|If|Manipulate|Module|Nest|NestList|None|Return|Switch|Table|Which|While)\\b/,\n    context: {\n      pattern: /\\b\\w+`+\\w*/,\n      alias: 'class-name'\n    },\n    blank: {\n      pattern: /\\b\\w+_\\b/,\n      alias: 'regex'\n    },\n    'global-variable': {\n      pattern: /\\$\\w+/,\n      alias: 'variable'\n    },\n    boolean: /\\b(?:False|True)\\b/,\n    number:\n      /(?:\\b(?=\\d)|\\B(?=\\.))(?:0[bo])?(?:(?:\\d|0x[\\da-f])[\\da-f]*(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?j?\\b/i,\n    operator:\n      /\\/\\.|;|=\\.|\\^=|\\^:=|:=|<<|>>|<\\||\\|>|:>|\\|->|->|<-|@@@|@@|@|\\/@|=!=|===|==|=|\\+|-|\\^|\\[\\/-+%=\\]=?|!=|\\*\\*?=?|\\/\\/?=?|<[<=>]?|>[=>]?|[&|^~]/,\n    punctuation: /[{}[\\];(),.:]/\n  }\n  Prism.languages.mathematica = Prism.languages.wolfram\n  Prism.languages.wl = Prism.languages.wolfram\n  Prism.languages.nb = Prism.languages.wolfram\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/wolfram.js?");

/***/ })

}]);