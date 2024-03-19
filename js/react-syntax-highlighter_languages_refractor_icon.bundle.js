"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_icon"],{

/***/ "./node_modules/refractor/lang/icon.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/icon.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = icon\nicon.displayName = 'icon'\nicon.aliases = []\nfunction icon(Prism) {\n  Prism.languages.icon = {\n    comment: /#.*/,\n    string: {\n      pattern: /([\"'])(?:(?!\\1)[^\\\\\\r\\n_]|\\\\.|_(?!\\1)(?:\\r\\n|[\\s\\S]))*\\1/,\n      greedy: true\n    },\n    number: /\\b(?:\\d+r[a-z\\d]+|\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?)\\b|\\.\\d+\\b/i,\n    'builtin-keyword': {\n      pattern:\n        /&(?:allocated|ascii|clock|collections|cset|current|date|dateline|digits|dump|e|error(?:number|text|value)?|errout|fail|features|file|host|input|lcase|letters|level|line|main|null|output|phi|pi|pos|progname|random|regions|source|storage|subject|time|trace|ucase|version)\\b/,\n      alias: 'variable'\n    },\n    directive: {\n      pattern: /\\$\\w+/,\n      alias: 'builtin'\n    },\n    keyword:\n      /\\b(?:break|by|case|create|default|do|else|end|every|fail|global|if|initial|invocable|link|local|next|not|of|procedure|record|repeat|return|static|suspend|then|to|until|while)\\b/,\n    function: /\\b(?!\\d)\\w+(?=\\s*[({]|\\s*!\\s*\\[)/,\n    operator:\n      /[+-]:(?!=)|(?:[\\/?@^%&]|\\+\\+?|--?|==?=?|~==?=?|\\*\\*?|\\|\\|\\|?|<(?:->?|<?=?)|>>?=?)(?::=)?|:(?:=:?)?|[!.\\\\|~]/,\n    punctuation: /[\\[\\](){},;]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/icon.js?");

/***/ })

}]);