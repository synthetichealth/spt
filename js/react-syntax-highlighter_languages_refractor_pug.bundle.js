"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_pug"],{

/***/ "./node_modules/refractor/lang/pug.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/pug.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = pug\npug.displayName = 'pug'\npug.aliases = []\nfunction pug(Prism) {\n  ;(function (Prism) {\n    // TODO:\n    // - Add CSS highlighting inside <style> tags\n    // - Add support for multi-line code blocks\n    // - Add support for interpolation #{} and !{}\n    // - Add support for tag interpolation #[]\n    // - Add explicit support for plain text using |\n    // - Add support for markup embedded in plain text\n    Prism.languages.pug = {\n      // Multiline stuff should appear before the rest\n      // This handles both single-line and multi-line comments\n      comment: {\n        pattern: /(^([\\t ]*))\\/\\/.*(?:(?:\\r?\\n|\\r)\\2[\\t ].+)*/m,\n        lookbehind: true\n      },\n      // All the tag-related part is in lookbehind\n      // so that it can be highlighted by the \"tag\" pattern\n      'multiline-script': {\n        pattern:\n          /(^([\\t ]*)script\\b.*\\.[\\t ]*)(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+/m,\n        lookbehind: true,\n        inside: Prism.languages.javascript\n      },\n      // See at the end of the file for known filters\n      filter: {\n        pattern:\n          /(^([\\t ]*)):.+(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+/m,\n        lookbehind: true,\n        inside: {\n          'filter-name': {\n            pattern: /^:[\\w-]+/,\n            alias: 'variable'\n          },\n          text: /\\S[\\s\\S]*/\n        }\n      },\n      'multiline-plain-text': {\n        pattern:\n          /(^([\\t ]*)[\\w\\-#.]+\\.[\\t ]*)(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+/m,\n        lookbehind: true\n      },\n      markup: {\n        pattern: /(^[\\t ]*)<.+/m,\n        lookbehind: true,\n        inside: Prism.languages.markup\n      },\n      doctype: {\n        pattern: /((?:^|\\n)[\\t ]*)doctype(?: .+)?/,\n        lookbehind: true\n      },\n      // This handle all conditional and loop keywords\n      'flow-control': {\n        pattern:\n          /(^[\\t ]*)(?:case|default|each|else|if|unless|when|while)\\b(?: .+)?/m,\n        lookbehind: true,\n        inside: {\n          each: {\n            pattern: /^each .+? in\\b/,\n            inside: {\n              keyword: /\\b(?:each|in)\\b/,\n              punctuation: /,/\n            }\n          },\n          branch: {\n            pattern: /^(?:case|default|else|if|unless|when|while)\\b/,\n            alias: 'keyword'\n          },\n          rest: Prism.languages.javascript\n        }\n      },\n      keyword: {\n        pattern: /(^[\\t ]*)(?:append|block|extends|include|prepend)\\b.+/m,\n        lookbehind: true\n      },\n      mixin: [\n        // Declaration\n        {\n          pattern: /(^[\\t ]*)mixin .+/m,\n          lookbehind: true,\n          inside: {\n            keyword: /^mixin/,\n            function: /\\w+(?=\\s*\\(|\\s*$)/,\n            punctuation: /[(),.]/\n          }\n        }, // Usage\n        {\n          pattern: /(^[\\t ]*)\\+.+/m,\n          lookbehind: true,\n          inside: {\n            name: {\n              pattern: /^\\+\\w+/,\n              alias: 'function'\n            },\n            rest: Prism.languages.javascript\n          }\n        }\n      ],\n      script: {\n        pattern: /(^[\\t ]*script(?:(?:&[^(]+)?\\([^)]+\\))*[\\t ]).+/m,\n        lookbehind: true,\n        inside: Prism.languages.javascript\n      },\n      'plain-text': {\n        pattern:\n          /(^[\\t ]*(?!-)[\\w\\-#.]*[\\w\\-](?:(?:&[^(]+)?\\([^)]+\\))*\\/?[\\t ]).+/m,\n        lookbehind: true\n      },\n      tag: {\n        pattern: /(^[\\t ]*)(?!-)[\\w\\-#.]*[\\w\\-](?:(?:&[^(]+)?\\([^)]+\\))*\\/?:?/m,\n        lookbehind: true,\n        inside: {\n          attributes: [\n            {\n              pattern: /&[^(]+\\([^)]+\\)/,\n              inside: Prism.languages.javascript\n            },\n            {\n              pattern: /\\([^)]+\\)/,\n              inside: {\n                'attr-value': {\n                  pattern: /(=\\s*(?!\\s))(?:\\{[^}]*\\}|[^,)\\r\\n]+)/,\n                  lookbehind: true,\n                  inside: Prism.languages.javascript\n                },\n                'attr-name': /[\\w-]+(?=\\s*!?=|\\s*[,)])/,\n                punctuation: /[!=(),]+/\n              }\n            }\n          ],\n          punctuation: /:/,\n          'attr-id': /#[\\w\\-]+/,\n          'attr-class': /\\.[\\w\\-]+/\n        }\n      },\n      code: [\n        {\n          pattern: /(^[\\t ]*(?:-|!?=)).+/m,\n          lookbehind: true,\n          inside: Prism.languages.javascript\n        }\n      ],\n      punctuation: /[.\\-!=|]+/\n    }\n    var filter_pattern =\n      /(^([\\t ]*)):<filter_name>(?:(?:\\r?\\n|\\r(?!\\n))(?:\\2[\\t ].+|\\s*?(?=\\r?\\n|\\r)))+/\n        .source // Non exhaustive list of available filters and associated languages\n    var filters = [\n      {\n        filter: 'atpl',\n        language: 'twig'\n      },\n      {\n        filter: 'coffee',\n        language: 'coffeescript'\n      },\n      'ejs',\n      'handlebars',\n      'less',\n      'livescript',\n      'markdown',\n      {\n        filter: 'sass',\n        language: 'scss'\n      },\n      'stylus'\n    ]\n    var all_filters = {}\n    for (var i = 0, l = filters.length; i < l; i++) {\n      var filter = filters[i]\n      filter =\n        typeof filter === 'string'\n          ? {\n              filter: filter,\n              language: filter\n            }\n          : filter\n      if (Prism.languages[filter.language]) {\n        all_filters['filter-' + filter.filter] = {\n          pattern: RegExp(\n            filter_pattern.replace('<filter_name>', function () {\n              return filter.filter\n            }),\n            'm'\n          ),\n          lookbehind: true,\n          inside: {\n            'filter-name': {\n              pattern: /^:[\\w-]+/,\n              alias: 'variable'\n            },\n            text: {\n              pattern: /\\S[\\s\\S]*/,\n              alias: [filter.language, 'language-' + filter.language],\n              inside: Prism.languages[filter.language]\n            }\n          }\n        }\n      }\n    }\n    Prism.languages.insertBefore('pug', 'filter', all_filters)\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/pug.js?");

/***/ })

}]);