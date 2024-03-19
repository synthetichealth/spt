"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_maxscript"],{

/***/ "./node_modules/refractor/lang/maxscript.js":
/*!**************************************************!*\
  !*** ./node_modules/refractor/lang/maxscript.js ***!
  \**************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = maxscript\nmaxscript.displayName = 'maxscript'\nmaxscript.aliases = []\nfunction maxscript(Prism) {\n  ;(function (Prism) {\n    var keywords =\n      /\\b(?:about|and|animate|as|at|attributes|by|case|catch|collect|continue|coordsys|do|else|exit|fn|for|from|function|global|if|in|local|macroscript|mapped|max|not|of|off|on|or|parameters|persistent|plugin|rcmenu|return|rollout|set|struct|then|throw|to|tool|try|undo|utility|when|where|while|with)\\b/i\n    Prism.languages.maxscript = {\n      comment: {\n        pattern: /\\/\\*[\\s\\S]*?(?:\\*\\/|$)|--.*/,\n        greedy: true\n      },\n      string: {\n        pattern: /(^|[^\"\\\\@])(?:\"(?:[^\"\\\\]|\\\\[\\s\\S])*\"|@\"[^\"]*\")/,\n        lookbehind: true,\n        greedy: true\n      },\n      path: {\n        pattern: /\\$(?:[\\w/\\\\.*?]|'[^']*')*/,\n        greedy: true,\n        alias: 'string'\n      },\n      'function-call': {\n        pattern: RegExp(\n          '((?:' + // start of line\n            (/^/.source +\n              '|' + // operators and other language constructs\n              /[;=<>+\\-*/^({\\[]/.source +\n              '|' + // keywords as part of statements\n              /\\b(?:and|by|case|catch|collect|do|else|if|in|not|or|return|then|to|try|where|while|with)\\b/\n                .source) +\n            ')[ \\t]*)' +\n            '(?!' +\n            keywords.source +\n            ')' +\n            /[a-z_]\\w*\\b/.source +\n            '(?=[ \\t]*(?:' + // variable\n            ('(?!' +\n              keywords.source +\n              ')' +\n              /[a-z_]/.source +\n              '|' + // number\n              /\\d|-\\.?\\d/.source +\n              '|' + // other expressions or literals\n              /[({'\"$@#?]/.source) +\n            '))',\n          'im'\n        ),\n        lookbehind: true,\n        greedy: true,\n        alias: 'function'\n      },\n      'function-definition': {\n        pattern: /(\\b(?:fn|function)\\s+)\\w+\\b/i,\n        lookbehind: true,\n        alias: 'function'\n      },\n      argument: {\n        pattern: /\\b[a-z_]\\w*(?=:)/i,\n        alias: 'attr-name'\n      },\n      keyword: keywords,\n      boolean: /\\b(?:false|true)\\b/,\n      time: {\n        pattern:\n          /(^|[^\\w.])(?:(?:(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eEdD][+-]\\d+|[LP])?[msft])+|\\d+:\\d+(?:\\.\\d*)?)(?![\\w.:])/,\n        lookbehind: true,\n        alias: 'number'\n      },\n      number: [\n        {\n          pattern:\n            /(^|[^\\w.])(?:(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eEdD][+-]\\d+|[LP])?|0x[a-fA-F0-9]+)(?![\\w.:])/,\n          lookbehind: true\n        },\n        /\\b(?:e|pi)\\b/\n      ],\n      constant: /\\b(?:dontcollect|ok|silentValue|undefined|unsupplied)\\b/,\n      color: {\n        pattern: /\\b(?:black|blue|brown|gray|green|orange|red|white|yellow)\\b/i,\n        alias: 'constant'\n      },\n      operator: /[-+*/<>=!]=?|[&^?]|#(?!\\()/,\n      punctuation: /[()\\[\\]{}.:,;]|#(?=\\()|\\\\$/m\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/maxscript.js?");

/***/ })

}]);