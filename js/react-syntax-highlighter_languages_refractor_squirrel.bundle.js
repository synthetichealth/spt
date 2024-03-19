"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_squirrel"],{

/***/ "./node_modules/refractor/lang/squirrel.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/squirrel.js ***!
  \*************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = squirrel\nsquirrel.displayName = 'squirrel'\nsquirrel.aliases = []\nfunction squirrel(Prism) {\n  Prism.languages.squirrel = Prism.languages.extend('clike', {\n    comment: [\n      Prism.languages.clike['comment'][0],\n      {\n        pattern: /(^|[^\\\\:])(?:\\/\\/|#).*/,\n        lookbehind: true,\n        greedy: true\n      }\n    ],\n    string: {\n      pattern: /(^|[^\\\\\"'@])(?:@\"(?:[^\"]|\"\")*\"(?!\")|\"(?:[^\\\\\\r\\n\"]|\\\\.)*\")/,\n      lookbehind: true,\n      greedy: true\n    },\n    'class-name': {\n      pattern: /(\\b(?:class|enum|extends|instanceof)\\s+)\\w+(?:\\.\\w+)*/,\n      lookbehind: true,\n      inside: {\n        punctuation: /\\./\n      }\n    },\n    keyword:\n      /\\b(?:__FILE__|__LINE__|base|break|case|catch|class|clone|const|constructor|continue|default|delete|else|enum|extends|for|foreach|function|if|in|instanceof|local|null|resume|return|static|switch|this|throw|try|typeof|while|yield)\\b/,\n    number: /\\b(?:0x[0-9a-fA-F]+|\\d+(?:\\.(?:\\d+|[eE][+-]?\\d+))?)\\b/,\n    operator: /\\+\\+|--|<=>|<[-<]|>>>?|&&?|\\|\\|?|[-+*/%!=<>]=?|[~^]|::?/,\n    punctuation: /[(){}\\[\\],;.]/\n  })\n  Prism.languages.insertBefore('squirrel', 'string', {\n    char: {\n      pattern: /(^|[^\\\\\"'])'(?:[^\\\\']|\\\\(?:[xuU][0-9a-fA-F]{0,8}|[\\s\\S]))'/,\n      lookbehind: true,\n      greedy: true\n    }\n  })\n  Prism.languages.insertBefore('squirrel', 'operator', {\n    'attribute-punctuation': {\n      pattern: /<\\/|\\/>/,\n      alias: 'important'\n    },\n    lambda: {\n      pattern: /@(?=\\()/,\n      alias: 'operator'\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/squirrel.js?");

/***/ })

}]);