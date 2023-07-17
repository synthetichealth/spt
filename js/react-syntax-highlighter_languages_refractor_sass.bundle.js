"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_sass"],{

/***/ "./node_modules/refractor/lang/sass.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/sass.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = sass\nsass.displayName = 'sass'\nsass.aliases = []\nfunction sass(Prism) {\n  ;(function (Prism) {\n    Prism.languages.sass = Prism.languages.extend('css', {\n      // Sass comments don't need to be closed, only indented\n      comment: {\n        pattern: /^([ \\t]*)\\/[\\/*].*(?:(?:\\r?\\n|\\r)\\1[ \\t].+)*/m,\n        lookbehind: true,\n        greedy: true\n      }\n    })\n    Prism.languages.insertBefore('sass', 'atrule', {\n      // We want to consume the whole line\n      'atrule-line': {\n        // Includes support for = and + shortcuts\n        pattern: /^(?:[ \\t]*)[@+=].+/m,\n        greedy: true,\n        inside: {\n          atrule: /(?:@[\\w-]+|[+=])/\n        }\n      }\n    })\n    delete Prism.languages.sass.atrule\n    var variable = /\\$[-\\w]+|#\\{\\$[-\\w]+\\}/\n    var operator = [\n      /[+*\\/%]|[=!]=|<=?|>=?|\\b(?:and|not|or)\\b/,\n      {\n        pattern: /(\\s)-(?=\\s)/,\n        lookbehind: true\n      }\n    ]\n    Prism.languages.insertBefore('sass', 'property', {\n      // We want to consume the whole line\n      'variable-line': {\n        pattern: /^[ \\t]*\\$.+/m,\n        greedy: true,\n        inside: {\n          punctuation: /:/,\n          variable: variable,\n          operator: operator\n        }\n      },\n      // We want to consume the whole line\n      'property-line': {\n        pattern: /^[ \\t]*(?:[^:\\s]+ *:.*|:[^:\\s].*)/m,\n        greedy: true,\n        inside: {\n          property: [\n            /[^:\\s]+(?=\\s*:)/,\n            {\n              pattern: /(:)[^:\\s]+/,\n              lookbehind: true\n            }\n          ],\n          punctuation: /:/,\n          variable: variable,\n          operator: operator,\n          important: Prism.languages.sass.important\n        }\n      }\n    })\n    delete Prism.languages.sass.property\n    delete Prism.languages.sass.important // Now that whole lines for other patterns are consumed,\n    // what's left should be selectors\n    Prism.languages.insertBefore('sass', 'punctuation', {\n      selector: {\n        pattern:\n          /^([ \\t]*)\\S(?:,[^,\\r\\n]+|[^,\\r\\n]*)(?:,[^,\\r\\n]+)*(?:,(?:\\r?\\n|\\r)\\1[ \\t]+\\S(?:,[^,\\r\\n]+|[^,\\r\\n]*)(?:,[^,\\r\\n]+)*)*/m,\n        lookbehind: true,\n        greedy: true\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/sass.js?");

/***/ })

}]);