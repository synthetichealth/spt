"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_protobuf"],{

/***/ "./node_modules/refractor/lang/protobuf.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/protobuf.js ***!
  \*************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = protobuf\nprotobuf.displayName = 'protobuf'\nprotobuf.aliases = []\nfunction protobuf(Prism) {\n  ;(function (Prism) {\n    var builtinTypes =\n      /\\b(?:bool|bytes|double|s?fixed(?:32|64)|float|[su]?int(?:32|64)|string)\\b/\n    Prism.languages.protobuf = Prism.languages.extend('clike', {\n      'class-name': [\n        {\n          pattern:\n            /(\\b(?:enum|extend|message|service)\\s+)[A-Za-z_]\\w*(?=\\s*\\{)/,\n          lookbehind: true\n        },\n        {\n          pattern:\n            /(\\b(?:rpc\\s+\\w+|returns)\\s*\\(\\s*(?:stream\\s+)?)\\.?[A-Za-z_]\\w*(?:\\.[A-Za-z_]\\w*)*(?=\\s*\\))/,\n          lookbehind: true\n        }\n      ],\n      keyword:\n        /\\b(?:enum|extend|extensions|import|message|oneof|option|optional|package|public|repeated|required|reserved|returns|rpc(?=\\s+\\w)|service|stream|syntax|to)\\b(?!\\s*=\\s*\\d)/,\n      function: /\\b[a-z_]\\w*(?=\\s*\\()/i\n    })\n    Prism.languages.insertBefore('protobuf', 'operator', {\n      map: {\n        pattern: /\\bmap<\\s*[\\w.]+\\s*,\\s*[\\w.]+\\s*>(?=\\s+[a-z_]\\w*\\s*[=;])/i,\n        alias: 'class-name',\n        inside: {\n          punctuation: /[<>.,]/,\n          builtin: builtinTypes\n        }\n      },\n      builtin: builtinTypes,\n      'positional-class-name': {\n        pattern: /(?:\\b|\\B\\.)[a-z_]\\w*(?:\\.[a-z_]\\w*)*(?=\\s+[a-z_]\\w*\\s*[=;])/i,\n        alias: 'class-name',\n        inside: {\n          punctuation: /\\./\n        }\n      },\n      annotation: {\n        pattern: /(\\[\\s*)[a-z_]\\w*(?=\\s*=)/i,\n        lookbehind: true\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/protobuf.js?");

/***/ })

}]);