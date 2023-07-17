"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_jq"],{

/***/ "./node_modules/refractor/lang/jq.js":
/*!*******************************************!*\
  !*** ./node_modules/refractor/lang/jq.js ***!
  \*******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = jq\njq.displayName = 'jq'\njq.aliases = []\nfunction jq(Prism) {\n  ;(function (Prism) {\n    var interpolation = /\\\\\\((?:[^()]|\\([^()]*\\))*\\)/.source\n    var string = RegExp(\n      /(^|[^\\\\])\"(?:[^\"\\r\\n\\\\]|\\\\[^\\r\\n(]|__)*\"/.source.replace(\n        /__/g,\n        function () {\n          return interpolation\n        }\n      )\n    )\n    var stringInterpolation = {\n      interpolation: {\n        pattern: RegExp(/((?:^|[^\\\\])(?:\\\\{2})*)/.source + interpolation),\n        lookbehind: true,\n        inside: {\n          content: {\n            pattern: /^(\\\\\\()[\\s\\S]+(?=\\)$)/,\n            lookbehind: true,\n            inside: null // see below\n          },\n          punctuation: /^\\\\\\(|\\)$/\n        }\n      }\n    }\n    var jq = (Prism.languages.jq = {\n      comment: /#.*/,\n      property: {\n        pattern: RegExp(string.source + /(?=\\s*:(?!:))/.source),\n        lookbehind: true,\n        greedy: true,\n        inside: stringInterpolation\n      },\n      string: {\n        pattern: string,\n        lookbehind: true,\n        greedy: true,\n        inside: stringInterpolation\n      },\n      function: {\n        pattern: /(\\bdef\\s+)[a-z_]\\w+/i,\n        lookbehind: true\n      },\n      variable: /\\B\\$\\w+/,\n      'property-literal': {\n        pattern: /\\b[a-z_]\\w*(?=\\s*:(?!:))/i,\n        alias: 'property'\n      },\n      keyword:\n        /\\b(?:as|break|catch|def|elif|else|end|foreach|if|import|include|label|module|modulemeta|null|reduce|then|try|while)\\b/,\n      boolean: /\\b(?:false|true)\\b/,\n      number: /(?:\\b\\d+\\.|\\B\\.)?\\b\\d+(?:[eE][+-]?\\d+)?\\b/,\n      operator: [\n        {\n          pattern: /\\|=?/,\n          alias: 'pipe'\n        },\n        /\\.\\.|[!=<>]?=|\\?\\/\\/|\\/\\/=?|[-+*/%]=?|[<>?]|\\b(?:and|not|or)\\b/\n      ],\n      'c-style-function': {\n        pattern: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n        alias: 'function'\n      },\n      punctuation: /::|[()\\[\\]{},:;]|\\.(?=\\s*[\\[\\w$])/,\n      dot: {\n        pattern: /\\./,\n        alias: 'important'\n      }\n    })\n    stringInterpolation.interpolation.inside.content.inside = jq\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/jq.js?");

/***/ })

}]);