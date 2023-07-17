"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_css"],{

/***/ "./node_modules/refractor/lang/css.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/css.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = css\ncss.displayName = 'css'\ncss.aliases = []\nfunction css(Prism) {\n  ;(function (Prism) {\n    var string =\n      /(?:\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\"\\\\\\r\\n])*\"|'(?:\\\\(?:\\r\\n|[\\s\\S])|[^'\\\\\\r\\n])*')/\n    Prism.languages.css = {\n      comment: /\\/\\*[\\s\\S]*?\\*\\//,\n      atrule: {\n        pattern: /@[\\w-](?:[^;{\\s]|\\s+(?![\\s{]))*(?:;|(?=\\s*\\{))/,\n        inside: {\n          rule: /^@[\\w-]+/,\n          'selector-function-argument': {\n            pattern:\n              /(\\bselector\\s*\\(\\s*(?![\\s)]))(?:[^()\\s]|\\s+(?![\\s)])|\\((?:[^()]|\\([^()]*\\))*\\))+(?=\\s*\\))/,\n            lookbehind: true,\n            alias: 'selector'\n          },\n          keyword: {\n            pattern: /(^|[^\\w-])(?:and|not|only|or)(?![\\w-])/,\n            lookbehind: true\n          } // See rest below\n        }\n      },\n      url: {\n        // https://drafts.csswg.org/css-values-3/#urls\n        pattern: RegExp(\n          '\\\\burl\\\\((?:' +\n            string.source +\n            '|' +\n            /(?:[^\\\\\\r\\n()\"']|\\\\[\\s\\S])*/.source +\n            ')\\\\)',\n          'i'\n        ),\n        greedy: true,\n        inside: {\n          function: /^url/i,\n          punctuation: /^\\(|\\)$/,\n          string: {\n            pattern: RegExp('^' + string.source + '$'),\n            alias: 'url'\n          }\n        }\n      },\n      selector: {\n        pattern: RegExp(\n          '(^|[{}\\\\s])[^{}\\\\s](?:[^{};\"\\'\\\\s]|\\\\s+(?![\\\\s{])|' +\n            string.source +\n            ')*(?=\\\\s*\\\\{)'\n        ),\n        lookbehind: true\n      },\n      string: {\n        pattern: string,\n        greedy: true\n      },\n      property: {\n        pattern:\n          /(^|[^-\\w\\xA0-\\uFFFF])(?!\\s)[-_a-z\\xA0-\\uFFFF](?:(?!\\s)[-\\w\\xA0-\\uFFFF])*(?=\\s*:)/i,\n        lookbehind: true\n      },\n      important: /!important\\b/i,\n      function: {\n        pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\\()/i,\n        lookbehind: true\n      },\n      punctuation: /[(){};:,]/\n    }\n    Prism.languages.css['atrule'].inside.rest = Prism.languages.css\n    var markup = Prism.languages.markup\n    if (markup) {\n      markup.tag.addInlined('style', 'css')\n      markup.tag.addAttribute('style', 'css')\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/css.js?");

/***/ })

}]);