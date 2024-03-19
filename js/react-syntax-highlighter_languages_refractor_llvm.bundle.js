"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_llvm"],{

/***/ "./node_modules/refractor/lang/llvm.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/llvm.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = llvm\nllvm.displayName = 'llvm'\nllvm.aliases = []\nfunction llvm(Prism) {\n  ;(function (Prism) {\n    Prism.languages.llvm = {\n      comment: /;.*/,\n      string: {\n        pattern: /\"[^\"]*\"/,\n        greedy: true\n      },\n      boolean: /\\b(?:false|true)\\b/,\n      variable: /[%@!#](?:(?!\\d)(?:[-$.\\w]|\\\\[a-f\\d]{2})+|\\d+)/i,\n      label: /(?!\\d)(?:[-$.\\w]|\\\\[a-f\\d]{2})+:/i,\n      type: {\n        pattern:\n          /\\b(?:double|float|fp128|half|i[1-9]\\d*|label|metadata|ppc_fp128|token|void|x86_fp80|x86_mmx)\\b/,\n        alias: 'class-name'\n      },\n      keyword: /\\b[a-z_][a-z_0-9]*\\b/,\n      number:\n        /[+-]?\\b\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?\\b|\\b0x[\\dA-Fa-f]+\\b|\\b0xK[\\dA-Fa-f]{20}\\b|\\b0x[ML][\\dA-Fa-f]{32}\\b|\\b0xH[\\dA-Fa-f]{4}\\b/,\n      punctuation: /[{}[\\];(),.!*=<>]/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/llvm.js?");

/***/ })

}]);