"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_promql"],{

/***/ "./node_modules/refractor/lang/promql.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/promql.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = promql\npromql.displayName = 'promql'\npromql.aliases = []\nfunction promql(Prism) {\n  // Thanks to: https://github.com/prometheus-community/monaco-promql/blob/master/src/promql/promql.ts\n  // As well as: https://kausal.co/blog/slate-prism-add-new-syntax-promql/\n  ;(function (Prism) {\n    // PromQL Aggregation Operators\n    // (https://prometheus.io/docs/prometheus/latest/querying/operators/#aggregation-operators)\n    var aggregations = [\n      'sum',\n      'min',\n      'max',\n      'avg',\n      'group',\n      'stddev',\n      'stdvar',\n      'count',\n      'count_values',\n      'bottomk',\n      'topk',\n      'quantile'\n    ] // PromQL vector matching + the by and without clauses\n    // (https://prometheus.io/docs/prometheus/latest/querying/operators/#vector-matching)\n    var vectorMatching = [\n      'on',\n      'ignoring',\n      'group_right',\n      'group_left',\n      'by',\n      'without'\n    ] // PromQL offset modifier\n    // (https://prometheus.io/docs/prometheus/latest/querying/basics/#offset-modifier)\n    var offsetModifier = ['offset']\n    var keywords = aggregations.concat(vectorMatching, offsetModifier)\n    Prism.languages.promql = {\n      comment: {\n        pattern: /(^[ \\t]*)#.*/m,\n        lookbehind: true\n      },\n      'vector-match': {\n        // Match the comma-separated label lists inside vector matching:\n        pattern: new RegExp(\n          '((?:' + vectorMatching.join('|') + ')\\\\s*)\\\\([^)]*\\\\)'\n        ),\n        lookbehind: true,\n        inside: {\n          'label-key': {\n            pattern: /\\b[^,]+\\b/,\n            alias: 'attr-name'\n          },\n          punctuation: /[(),]/\n        }\n      },\n      'context-labels': {\n        pattern: /\\{[^{}]*\\}/,\n        inside: {\n          'label-key': {\n            pattern: /\\b[a-z_]\\w*(?=\\s*(?:=|![=~]))/,\n            alias: 'attr-name'\n          },\n          'label-value': {\n            pattern: /([\"'`])(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1/,\n            greedy: true,\n            alias: 'attr-value'\n          },\n          punctuation: /\\{|\\}|=~?|![=~]|,/\n        }\n      },\n      'context-range': [\n        {\n          pattern: /\\[[\\w\\s:]+\\]/,\n          // [1m]\n          inside: {\n            punctuation: /\\[|\\]|:/,\n            'range-duration': {\n              pattern: /\\b(?:\\d+(?:[smhdwy]|ms))+\\b/i,\n              alias: 'number'\n            }\n          }\n        },\n        {\n          pattern: /(\\boffset\\s+)\\w+/,\n          // offset 1m\n          lookbehind: true,\n          inside: {\n            'range-duration': {\n              pattern: /\\b(?:\\d+(?:[smhdwy]|ms))+\\b/i,\n              alias: 'number'\n            }\n          }\n        }\n      ],\n      keyword: new RegExp('\\\\b(?:' + keywords.join('|') + ')\\\\b', 'i'),\n      function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n      number:\n        /[-+]?(?:(?:\\b\\d+(?:\\.\\d+)?|\\B\\.\\d+)(?:e[-+]?\\d+)?\\b|\\b(?:0x[0-9a-f]+|nan|inf)\\b)/i,\n      operator: /[\\^*/%+-]|==|!=|<=|<|>=|>|\\b(?:and|or|unless)\\b/i,\n      punctuation: /[{};()`,.[\\]]/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/promql.js?");

/***/ })

}]);