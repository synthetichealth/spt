"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_eiffel"],{

/***/ "./node_modules/refractor/lang/eiffel.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/eiffel.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = eiffel\neiffel.displayName = 'eiffel'\neiffel.aliases = []\nfunction eiffel(Prism) {\n  Prism.languages.eiffel = {\n    comment: /--.*/,\n    string: [\n      // Aligned-verbatim-strings\n      {\n        pattern: /\"([^[]*)\\[[\\s\\S]*?\\]\\1\"/,\n        greedy: true\n      }, // Non-aligned-verbatim-strings\n      {\n        pattern: /\"([^{]*)\\{[\\s\\S]*?\\}\\1\"/,\n        greedy: true\n      }, // Single-line string\n      {\n        pattern: /\"(?:%(?:(?!\\n)\\s)*\\n\\s*%|%\\S|[^%\"\\r\\n])*\"/,\n        greedy: true\n      }\n    ],\n    // normal char | special char | char code\n    char: /'(?:%.|[^%'\\r\\n])+'/,\n    keyword:\n      /\\b(?:across|agent|alias|all|and|as|assign|attached|attribute|check|class|convert|create|Current|debug|deferred|detachable|do|else|elseif|end|ensure|expanded|export|external|feature|from|frozen|if|implies|inherit|inspect|invariant|like|local|loop|not|note|obsolete|old|once|or|Precursor|redefine|rename|require|rescue|Result|retry|select|separate|some|then|undefine|until|variant|Void|when|xor)\\b/i,\n    boolean: /\\b(?:False|True)\\b/i,\n    // Convention: class-names are always all upper-case characters\n    'class-name': /\\b[A-Z][\\dA-Z_]*\\b/,\n    number: [\n      // hexa | octal | bin\n      /\\b0[xcb][\\da-f](?:_*[\\da-f])*\\b/i, // Decimal\n      /(?:\\b\\d(?:_*\\d)*)?\\.(?:(?:\\d(?:_*\\d)*)?e[+-]?)?\\d(?:_*\\d)*\\b|\\b\\d(?:_*\\d)*\\b\\.?/i\n    ],\n    punctuation: /:=|<<|>>|\\(\\||\\|\\)|->|\\.(?=\\w)|[{}[\\];(),:?]/,\n    operator: /\\\\\\\\|\\|\\.\\.\\||\\.\\.|\\/[~\\/=]?|[><]=?|[-+*^=~]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/eiffel.js?");

/***/ })

}]);