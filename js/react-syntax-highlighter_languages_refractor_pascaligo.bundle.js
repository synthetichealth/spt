"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_pascaligo"],{

/***/ "./node_modules/refractor/lang/pascaligo.js":
/*!**************************************************!*\
  !*** ./node_modules/refractor/lang/pascaligo.js ***!
  \**************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = pascaligo\npascaligo.displayName = 'pascaligo'\npascaligo.aliases = []\nfunction pascaligo(Prism) {\n  ;(function (Prism) {\n    // Pascaligo is a layer 2 smart contract language for the tezos blockchain\n    var braces = /\\((?:[^()]|\\((?:[^()]|\\([^()]*\\))*\\))*\\)/.source\n    var type = /(?:\\b\\w+(?:<braces>)?|<braces>)/.source.replace(\n      /<braces>/g,\n      function () {\n        return braces\n      }\n    )\n    var pascaligo = (Prism.languages.pascaligo = {\n      comment: /\\(\\*[\\s\\S]+?\\*\\)|\\/\\/.*/,\n      string: {\n        pattern: /([\"'`])(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|\\^[a-z]/i,\n        greedy: true\n      },\n      'class-name': [\n        {\n          pattern: RegExp(\n            /(\\btype\\s+\\w+\\s+is\\s+)<type>/.source.replace(\n              /<type>/g,\n              function () {\n                return type\n              }\n            ),\n            'i'\n          ),\n          lookbehind: true,\n          inside: null // see below\n        },\n        {\n          pattern: RegExp(\n            /<type>(?=\\s+is\\b)/.source.replace(/<type>/g, function () {\n              return type\n            }),\n            'i'\n          ),\n          inside: null // see below\n        },\n        {\n          pattern: RegExp(\n            /(:\\s*)<type>/.source.replace(/<type>/g, function () {\n              return type\n            })\n          ),\n          lookbehind: true,\n          inside: null // see below\n        }\n      ],\n      keyword: {\n        pattern:\n          /(^|[^&])\\b(?:begin|block|case|const|else|end|fail|for|from|function|if|is|nil|of|remove|return|skip|then|type|var|while|with)\\b/i,\n        lookbehind: true\n      },\n      boolean: {\n        pattern: /(^|[^&])\\b(?:False|True)\\b/i,\n        lookbehind: true\n      },\n      builtin: {\n        pattern: /(^|[^&])\\b(?:bool|int|list|map|nat|record|string|unit)\\b/i,\n        lookbehind: true\n      },\n      function: /\\b\\w+(?=\\s*\\()/,\n      number: [\n        // Hexadecimal, octal and binary\n        /%[01]+|&[0-7]+|\\$[a-f\\d]+/i, // Decimal\n        /\\b\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?(?:mtz|n)?/i\n      ],\n      operator:\n        /->|=\\/=|\\.\\.|\\*\\*|:=|<[<=>]?|>[>=]?|[+\\-*\\/]=?|[@^=|]|\\b(?:and|mod|or)\\b/,\n      punctuation: /\\(\\.|\\.\\)|[()\\[\\]:;,.{}]/\n    })\n    var classNameInside = [\n      'comment',\n      'keyword',\n      'builtin',\n      'operator',\n      'punctuation'\n    ].reduce(function (accum, key) {\n      accum[key] = pascaligo[key]\n      return accum\n    }, {})\n    pascaligo['class-name'].forEach(function (p) {\n      p.inside = classNameInside\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/pascaligo.js?");

/***/ })

}]);