"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_agda"],{

/***/ "./node_modules/refractor/lang/agda.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/agda.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = agda\nagda.displayName = 'agda'\nagda.aliases = []\nfunction agda(Prism) {\n  ;(function (Prism) {\n    Prism.languages.agda = {\n      comment: /\\{-[\\s\\S]*?(?:-\\}|$)|--.*/,\n      string: {\n        pattern: /\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\\\\\\r\\n\"])*\"/,\n        greedy: true\n      },\n      punctuation: /[(){}⦃⦄.;@]/,\n      'class-name': {\n        pattern: /((?:data|record) +)\\S+/,\n        lookbehind: true\n      },\n      function: {\n        pattern: /(^[ \\t]*)(?!\\s)[^:\\r\\n]+(?=:)/m,\n        lookbehind: true\n      },\n      operator: {\n        pattern: /(^\\s*|\\s)(?:[=|:∀→λ\\\\?_]|->)(?=\\s)/,\n        lookbehind: true\n      },\n      keyword:\n        /\\b(?:Set|abstract|constructor|data|eta-equality|field|forall|hiding|import|in|inductive|infix|infixl|infixr|instance|let|macro|module|mutual|no-eta-equality|open|overlap|pattern|postulate|primitive|private|public|quote|quoteContext|quoteGoal|quoteTerm|record|renaming|rewrite|syntax|tactic|unquote|unquoteDecl|unquoteDef|using|variable|where|with)\\b/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/agda.js?");

/***/ })

}]);