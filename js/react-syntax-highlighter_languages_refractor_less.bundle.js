"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_less"],{

/***/ "./node_modules/refractor/lang/less.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/less.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = less\nless.displayName = 'less'\nless.aliases = []\nfunction less(Prism) {\n  /* FIXME :\n:extend() is not handled specifically : its highlighting is buggy.\nMixin usage must be inside a ruleset to be highlighted.\nAt-rules (e.g. import) containing interpolations are buggy.\nDetached rulesets are highlighted as at-rules.\nA comment before a mixin usage prevents the latter to be properly highlighted.\n*/\n  Prism.languages.less = Prism.languages.extend('css', {\n    comment: [\n      /\\/\\*[\\s\\S]*?\\*\\//,\n      {\n        pattern: /(^|[^\\\\])\\/\\/.*/,\n        lookbehind: true\n      }\n    ],\n    atrule: {\n      pattern:\n        /@[\\w-](?:\\((?:[^(){}]|\\([^(){}]*\\))*\\)|[^(){};\\s]|\\s+(?!\\s))*?(?=\\s*\\{)/,\n      inside: {\n        punctuation: /[:()]/\n      }\n    },\n    // selectors and mixins are considered the same\n    selector: {\n      pattern:\n        /(?:@\\{[\\w-]+\\}|[^{};\\s@])(?:@\\{[\\w-]+\\}|\\((?:[^(){}]|\\([^(){}]*\\))*\\)|[^(){};@\\s]|\\s+(?!\\s))*?(?=\\s*\\{)/,\n      inside: {\n        // mixin parameters\n        variable: /@+[\\w-]+/\n      }\n    },\n    property: /(?:@\\{[\\w-]+\\}|[\\w-])+(?:\\+_?)?(?=\\s*:)/,\n    operator: /[+\\-*\\/]/\n  })\n  Prism.languages.insertBefore('less', 'property', {\n    variable: [\n      // Variable declaration (the colon must be consumed!)\n      {\n        pattern: /@[\\w-]+\\s*:/,\n        inside: {\n          punctuation: /:/\n        }\n      }, // Variable usage\n      /@@?[\\w-]+/\n    ],\n    'mixin-usage': {\n      pattern: /([{;]\\s*)[.#](?!\\d)[\\w-].*?(?=[(;])/,\n      lookbehind: true,\n      alias: 'function'\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/less.js?");

/***/ })

}]);