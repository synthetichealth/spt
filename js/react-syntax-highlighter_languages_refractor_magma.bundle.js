"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_magma"],{

/***/ "./node_modules/refractor/lang/magma.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/magma.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = magma\nmagma.displayName = 'magma'\nmagma.aliases = []\nfunction magma(Prism) {\n  Prism.languages.magma = {\n    output: {\n      pattern:\n        /^(>.*(?:\\r(?:\\n|(?!\\n))|\\n))(?!>)(?:.+|(?:\\r(?:\\n|(?!\\n))|\\n)(?!>).*)(?:(?:\\r(?:\\n|(?!\\n))|\\n)(?!>).*)*/m,\n      lookbehind: true,\n      greedy: true\n    },\n    comment: {\n      pattern: /\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\//,\n      greedy: true\n    },\n    string: {\n      pattern: /(^|[^\\\\\"])\"(?:[^\\r\\n\\\\\"]|\\\\.)*\"/,\n      lookbehind: true,\n      greedy: true\n    },\n    // http://magma.maths.usyd.edu.au/magma/handbook/text/82\n    keyword:\n      /\\b(?:_|adj|and|assert|assert2|assert3|assigned|break|by|case|cat|catch|clear|cmpeq|cmpne|continue|declare|default|delete|diff|div|do|elif|else|end|eq|error|eval|exists|exit|for|forall|forward|fprintf|freeze|function|ge|gt|if|iload|import|in|intrinsic|is|join|le|load|local|lt|meet|mod|ne|not|notadj|notin|notsubset|or|print|printf|procedure|quit|random|read|readi|repeat|require|requirege|requirerange|restore|return|save|sdiff|select|subset|then|time|to|try|until|vprint|vprintf|vtime|when|where|while|xor)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    generator: {\n      pattern: /\\b[a-z_]\\w*(?=\\s*<)/i,\n      alias: 'class-name'\n    },\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n    number: {\n      pattern:\n        /(^|[^\\w.]|\\.\\.)(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?(?:_[a-z]?)?(?=$|[^\\w.]|\\.\\.)/,\n      lookbehind: true\n    },\n    operator: /->|[-+*/^~!|#=]|:=|\\.\\./,\n    punctuation: /[()[\\]{}<>,;.:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/magma.js?");

/***/ })

}]);