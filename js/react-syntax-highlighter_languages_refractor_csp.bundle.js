"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_csp"],{

/***/ "./node_modules/refractor/lang/csp.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/csp.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = csp\ncsp.displayName = 'csp'\ncsp.aliases = []\nfunction csp(Prism) {\n  /**\n   * Original by Scott Helme.\n   *\n   * Reference: https://scotthelme.co.uk/csp-cheat-sheet/\n   *\n   * Supports the following:\n   *  - https://www.w3.org/TR/CSP1/\n   *  - https://www.w3.org/TR/CSP2/\n   *  - https://www.w3.org/TR/CSP3/\n   */\n  ;(function (Prism) {\n    /**\n     * @param {string} source\n     * @returns {RegExp}\n     */\n    function value(source) {\n      return RegExp(\n        /([ \\t])/.source + '(?:' + source + ')' + /(?=[\\s;]|$)/.source,\n        'i'\n      )\n    }\n    Prism.languages.csp = {\n      directive: {\n        pattern:\n          /(^|[\\s;])(?:base-uri|block-all-mixed-content|(?:child|connect|default|font|frame|img|manifest|media|object|prefetch|script|style|worker)-src|disown-opener|form-action|frame-(?:ancestors|options)|input-protection(?:-(?:clip|selectors))?|navigate-to|plugin-types|policy-uri|referrer|reflected-xss|report-(?:to|uri)|require-sri-for|sandbox|(?:script|style)-src-(?:attr|elem)|upgrade-insecure-requests)(?=[\\s;]|$)/i,\n        lookbehind: true,\n        alias: 'property'\n      },\n      scheme: {\n        pattern: value(/[a-z][a-z0-9.+-]*:/.source),\n        lookbehind: true\n      },\n      none: {\n        pattern: value(/'none'/.source),\n        lookbehind: true,\n        alias: 'keyword'\n      },\n      nonce: {\n        pattern: value(/'nonce-[-+/\\w=]+'/.source),\n        lookbehind: true,\n        alias: 'number'\n      },\n      hash: {\n        pattern: value(/'sha(?:256|384|512)-[-+/\\w=]+'/.source),\n        lookbehind: true,\n        alias: 'number'\n      },\n      host: {\n        pattern: value(\n          /[a-z][a-z0-9.+-]*:\\/\\/[^\\s;,']*/.source +\n            '|' +\n            /\\*[^\\s;,']*/.source +\n            '|' +\n            /[a-z0-9-]+(?:\\.[a-z0-9-]+)+(?::[\\d*]+)?(?:\\/[^\\s;,']*)?/.source\n        ),\n        lookbehind: true,\n        alias: 'url',\n        inside: {\n          important: /\\*/\n        }\n      },\n      keyword: [\n        {\n          pattern: value(/'unsafe-[a-z-]+'/.source),\n          lookbehind: true,\n          alias: 'unsafe'\n        },\n        {\n          pattern: value(/'[a-z-]+'/.source),\n          lookbehind: true,\n          alias: 'safe'\n        }\n      ],\n      punctuation: /;/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/csp.js?");

/***/ })

}]);