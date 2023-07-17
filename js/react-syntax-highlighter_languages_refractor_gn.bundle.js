"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_gn"],{

/***/ "./node_modules/refractor/lang/gn.js":
/*!*******************************************!*\
  !*** ./node_modules/refractor/lang/gn.js ***!
  \*******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = gn\ngn.displayName = 'gn'\ngn.aliases = ['gni']\nfunction gn(Prism) {\n  // https://gn.googlesource.com/gn/+/refs/heads/main/docs/reference.md#grammar\n  Prism.languages.gn = {\n    comment: {\n      pattern: /#.*/,\n      greedy: true\n    },\n    'string-literal': {\n      pattern: /(^|[^\\\\\"])\"(?:[^\\r\\n\"\\\\]|\\\\.)*\"/,\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern:\n            /((?:^|[^\\\\])(?:\\\\{2})*)\\$(?:\\{[\\s\\S]*?\\}|[a-zA-Z_]\\w*|0x[a-fA-F0-9]{2})/,\n          lookbehind: true,\n          inside: {\n            number: /^\\$0x[\\s\\S]{2}$/,\n            variable: /^\\$\\w+$/,\n            'interpolation-punctuation': {\n              pattern: /^\\$\\{|\\}$/,\n              alias: 'punctuation'\n            },\n            expression: {\n              pattern: /[\\s\\S]+/,\n              inside: null // see below\n            }\n          }\n        },\n        string: /[\\s\\S]+/\n      }\n    },\n    keyword: /\\b(?:else|if)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    'builtin-function': {\n      // a few functions get special highlighting to improve readability\n      pattern:\n        /\\b(?:assert|defined|foreach|import|pool|print|template|tool|toolchain)(?=\\s*\\()/i,\n      alias: 'keyword'\n    },\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n    constant:\n      /\\b(?:current_cpu|current_os|current_toolchain|default_toolchain|host_cpu|host_os|root_build_dir|root_gen_dir|root_out_dir|target_cpu|target_gen_dir|target_os|target_out_dir)\\b/,\n    number: /-?\\b\\d+\\b/,\n    operator: /[-+!=<>]=?|&&|\\|\\|/,\n    punctuation: /[(){}[\\],.]/\n  }\n  Prism.languages.gn['string-literal'].inside['interpolation'].inside[\n    'expression'\n  ].inside = Prism.languages.gn\n  Prism.languages.gni = Prism.languages.gn\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/gn.js?");

/***/ })

}]);