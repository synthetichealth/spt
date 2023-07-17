"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_birb"],{

/***/ "./node_modules/refractor/lang/birb.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/birb.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = birb\nbirb.displayName = 'birb'\nbirb.aliases = []\nfunction birb(Prism) {\n  Prism.languages.birb = Prism.languages.extend('clike', {\n    string: {\n      pattern: /r?(\"|')(?:\\\\.|(?!\\1)[^\\\\])*\\1/,\n      greedy: true\n    },\n    'class-name': [\n      /\\b[A-Z](?:[\\d_]*[a-zA-Z]\\w*)?\\b/, // matches variable and function return types (parameters as well).\n      /\\b(?:[A-Z]\\w*|(?!(?:var|void)\\b)[a-z]\\w*)(?=\\s+\\w+\\s*[;,=()])/\n    ],\n    keyword:\n      /\\b(?:assert|break|case|class|const|default|else|enum|final|follows|for|grab|if|nest|new|next|noSeeb|return|static|switch|throw|var|void|while)\\b/,\n    operator: /\\+\\+|--|&&|\\|\\||<<=?|>>=?|~(?:\\/=?)?|[+\\-*\\/%&^|=!<>]=?|\\?|:/,\n    variable: /\\b[a-z_]\\w*\\b/\n  })\n  Prism.languages.insertBefore('birb', 'function', {\n    metadata: {\n      pattern: /<\\w+>/,\n      greedy: true,\n      alias: 'symbol'\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/birb.js?");

/***/ })

}]);