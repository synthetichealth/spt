"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_t4Templating"],{

/***/ "./node_modules/refractor/lang/t4-templating.js":
/*!******************************************************!*\
  !*** ./node_modules/refractor/lang/t4-templating.js ***!
  \******************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = t4Templating\nt4Templating.displayName = 't4Templating'\nt4Templating.aliases = []\nfunction t4Templating(Prism) {\n  ;(function (Prism) {\n    function createBlock(prefix, inside, contentAlias) {\n      return {\n        pattern: RegExp('<#' + prefix + '[\\\\s\\\\S]*?#>'),\n        alias: 'block',\n        inside: {\n          delimiter: {\n            pattern: RegExp('^<#' + prefix + '|#>$'),\n            alias: 'important'\n          },\n          content: {\n            pattern: /[\\s\\S]+/,\n            inside: inside,\n            alias: contentAlias\n          }\n        }\n      }\n    }\n    function createT4(insideLang) {\n      var grammar = Prism.languages[insideLang]\n      var className = 'language-' + insideLang\n      return {\n        block: {\n          pattern: /<#[\\s\\S]+?#>/,\n          inside: {\n            directive: createBlock('@', {\n              'attr-value': {\n                pattern: /=(?:(\"|')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|[^\\s'\">=]+)/,\n                inside: {\n                  punctuation: /^=|^[\"']|[\"']$/\n                }\n              },\n              keyword: /\\b\\w+(?=\\s)/,\n              'attr-name': /\\b\\w+/\n            }),\n            expression: createBlock('=', grammar, className),\n            'class-feature': createBlock('\\\\+', grammar, className),\n            standard: createBlock('', grammar, className)\n          }\n        }\n      }\n    }\n    Prism.languages['t4-templating'] = Object.defineProperty({}, 'createT4', {\n      value: createT4\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/t4-templating.js?");

/***/ })

}]);