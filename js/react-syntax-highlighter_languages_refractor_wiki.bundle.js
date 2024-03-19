"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_wiki"],{

/***/ "./node_modules/refractor/lang/wiki.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/wiki.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = wiki\nwiki.displayName = 'wiki'\nwiki.aliases = []\nfunction wiki(Prism) {\n  Prism.languages.wiki = Prism.languages.extend('markup', {\n    'block-comment': {\n      pattern: /(^|[^\\\\])\\/\\*[\\s\\S]*?\\*\\//,\n      lookbehind: true,\n      alias: 'comment'\n    },\n    heading: {\n      pattern: /^(=+)[^=\\r\\n].*?\\1/m,\n      inside: {\n        punctuation: /^=+|=+$/,\n        important: /.+/\n      }\n    },\n    emphasis: {\n      // TODO Multi-line\n      pattern: /('{2,5}).+?\\1/,\n      inside: {\n        'bold-italic': {\n          pattern: /(''''').+?(?=\\1)/,\n          lookbehind: true,\n          alias: ['bold', 'italic']\n        },\n        bold: {\n          pattern: /(''')[^'](?:.*?[^'])?(?=\\1)/,\n          lookbehind: true\n        },\n        italic: {\n          pattern: /('')[^'](?:.*?[^'])?(?=\\1)/,\n          lookbehind: true\n        },\n        punctuation: /^''+|''+$/\n      }\n    },\n    hr: {\n      pattern: /^-{4,}/m,\n      alias: 'punctuation'\n    },\n    url: [\n      /ISBN +(?:97[89][ -]?)?(?:\\d[ -]?){9}[\\dx]\\b|(?:PMID|RFC) +\\d+/i,\n      /\\[\\[.+?\\]\\]|\\[.+?\\]/\n    ],\n    variable: [\n      /__[A-Z]+__/, // FIXME Nested structures should be handled\n      // {{formatnum:{{#expr:{{{3}}}}}}}\n      /\\{{3}.+?\\}{3}/,\n      /\\{\\{.+?\\}\\}/\n    ],\n    symbol: [/^#redirect/im, /~{3,5}/],\n    // Handle table attrs:\n    // {|\n    // ! style=\"text-align:left;\"| Item\n    // |}\n    'table-tag': {\n      pattern: /((?:^|[|!])[|!])[^|\\r\\n]+\\|(?!\\|)/m,\n      lookbehind: true,\n      inside: {\n        'table-bar': {\n          pattern: /\\|$/,\n          alias: 'punctuation'\n        },\n        rest: Prism.languages.markup['tag'].inside\n      }\n    },\n    punctuation: /^(?:\\{\\||\\|\\}|\\|-|[*#:;!|])|\\|\\||!!/m\n  })\n  Prism.languages.insertBefore('wiki', 'tag', {\n    // Prevent highlighting inside <nowiki>, <source> and <pre> tags\n    nowiki: {\n      pattern: /<(nowiki|pre|source)\\b[^>]*>[\\s\\S]*?<\\/\\1>/i,\n      inside: {\n        tag: {\n          pattern: /<(?:nowiki|pre|source)\\b[^>]*>|<\\/(?:nowiki|pre|source)>/i,\n          inside: Prism.languages.markup['tag'].inside\n        }\n      }\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/wiki.js?");

/***/ })

}]);