"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_tremor"],{

/***/ "./node_modules/refractor/lang/tremor.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/tremor.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = tremor\ntremor.displayName = 'tremor'\ntremor.aliases = []\nfunction tremor(Prism) {\n  ;(function (Prism) {\n    Prism.languages.tremor = {\n      comment: {\n        pattern: /(^|[^\\\\])(?:\\/\\*[\\s\\S]*?\\*\\/|(?:--|\\/\\/|#).*)/,\n        lookbehind: true\n      },\n      'interpolated-string': null,\n      // see below\n      extractor: {\n        pattern: /\\b[a-z_]\\w*\\|(?:[^\\r\\n\\\\|]|\\\\(?:\\r\\n|[\\s\\S]))*\\|/i,\n        greedy: true,\n        inside: {\n          regex: {\n            pattern: /(^re)\\|[\\s\\S]+/,\n            lookbehind: true\n          },\n          function: /^\\w+/,\n          value: /\\|[\\s\\S]+/\n        }\n      },\n      identifier: {\n        pattern: /`[^`]*`/,\n        greedy: true\n      },\n      function: /\\b[a-z_]\\w*(?=\\s*(?:::\\s*<|\\())\\b/,\n      keyword:\n        /\\b(?:args|as|by|case|config|connect|connector|const|copy|create|default|define|deploy|drop|each|emit|end|erase|event|flow|fn|for|from|group|having|insert|into|intrinsic|let|links|match|merge|mod|move|of|operator|patch|pipeline|recur|script|select|set|sliding|state|stream|to|tumbling|update|use|when|where|window|with)\\b/,\n      boolean: /\\b(?:false|null|true)\\b/i,\n      number:\n        /\\b(?:0b[01_]*|0x[0-9a-fA-F_]*|\\d[\\d_]*(?:\\.\\d[\\d_]*)?(?:[Ee][+-]?[\\d_]+)?)\\b/,\n      'pattern-punctuation': {\n        pattern: /%(?=[({[])/,\n        alias: 'punctuation'\n      },\n      operator:\n        /[-+*\\/%~!^]=?|=[=>]?|&[&=]?|\\|[|=]?|<<?=?|>>?>?=?|(?:absent|and|not|or|present|xor)\\b/,\n      punctuation: /::|[;\\[\\]()\\{\\},.:]/\n    }\n    var interpolationPattern =\n      /#\\{(?:[^\"{}]|\\{[^{}]*\\}|\"(?:[^\"\\\\\\r\\n]|\\\\(?:\\r\\n|[\\s\\S]))*\")*\\}/.source\n    Prism.languages.tremor['interpolated-string'] = {\n      pattern: RegExp(\n        /(^|[^\\\\])/.source +\n          '(?:' +\n          '\"\"\"(?:' +\n          /[^\"\\\\#]|\\\\[\\s\\S]|\"(?!\"\")|#(?!\\{)/.source +\n          '|' +\n          interpolationPattern +\n          ')*\"\"\"' +\n          '|' +\n          '\"(?:' +\n          /[^\"\\\\\\r\\n#]|\\\\(?:\\r\\n|[\\s\\S])|#(?!\\{)/.source +\n          '|' +\n          interpolationPattern +\n          ')*\"' +\n          ')'\n      ),\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern: RegExp(interpolationPattern),\n          inside: {\n            punctuation: /^#\\{|\\}$/,\n            expression: {\n              pattern: /[\\s\\S]+/,\n              inside: Prism.languages.tremor\n            }\n          }\n        },\n        string: /[\\s\\S]+/\n      }\n    }\n    Prism.languages.troy = Prism.languages['tremor']\n    Prism.languages.trickle = Prism.languages['tremor']\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/tremor.js?");

/***/ })

}]);