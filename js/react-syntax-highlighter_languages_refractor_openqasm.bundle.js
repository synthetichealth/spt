"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_openqasm"],{

/***/ "./node_modules/refractor/lang/openqasm.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/openqasm.js ***!
  \*************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = openqasm\nopenqasm.displayName = 'openqasm'\nopenqasm.aliases = ['qasm']\nfunction openqasm(Prism) {\n  // https://qiskit.github.io/openqasm/grammar/index.html\n  Prism.languages.openqasm = {\n    comment: /\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*/,\n    string: {\n      pattern: /\"[^\"\\r\\n\\t]*\"|'[^'\\r\\n\\t]*'/,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:CX|OPENQASM|U|barrier|boxas|boxto|break|const|continue|ctrl|def|defcal|defcalgrammar|delay|else|end|for|gate|gphase|if|in|include|inv|kernel|lengthof|let|measure|pow|reset|return|rotary|stretchinf|while)\\b|#pragma\\b/,\n    'class-name':\n      /\\b(?:angle|bit|bool|creg|fixed|float|int|length|qreg|qubit|stretch|uint)\\b/,\n    function: /\\b(?:cos|exp|ln|popcount|rotl|rotr|sin|sqrt|tan)\\b(?=\\s*\\()/,\n    constant: /\\b(?:euler|pi|tau)\\b|π|𝜏|ℇ/,\n    number: {\n      pattern:\n        /(^|[^.\\w$])(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?(?:dt|ns|us|µs|ms|s)?/i,\n      lookbehind: true\n    },\n    operator: /->|>>=?|<<=?|&&|\\|\\||\\+\\+|--|[!=<>&|~^+\\-*/%]=?|@/,\n    punctuation: /[(){}\\[\\];,:.]/\n  }\n  Prism.languages.qasm = Prism.languages.openqasm\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/openqasm.js?");

/***/ })

}]);