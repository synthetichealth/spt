"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_hpkp"],{

/***/ "./node_modules/refractor/lang/hpkp.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/hpkp.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = hpkp\nhpkp.displayName = 'hpkp'\nhpkp.aliases = []\nfunction hpkp(Prism) {\n  /**\n   * Original by Scott Helme.\n   *\n   * Reference: https://scotthelme.co.uk/hpkp-cheat-sheet/\n   */\n  Prism.languages.hpkp = {\n    directive: {\n      pattern:\n        /\\b(?:includeSubDomains|max-age|pin-sha256|preload|report-to|report-uri|strict)(?=[\\s;=]|$)/i,\n      alias: 'property'\n    },\n    operator: /=/,\n    punctuation: /;/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/hpkp.js?");

/***/ })

}]);