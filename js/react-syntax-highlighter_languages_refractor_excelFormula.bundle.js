"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_excelFormula"],{

/***/ "./node_modules/refractor/lang/excel-formula.js":
/*!******************************************************!*\
  !*** ./node_modules/refractor/lang/excel-formula.js ***!
  \******************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = excelFormula\nexcelFormula.displayName = 'excelFormula'\nexcelFormula.aliases = []\nfunction excelFormula(Prism) {\n  Prism.languages['excel-formula'] = {\n    comment: {\n      pattern: /(\\bN\\(\\s*)\"(?:[^\"]|\"\")*\"(?=\\s*\\))/i,\n      lookbehind: true,\n      greedy: true\n    },\n    string: {\n      pattern: /\"(?:[^\"]|\"\")*\"(?!\")/,\n      greedy: true\n    },\n    reference: {\n      // https://www.ablebits.com/office-addins-blog/2015/12/08/excel-reference-another-sheet-workbook/\n      // Sales!B2\n      // 'Winter sales'!B2\n      // [Sales.xlsx]Jan!B2:B5\n      // D:\\Reports\\[Sales.xlsx]Jan!B2:B5\n      // '[Sales.xlsx]Jan sales'!B2:B5\n      // 'D:\\Reports\\[Sales.xlsx]Jan sales'!B2:B5\n      pattern:\n        /(?:'[^']*'|(?:[^\\s()[\\]{}<>*?\"';,$&]*\\[[^^\\s()[\\]{}<>*?\"']+\\])?\\w+)!/,\n      greedy: true,\n      alias: 'string',\n      inside: {\n        operator: /!$/,\n        punctuation: /'/,\n        sheet: {\n          pattern: /[^[\\]]+$/,\n          alias: 'function'\n        },\n        file: {\n          pattern: /\\[[^[\\]]+\\]$/,\n          inside: {\n            punctuation: /[[\\]]/\n          }\n        },\n        path: /[\\s\\S]+/\n      }\n    },\n    'function-name': {\n      pattern: /\\b[A-Z]\\w*(?=\\()/i,\n      alias: 'keyword'\n    },\n    range: {\n      pattern:\n        /\\$?\\b(?:[A-Z]+\\$?\\d+:\\$?[A-Z]+\\$?\\d+|[A-Z]+:\\$?[A-Z]+|\\d+:\\$?\\d+)\\b/i,\n      alias: 'property',\n      inside: {\n        operator: /:/,\n        cell: /\\$?[A-Z]+\\$?\\d+/i,\n        column: /\\$?[A-Z]+/i,\n        row: /\\$?\\d+/\n      }\n    },\n    cell: {\n      // Excel is case insensitive, so the string \"foo1\" could be either a variable or a cell.\n      // To combat this, we match cells case insensitive, if the contain at least one \"$\", and case sensitive otherwise.\n      pattern: /\\b[A-Z]+\\d+\\b|\\$[A-Za-z]+\\$?\\d+\\b|\\b[A-Za-z]+\\$\\d+\\b/,\n      alias: 'property'\n    },\n    number: /(?:\\b\\d+(?:\\.\\d+)?|\\B\\.\\d+)(?:e[+-]?\\d+)?\\b/i,\n    boolean: /\\b(?:FALSE|TRUE)\\b/i,\n    operator: /[-+*/^%=&,]|<[=>]?|>=?/,\n    punctuation: /[[\\]();{}|]/\n  }\n  Prism.languages['xlsx'] = Prism.languages['xls'] =\n    Prism.languages['excel-formula']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/excel-formula.js?");

/***/ })

}]);