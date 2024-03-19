"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_hoon"],{

/***/ "./node_modules/refractor/lang/hoon.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/hoon.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = hoon\nhoon.displayName = 'hoon'\nhoon.aliases = []\nfunction hoon(Prism) {\n  Prism.languages.hoon = {\n    comment: {\n      pattern: /::.*/,\n      greedy: true\n    },\n    string: {\n      pattern: /\"[^\"]*\"|'[^']*'/,\n      greedy: true\n    },\n    constant: /%(?:\\.[ny]|[\\w-]+)/,\n    'class-name': /@(?:[a-z0-9-]*[a-z0-9])?|\\*/i,\n    function: /(?:\\+[-+] {2})?(?:[a-z](?:[a-z0-9-]*[a-z0-9])?)/,\n    keyword:\n      /\\.[\\^\\+\\*=\\?]|![><:\\.=\\?!]|=[>|:,\\.\\-\\^<+;/~\\*\\?]|\\?[>|:\\.\\-\\^<\\+&~=@!]|\\|[\\$_%:\\.\\-\\^~\\*=@\\?]|\\+[|\\$\\+\\*]|:[_\\-\\^\\+~\\*]|%[_:\\.\\-\\^\\+~\\*=]|\\^[|:\\.\\-\\+&~\\*=\\?]|\\$[|_%:<>\\-\\^&~@=\\?]|;[:<\\+;\\/~\\*=]|~[>|\\$_%<\\+\\/&=\\?!]|--|==/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/hoon.js?");

/***/ })

}]);