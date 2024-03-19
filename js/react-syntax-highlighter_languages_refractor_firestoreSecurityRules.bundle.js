"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_firestoreSecurityRules"],{

/***/ "./node_modules/refractor/lang/firestore-security-rules.js":
/*!*****************************************************************!*\
  !*** ./node_modules/refractor/lang/firestore-security-rules.js ***!
  \*****************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = firestoreSecurityRules\nfirestoreSecurityRules.displayName = 'firestoreSecurityRules'\nfirestoreSecurityRules.aliases = []\nfunction firestoreSecurityRules(Prism) {\n  Prism.languages['firestore-security-rules'] = Prism.languages.extend(\n    'clike',\n    {\n      comment: /\\/\\/.*/,\n      keyword:\n        /\\b(?:allow|function|if|match|null|return|rules_version|service)\\b/,\n      operator: /&&|\\|\\||[<>!=]=?|[-+*/%]|\\b(?:in|is)\\b/\n    }\n  )\n  delete Prism.languages['firestore-security-rules']['class-name']\n  Prism.languages.insertBefore('firestore-security-rules', 'keyword', {\n    path: {\n      pattern:\n        /(^|[\\s(),])(?:\\/(?:[\\w\\xA0-\\uFFFF]+|\\{[\\w\\xA0-\\uFFFF]+(?:=\\*\\*)?\\}|\\$\\([\\w\\xA0-\\uFFFF.]+\\)))+/,\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        variable: {\n          pattern: /\\{[\\w\\xA0-\\uFFFF]+(?:=\\*\\*)?\\}|\\$\\([\\w\\xA0-\\uFFFF.]+\\)/,\n          inside: {\n            operator: /=/,\n            keyword: /\\*\\*/,\n            punctuation: /[.$(){}]/\n          }\n        },\n        punctuation: /\\//\n      }\n    },\n    method: {\n      // to make the pattern shorter, the actual method names are omitted\n      pattern: /(\\ballow\\s+)[a-z]+(?:\\s*,\\s*[a-z]+)*(?=\\s*[:;])/,\n      lookbehind: true,\n      alias: 'builtin',\n      inside: {\n        punctuation: /,/\n      }\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/firestore-security-rules.js?");

/***/ })

}]);