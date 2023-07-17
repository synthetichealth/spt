"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_sparql"],{

/***/ "./node_modules/refractor/lang/sparql.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/sparql.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorTurtle = __webpack_require__(/*! ./turtle.js */ \"./node_modules/refractor/lang/turtle.js\")\nmodule.exports = sparql\nsparql.displayName = 'sparql'\nsparql.aliases = ['rq']\nfunction sparql(Prism) {\n  Prism.register(refractorTurtle)\n  Prism.languages.sparql = Prism.languages.extend('turtle', {\n    boolean: /\\b(?:false|true)\\b/i,\n    variable: {\n      pattern: /[?$]\\w+/,\n      greedy: true\n    }\n  })\n  Prism.languages.insertBefore('sparql', 'punctuation', {\n    keyword: [\n      /\\b(?:A|ADD|ALL|AS|ASC|ASK|BNODE|BY|CLEAR|CONSTRUCT|COPY|CREATE|DATA|DEFAULT|DELETE|DESC|DESCRIBE|DISTINCT|DROP|EXISTS|FILTER|FROM|GROUP|HAVING|INSERT|INTO|LIMIT|LOAD|MINUS|MOVE|NAMED|NOT|NOW|OFFSET|OPTIONAL|ORDER|RAND|REDUCED|SELECT|SEPARATOR|SERVICE|SILENT|STRUUID|UNION|USING|UUID|VALUES|WHERE)\\b/i,\n      /\\b(?:ABS|AVG|BIND|BOUND|CEIL|COALESCE|CONCAT|CONTAINS|COUNT|DATATYPE|DAY|ENCODE_FOR_URI|FLOOR|GROUP_CONCAT|HOURS|IF|IRI|isBLANK|isIRI|isLITERAL|isNUMERIC|isURI|LANG|LANGMATCHES|LCASE|MAX|MD5|MIN|MINUTES|MONTH|REGEX|REPLACE|ROUND|sameTerm|SAMPLE|SECONDS|SHA1|SHA256|SHA384|SHA512|STR|STRAFTER|STRBEFORE|STRDT|STRENDS|STRLANG|STRLEN|STRSTARTS|SUBSTR|SUM|TIMEZONE|TZ|UCASE|URI|YEAR)\\b(?=\\s*\\()/i,\n      /\\b(?:BASE|GRAPH|PREFIX)\\b/i\n    ]\n  })\n  Prism.languages.rq = Prism.languages.sparql\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/sparql.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/turtle.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/turtle.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = turtle\nturtle.displayName = 'turtle'\nturtle.aliases = []\nfunction turtle(Prism) {\n  Prism.languages.turtle = {\n    comment: {\n      pattern: /#.*/,\n      greedy: true\n    },\n    'multiline-string': {\n      pattern:\n        /\"\"\"(?:(?:\"\"?)?(?:[^\"\\\\]|\\\\.))*\"\"\"|'''(?:(?:''?)?(?:[^'\\\\]|\\\\.))*'''/,\n      greedy: true,\n      alias: 'string',\n      inside: {\n        comment: /#.*/\n      }\n    },\n    string: {\n      pattern: /\"(?:[^\\\\\"\\r\\n]|\\\\.)*\"|'(?:[^\\\\'\\r\\n]|\\\\.)*'/,\n      greedy: true\n    },\n    url: {\n      pattern:\n        /<(?:[^\\x00-\\x20<>\"{}|^`\\\\]|\\\\(?:u[\\da-fA-F]{4}|U[\\da-fA-F]{8}))*>/,\n      greedy: true,\n      inside: {\n        punctuation: /[<>]/\n      }\n    },\n    function: {\n      pattern:\n        /(?:(?![-.\\d\\xB7])[-.\\w\\xB7\\xC0-\\uFFFD]+)?:(?:(?![-.])(?:[-.:\\w\\xC0-\\uFFFD]|%[\\da-f]{2}|\\\\.)+)?/i,\n      inside: {\n        'local-name': {\n          pattern: /([^:]*:)[\\s\\S]+/,\n          lookbehind: true\n        },\n        prefix: {\n          pattern: /[\\s\\S]+/,\n          inside: {\n            punctuation: /:/\n          }\n        }\n      }\n    },\n    number: /[+-]?\\b\\d+(?:\\.\\d*)?(?:e[+-]?\\d+)?/i,\n    punctuation: /[{}.,;()[\\]]|\\^\\^/,\n    boolean: /\\b(?:false|true)\\b/,\n    keyword: [/(?:\\ba|@prefix|@base)\\b|=/, /\\b(?:base|graph|prefix)\\b/i],\n    tag: {\n      pattern: /@[a-z]+(?:-[a-z\\d]+)*/i,\n      inside: {\n        punctuation: /@/\n      }\n    }\n  }\n  Prism.languages.trig = Prism.languages['turtle']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/turtle.js?");

/***/ })

}]);