"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_flow"],{

/***/ "./node_modules/refractor/lang/flow.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/flow.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = flow\nflow.displayName = 'flow'\nflow.aliases = []\nfunction flow(Prism) {\n  ;(function (Prism) {\n    Prism.languages.flow = Prism.languages.extend('javascript', {})\n    Prism.languages.insertBefore('flow', 'keyword', {\n      type: [\n        {\n          pattern:\n            /\\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|any|mixed|null|void)\\b/,\n          alias: 'tag'\n        }\n      ]\n    })\n    Prism.languages.flow['function-variable'].pattern =\n      /(?!\\s)[_$a-z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*(?=\\s*=\\s*(?:function\\b|(?:\\([^()]*\\)(?:\\s*:\\s*\\w+)?|(?!\\s)[_$a-z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*)\\s*=>))/i\n    delete Prism.languages.flow['parameter']\n    Prism.languages.insertBefore('flow', 'operator', {\n      'flow-punctuation': {\n        pattern: /\\{\\||\\|\\}/,\n        alias: 'punctuation'\n      }\n    })\n    if (!Array.isArray(Prism.languages.flow.keyword)) {\n      Prism.languages.flow.keyword = [Prism.languages.flow.keyword]\n    }\n    Prism.languages.flow.keyword.unshift(\n      {\n        pattern: /(^|[^$]\\b)(?:Class|declare|opaque|type)\\b(?!\\$)/,\n        lookbehind: true\n      },\n      {\n        pattern:\n          /(^|[^$]\\B)\\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\\b(?!\\$)/,\n        lookbehind: true\n      }\n    )\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/flow.js?");

/***/ })

}]);