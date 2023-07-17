"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_aspnet"],{

/***/ "./node_modules/refractor/lang/aspnet.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/aspnet.js ***!
  \***********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorCsharp = __webpack_require__(/*! ./csharp.js */ \"./node_modules/refractor/lang/csharp.js\")\nmodule.exports = aspnet\naspnet.displayName = 'aspnet'\naspnet.aliases = []\nfunction aspnet(Prism) {\n  Prism.register(refractorCsharp)\n  Prism.languages.aspnet = Prism.languages.extend('markup', {\n    'page-directive': {\n      pattern: /<%\\s*@.*%>/,\n      alias: 'tag',\n      inside: {\n        'page-directive': {\n          pattern:\n            /<%\\s*@\\s*(?:Assembly|Control|Implements|Import|Master(?:Type)?|OutputCache|Page|PreviousPageType|Reference|Register)?|%>/i,\n          alias: 'tag'\n        },\n        rest: Prism.languages.markup.tag.inside\n      }\n    },\n    directive: {\n      pattern: /<%.*%>/,\n      alias: 'tag',\n      inside: {\n        directive: {\n          pattern: /<%\\s*?[$=%#:]{0,2}|%>/,\n          alias: 'tag'\n        },\n        rest: Prism.languages.csharp\n      }\n    }\n  }) // Regexp copied from prism-markup, with a negative look-ahead added\n  Prism.languages.aspnet.tag.pattern =\n    /<(?!%)\\/?[^\\s>\\/]+(?:\\s+[^\\s>\\/=]+(?:=(?:(\"|')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|[^\\s'\">=]+))?)*\\s*\\/?>/ // match directives of attribute value foo=\"<% Bar %>\"\n  Prism.languages.insertBefore(\n    'inside',\n    'punctuation',\n    {\n      directive: Prism.languages.aspnet['directive']\n    },\n    Prism.languages.aspnet.tag.inside['attr-value']\n  )\n  Prism.languages.insertBefore('aspnet', 'comment', {\n    'asp-comment': {\n      pattern: /<%--[\\s\\S]*?--%>/,\n      alias: ['asp', 'comment']\n    }\n  }) // script runat=\"server\" contains csharp, not javascript\n  Prism.languages.insertBefore(\n    'aspnet',\n    Prism.languages.javascript ? 'script' : 'tag',\n    {\n      'asp-script': {\n        pattern:\n          /(<script(?=.*runat=['\"]?server\\b)[^>]*>)[\\s\\S]*?(?=<\\/script>)/i,\n        lookbehind: true,\n        alias: ['asp', 'script'],\n        inside: Prism.languages.csharp || {}\n      }\n    }\n  )\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/aspnet.js?");

/***/ })

}]);