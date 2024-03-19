"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_hsts"],{

/***/ "./node_modules/refractor/lang/hsts.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/hsts.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = hsts\nhsts.displayName = 'hsts'\nhsts.aliases = []\nfunction hsts(Prism) {\n  /**\n   * Original by Scott Helme.\n   *\n   * Reference: https://scotthelme.co.uk/hsts-cheat-sheet/\n   */\n  Prism.languages.hsts = {\n    directive: {\n      pattern: /\\b(?:includeSubDomains|max-age|preload)(?=[\\s;=]|$)/i,\n      alias: 'property'\n    },\n    operator: /=/,\n    punctuation: /;/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/hsts.js?");

/***/ })

}]);