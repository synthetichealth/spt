"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_phpExtras"],{

/***/ "./node_modules/refractor/lang/php-extras.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/php-extras.js ***!
  \***************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorPhp = __webpack_require__(/*! ./php.js */ \"./node_modules/refractor/lang/php.js\")\nmodule.exports = phpExtras\nphpExtras.displayName = 'phpExtras'\nphpExtras.aliases = []\nfunction phpExtras(Prism) {\n  Prism.register(refractorPhp)\n  Prism.languages.insertBefore('php', 'variable', {\n    this: {\n      pattern: /\\$this\\b/,\n      alias: 'keyword'\n    },\n    global:\n      /\\$(?:GLOBALS|HTTP_RAW_POST_DATA|_(?:COOKIE|ENV|FILES|GET|POST|REQUEST|SERVER|SESSION)|argc|argv|http_response_header|php_errormsg)\\b/,\n    scope: {\n      pattern: /\\b[\\w\\\\]+::/,\n      inside: {\n        keyword: /\\b(?:parent|self|static)\\b/,\n        punctuation: /::|\\\\/\n      }\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/php-extras.js?");

/***/ })

}]);