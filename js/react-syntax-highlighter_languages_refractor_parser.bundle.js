"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_parser"],{

/***/ "./node_modules/refractor/lang/parser.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/parser.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = parser\nparser.displayName = 'parser'\nparser.aliases = []\nfunction parser(Prism) {\n  ;(function (Prism) {\n    var parser = (Prism.languages.parser = Prism.languages.extend('markup', {\n      keyword: {\n        pattern:\n          /(^|[^^])(?:\\^(?:case|eval|for|if|switch|throw)\\b|@(?:BASE|CLASS|GET(?:_DEFAULT)?|OPTIONS|SET_DEFAULT|USE)\\b)/,\n        lookbehind: true\n      },\n      variable: {\n        pattern: /(^|[^^])\\B\\$(?:\\w+|(?=[.{]))(?:(?:\\.|::?)\\w+)*(?:\\.|::?)?/,\n        lookbehind: true,\n        inside: {\n          punctuation: /\\.|:+/\n        }\n      },\n      function: {\n        pattern: /(^|[^^])\\B[@^]\\w+(?:(?:\\.|::?)\\w+)*(?:\\.|::?)?/,\n        lookbehind: true,\n        inside: {\n          keyword: {\n            pattern: /(^@)(?:GET_|SET_)/,\n            lookbehind: true\n          },\n          punctuation: /\\.|:+/\n        }\n      },\n      escape: {\n        pattern: /\\^(?:[$^;@()\\[\\]{}\"':]|#[a-f\\d]*)/i,\n        alias: 'builtin'\n      },\n      punctuation: /[\\[\\](){};]/\n    }))\n    parser = Prism.languages.insertBefore('parser', 'keyword', {\n      'parser-comment': {\n        pattern: /(\\s)#.*/,\n        lookbehind: true,\n        alias: 'comment'\n      },\n      expression: {\n        // Allow for 3 levels of depth\n        pattern: /(^|[^^])\\((?:[^()]|\\((?:[^()]|\\((?:[^()])*\\))*\\))*\\)/,\n        greedy: true,\n        lookbehind: true,\n        inside: {\n          string: {\n            pattern: /(^|[^^])([\"'])(?:(?!\\2)[^^]|\\^[\\s\\S])*\\2/,\n            lookbehind: true\n          },\n          keyword: parser.keyword,\n          variable: parser.variable,\n          function: parser.function,\n          boolean: /\\b(?:false|true)\\b/,\n          number: /\\b(?:0x[a-f\\d]+|\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?)\\b/i,\n          escape: parser.escape,\n          operator:\n            /[~+*\\/\\\\%]|!(?:\\|\\|?|=)?|&&?|\\|\\|?|==|<[<=]?|>[>=]?|-[fd]?|\\b(?:def|eq|ge|gt|in|is|le|lt|ne)\\b/,\n          punctuation: parser.punctuation\n        }\n      }\n    })\n    Prism.languages.insertBefore(\n      'inside',\n      'punctuation',\n      {\n        expression: parser.expression,\n        keyword: parser.keyword,\n        variable: parser.variable,\n        function: parser.function,\n        escape: parser.escape,\n        'parser-punctuation': {\n          pattern: parser.punctuation,\n          alias: 'punctuation'\n        }\n      },\n      parser['tag'].inside['attr-value']\n    )\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/parser.js?");

/***/ })

}]);