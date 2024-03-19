"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_regex"],{

/***/ "./node_modules/refractor/lang/regex.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/regex.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = regex\nregex.displayName = 'regex'\nregex.aliases = []\nfunction regex(Prism) {\n  ;(function (Prism) {\n    var specialEscape = {\n      pattern: /\\\\[\\\\(){}[\\]^$+*?|.]/,\n      alias: 'escape'\n    }\n    var escape =\n      /\\\\(?:x[\\da-fA-F]{2}|u[\\da-fA-F]{4}|u\\{[\\da-fA-F]+\\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/\n    var charSet = {\n      pattern: /\\.|\\\\[wsd]|\\\\p\\{[^{}]+\\}/i,\n      alias: 'class-name'\n    }\n    var charSetWithoutDot = {\n      pattern: /\\\\[wsd]|\\\\p\\{[^{}]+\\}/i,\n      alias: 'class-name'\n    }\n    var rangeChar = '(?:[^\\\\\\\\-]|' + escape.source + ')'\n    var range = RegExp(rangeChar + '-' + rangeChar) // the name of a capturing group\n    var groupName = {\n      pattern: /(<|')[^<>']+(?=[>']$)/,\n      lookbehind: true,\n      alias: 'variable'\n    }\n    Prism.languages.regex = {\n      'char-class': {\n        pattern: /((?:^|[^\\\\])(?:\\\\\\\\)*)\\[(?:[^\\\\\\]]|\\\\[\\s\\S])*\\]/,\n        lookbehind: true,\n        inside: {\n          'char-class-negation': {\n            pattern: /(^\\[)\\^/,\n            lookbehind: true,\n            alias: 'operator'\n          },\n          'char-class-punctuation': {\n            pattern: /^\\[|\\]$/,\n            alias: 'punctuation'\n          },\n          range: {\n            pattern: range,\n            inside: {\n              escape: escape,\n              'range-punctuation': {\n                pattern: /-/,\n                alias: 'operator'\n              }\n            }\n          },\n          'special-escape': specialEscape,\n          'char-set': charSetWithoutDot,\n          escape: escape\n        }\n      },\n      'special-escape': specialEscape,\n      'char-set': charSet,\n      backreference: [\n        {\n          // a backreference which is not an octal escape\n          pattern: /\\\\(?![123][0-7]{2})[1-9]/,\n          alias: 'keyword'\n        },\n        {\n          pattern: /\\\\k<[^<>']+>/,\n          alias: 'keyword',\n          inside: {\n            'group-name': groupName\n          }\n        }\n      ],\n      anchor: {\n        pattern: /[$^]|\\\\[ABbGZz]/,\n        alias: 'function'\n      },\n      escape: escape,\n      group: [\n        {\n          // https://docs.oracle.com/javase/10/docs/api/java/util/regex/Pattern.html\n          // https://docs.microsoft.com/en-us/dotnet/standard/base-types/regular-expression-language-quick-reference?view=netframework-4.7.2#grouping-constructs\n          // (), (?<name>), (?'name'), (?>), (?:), (?=), (?!), (?<=), (?<!), (?is-m), (?i-m:)\n          pattern:\n            /\\((?:\\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,\n          alias: 'punctuation',\n          inside: {\n            'group-name': groupName\n          }\n        },\n        {\n          pattern: /\\)/,\n          alias: 'punctuation'\n        }\n      ],\n      quantifier: {\n        pattern: /(?:[+*?]|\\{\\d+(?:,\\d*)?\\})[?+]?/,\n        alias: 'number'\n      },\n      alternation: {\n        pattern: /\\|/,\n        alias: 'keyword'\n      }\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/regex.js?");

/***/ })

}]);