"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_apl"],{

/***/ "./node_modules/refractor/lang/apl.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/apl.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = apl\napl.displayName = 'apl'\napl.aliases = []\nfunction apl(Prism) {\n  Prism.languages.apl = {\n    comment: /(?:⍝|#[! ]).*$/m,\n    string: {\n      pattern: /'(?:[^'\\r\\n]|'')*'/,\n      greedy: true\n    },\n    number:\n      /¯?(?:\\d*\\.?\\b\\d+(?:e[+¯]?\\d+)?|¯|∞)(?:j¯?(?:(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:e[+¯]?\\d+)?|¯|∞))?/i,\n    statement: /:[A-Z][a-z][A-Za-z]*\\b/,\n    'system-function': {\n      pattern: /⎕[A-Z]+/i,\n      alias: 'function'\n    },\n    constant: /[⍬⌾#⎕⍞]/,\n    function: /[-+×÷⌈⌊∣|⍳⍸?*⍟○!⌹<≤=>≥≠≡≢∊⍷∪∩~∨∧⍱⍲⍴,⍪⌽⊖⍉↑↓⊂⊃⊆⊇⌷⍋⍒⊤⊥⍕⍎⊣⊢⍁⍂≈⍯↗¤→]/,\n    'monadic-operator': {\n      pattern: /[\\\\\\/⌿⍀¨⍨⌶&∥]/,\n      alias: 'operator'\n    },\n    'dyadic-operator': {\n      pattern: /[.⍣⍠⍤∘⌸@⌺⍥]/,\n      alias: 'operator'\n    },\n    assignment: {\n      pattern: /←/,\n      alias: 'keyword'\n    },\n    punctuation: /[\\[;\\]()◇⋄]/,\n    dfn: {\n      pattern: /[{}⍺⍵⍶⍹∇⍫:]/,\n      alias: 'builtin'\n    }\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/apl.js?");

/***/ })

}]);