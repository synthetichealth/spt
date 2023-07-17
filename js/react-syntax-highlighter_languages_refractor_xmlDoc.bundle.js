"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_xmlDoc"],{

/***/ "./node_modules/refractor/lang/xml-doc.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/xml-doc.js ***!
  \************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = xmlDoc\nxmlDoc.displayName = 'xmlDoc'\nxmlDoc.aliases = []\nfunction xmlDoc(Prism) {\n  ;(function (Prism) {\n    /**\n     * If the given language is present, it will insert the given doc comment grammar token into it.\n     *\n     * @param {string} lang\n     * @param {any} docComment\n     */\n    function insertDocComment(lang, docComment) {\n      if (Prism.languages[lang]) {\n        Prism.languages.insertBefore(lang, 'comment', {\n          'doc-comment': docComment\n        })\n      }\n    }\n    var tag = Prism.languages.markup.tag\n    var slashDocComment = {\n      pattern: /\\/\\/\\/.*/,\n      greedy: true,\n      alias: 'comment',\n      inside: {\n        tag: tag\n      }\n    }\n    var tickDocComment = {\n      pattern: /'''.*/,\n      greedy: true,\n      alias: 'comment',\n      inside: {\n        tag: tag\n      }\n    }\n    insertDocComment('csharp', slashDocComment)\n    insertDocComment('fsharp', slashDocComment)\n    insertDocComment('vbnet', tickDocComment)\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/xml-doc.js?");

/***/ })

}]);