"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_scss"],{

/***/ "./node_modules/refractor/lang/scss.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/scss.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = scss\nscss.displayName = 'scss'\nscss.aliases = []\nfunction scss(Prism) {\n  Prism.languages.scss = Prism.languages.extend('css', {\n    comment: {\n      pattern: /(^|[^\\\\])(?:\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*)/,\n      lookbehind: true\n    },\n    atrule: {\n      pattern: /@[\\w-](?:\\([^()]+\\)|[^()\\s]|\\s+(?!\\s))*?(?=\\s+[{;])/,\n      inside: {\n        rule: /@[\\w-]+/ // See rest below\n      }\n    },\n    // url, compassified\n    url: /(?:[-a-z]+-)?url(?=\\()/i,\n    // CSS selector regex is not appropriate for Sass\n    // since there can be lot more things (var, @ directive, nesting..)\n    // a selector must start at the end of a property or after a brace (end of other rules or nesting)\n    // it can contain some characters that aren't used for defining rules or end of selector, & (parent selector), or interpolated variable\n    // the end of a selector is found when there is no rules in it ( {} or {\\s}) or if there is a property (because an interpolated var\n    // can \"pass\" as a selector- e.g: proper#{$erty})\n    // this one was hard to do, so please be careful if you edit this one :)\n    selector: {\n      // Initial look-ahead is used to prevent matching of blank selectors\n      pattern:\n        /(?=\\S)[^@;{}()]?(?:[^@;{}()\\s]|\\s+(?!\\s)|#\\{\\$[-\\w]+\\})+(?=\\s*\\{(?:\\}|\\s|[^}][^:{}]*[:{][^}]))/,\n      inside: {\n        parent: {\n          pattern: /&/,\n          alias: 'important'\n        },\n        placeholder: /%[-\\w]+/,\n        variable: /\\$[-\\w]+|#\\{\\$[-\\w]+\\}/\n      }\n    },\n    property: {\n      pattern: /(?:[-\\w]|\\$[-\\w]|#\\{\\$[-\\w]+\\})+(?=\\s*:)/,\n      inside: {\n        variable: /\\$[-\\w]+|#\\{\\$[-\\w]+\\}/\n      }\n    }\n  })\n  Prism.languages.insertBefore('scss', 'atrule', {\n    keyword: [\n      /@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\\b/i,\n      {\n        pattern: /( )(?:from|through)(?= )/,\n        lookbehind: true\n      }\n    ]\n  })\n  Prism.languages.insertBefore('scss', 'important', {\n    // var and interpolated vars\n    variable: /\\$[-\\w]+|#\\{\\$[-\\w]+\\}/\n  })\n  Prism.languages.insertBefore('scss', 'function', {\n    'module-modifier': {\n      pattern: /\\b(?:as|hide|show|with)\\b/i,\n      alias: 'keyword'\n    },\n    placeholder: {\n      pattern: /%[-\\w]+/,\n      alias: 'selector'\n    },\n    statement: {\n      pattern: /\\B!(?:default|optional)\\b/i,\n      alias: 'keyword'\n    },\n    boolean: /\\b(?:false|true)\\b/,\n    null: {\n      pattern: /\\bnull\\b/,\n      alias: 'keyword'\n    },\n    operator: {\n      pattern: /(\\s)(?:[-+*\\/%]|[=!]=|<=?|>=?|and|not|or)(?=\\s)/,\n      lookbehind: true\n    }\n  })\n  Prism.languages.scss['atrule'].inside.rest = Prism.languages.scss\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/scss.js?");

/***/ })

}]);