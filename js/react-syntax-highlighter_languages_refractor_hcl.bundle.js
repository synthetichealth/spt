"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_hcl"],{

/***/ "./node_modules/refractor/lang/hcl.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/hcl.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = hcl\nhcl.displayName = 'hcl'\nhcl.aliases = []\nfunction hcl(Prism) {\n  Prism.languages.hcl = {\n    comment: /(?:\\/\\/|#).*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n    heredoc: {\n      pattern: /<<-?(\\w+\\b)[\\s\\S]*?^[ \\t]*\\1/m,\n      greedy: true,\n      alias: 'string'\n    },\n    keyword: [\n      {\n        pattern:\n          /(?:data|resource)\\s+(?:\"(?:\\\\[\\s\\S]|[^\\\\\"])*\")(?=\\s+\"[\\w-]+\"\\s+\\{)/i,\n        inside: {\n          type: {\n            pattern: /(resource|data|\\s+)(?:\"(?:\\\\[\\s\\S]|[^\\\\\"])*\")/i,\n            lookbehind: true,\n            alias: 'variable'\n          }\n        }\n      },\n      {\n        pattern:\n          /(?:backend|module|output|provider|provisioner|variable)\\s+(?:[\\w-]+|\"(?:\\\\[\\s\\S]|[^\\\\\"])*\")\\s+(?=\\{)/i,\n        inside: {\n          type: {\n            pattern:\n              /(backend|module|output|provider|provisioner|variable)\\s+(?:[\\w-]+|\"(?:\\\\[\\s\\S]|[^\\\\\"])*\")\\s+/i,\n            lookbehind: true,\n            alias: 'variable'\n          }\n        }\n      },\n      /[\\w-]+(?=\\s+\\{)/\n    ],\n    property: [/[-\\w\\.]+(?=\\s*=(?!=))/, /\"(?:\\\\[\\s\\S]|[^\\\\\"])+\"(?=\\s*[:=])/],\n    string: {\n      pattern:\n        /\"(?:[^\\\\$\"]|\\\\[\\s\\S]|\\$(?:(?=\")|\\$+(?!\\$)|[^\"${])|\\$\\{(?:[^{}\"]|\"(?:[^\\\\\"]|\\\\[\\s\\S])*\")*\\})*\"/,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern: /(^|[^$])\\$\\{(?:[^{}\"]|\"(?:[^\\\\\"]|\\\\[\\s\\S])*\")*\\}/,\n          lookbehind: true,\n          inside: {\n            type: {\n              pattern:\n                /(\\b(?:count|data|local|module|path|self|terraform|var)\\b\\.)[\\w\\*]+/i,\n              lookbehind: true,\n              alias: 'variable'\n            },\n            keyword: /\\b(?:count|data|local|module|path|self|terraform|var)\\b/i,\n            function: /\\w+(?=\\()/,\n            string: {\n              pattern: /\"(?:\\\\[\\s\\S]|[^\\\\\"])*\"/,\n              greedy: true\n            },\n            number: /\\b0x[\\da-f]+\\b|\\b\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?/i,\n            punctuation: /[!\\$#%&'()*+,.\\/;<=>@\\[\\\\\\]^`{|}~?:]/\n          }\n        }\n      }\n    },\n    number: /\\b0x[\\da-f]+\\b|\\b\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?/i,\n    boolean: /\\b(?:false|true)\\b/i,\n    punctuation: /[=\\[\\]{}]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/hcl.js?");

/***/ })

}]);