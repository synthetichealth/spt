"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_ini"],{

/***/ "./node_modules/refractor/lang/ini.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/ini.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = ini\nini.displayName = 'ini'\nini.aliases = []\nfunction ini(Prism) {\n  Prism.languages.ini = {\n    /**\n     * The component mimics the behavior of the Win32 API parser.\n     *\n     * @see {@link https://github.com/PrismJS/prism/issues/2775#issuecomment-787477723}\n     */\n    comment: {\n      pattern: /(^[ \\f\\t\\v]*)[#;][^\\n\\r]*/m,\n      lookbehind: true\n    },\n    section: {\n      pattern: /(^[ \\f\\t\\v]*)\\[[^\\n\\r\\]]*\\]?/m,\n      lookbehind: true,\n      inside: {\n        'section-name': {\n          pattern: /(^\\[[ \\f\\t\\v]*)[^ \\f\\t\\v\\]]+(?:[ \\f\\t\\v]+[^ \\f\\t\\v\\]]+)*/,\n          lookbehind: true,\n          alias: 'selector'\n        },\n        punctuation: /\\[|\\]/\n      }\n    },\n    key: {\n      pattern:\n        /(^[ \\f\\t\\v]*)[^ \\f\\n\\r\\t\\v=]+(?:[ \\f\\t\\v]+[^ \\f\\n\\r\\t\\v=]+)*(?=[ \\f\\t\\v]*=)/m,\n      lookbehind: true,\n      alias: 'attr-name'\n    },\n    value: {\n      pattern: /(=[ \\f\\t\\v]*)[^ \\f\\n\\r\\t\\v]+(?:[ \\f\\t\\v]+[^ \\f\\n\\r\\t\\v]+)*/,\n      lookbehind: true,\n      alias: 'attr-value',\n      inside: {\n        'inner-value': {\n          pattern: /^(\"|').+(?=\\1$)/,\n          lookbehind: true\n        }\n      }\n    },\n    punctuation: /=/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/ini.js?");

/***/ })

}]);