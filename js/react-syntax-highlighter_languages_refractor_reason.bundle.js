"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_reason"],{

/***/ "./node_modules/refractor/lang/reason.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/reason.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = reason\nreason.displayName = 'reason'\nreason.aliases = []\nfunction reason(Prism) {\n  Prism.languages.reason = Prism.languages.extend('clike', {\n    string: {\n      pattern: /\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\\\\\\r\\n\"])*\"/,\n      greedy: true\n    },\n    // 'class-name' must be matched *after* 'constructor' defined below\n    'class-name': /\\b[A-Z]\\w*/,\n    keyword:\n      /\\b(?:and|as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|method|module|mutable|new|nonrec|object|of|open|or|private|rec|sig|struct|switch|then|to|try|type|val|virtual|when|while|with)\\b/,\n    operator:\n      /\\.{3}|:[:=]|\\|>|->|=(?:==?|>)?|<=?|>=?|[|^?'#!~`]|[+\\-*\\/]\\.?|\\b(?:asr|land|lor|lsl|lsr|lxor|mod)\\b/\n  })\n  Prism.languages.insertBefore('reason', 'class-name', {\n    char: {\n      pattern: /'(?:\\\\x[\\da-f]{2}|\\\\o[0-3][0-7][0-7]|\\\\\\d{3}|\\\\.|[^'\\\\\\r\\n])'/,\n      greedy: true\n    },\n    // Negative look-ahead prevents from matching things like String.capitalize\n    constructor: /\\b[A-Z]\\w*\\b(?!\\s*\\.)/,\n    label: {\n      pattern: /\\b[a-z]\\w*(?=::)/,\n      alias: 'symbol'\n    }\n  }) // We can't match functions property, so let's not even try.\n  delete Prism.languages.reason.function\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/reason.js?");

/***/ })

}]);