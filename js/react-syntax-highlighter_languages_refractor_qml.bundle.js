"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_qml"],{

/***/ "./node_modules/refractor/lang/qml.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/qml.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = qml\nqml.displayName = 'qml'\nqml.aliases = []\nfunction qml(Prism) {\n  ;(function (Prism) {\n    var jsString = /\"(?:\\\\.|[^\\\\\"\\r\\n])*\"|'(?:\\\\.|[^\\\\'\\r\\n])*'/.source\n    var jsComment = /\\/\\/.*(?!.)|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\//.source\n    var jsExpr =\n      /(?:[^\\\\()[\\]{}\"'/]|<string>|\\/(?![*/])|<comment>|\\(<expr>*\\)|\\[<expr>*\\]|\\{<expr>*\\}|\\\\[\\s\\S])/.source\n        .replace(/<string>/g, function () {\n          return jsString\n        })\n        .replace(/<comment>/g, function () {\n          return jsComment\n        }) // the pattern will blow up, so only a few iterations\n    for (var i = 0; i < 2; i++) {\n      jsExpr = jsExpr.replace(/<expr>/g, function () {\n        return jsExpr\n      })\n    }\n    jsExpr = jsExpr.replace(/<expr>/g, '[^\\\\s\\\\S]')\n    Prism.languages.qml = {\n      comment: {\n        pattern: /\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\//,\n        greedy: true\n      },\n      'javascript-function': {\n        pattern: RegExp(\n          /((?:^|;)[ \\t]*)function\\s+(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*\\s*\\(<js>*\\)\\s*\\{<js>*\\}/.source.replace(\n            /<js>/g,\n            function () {\n              return jsExpr\n            }\n          ),\n          'm'\n        ),\n        lookbehind: true,\n        greedy: true,\n        alias: 'language-javascript',\n        inside: Prism.languages.javascript\n      },\n      'class-name': {\n        pattern: /((?:^|[:;])[ \\t]*)(?!\\d)\\w+(?=[ \\t]*\\{|[ \\t]+on\\b)/m,\n        lookbehind: true\n      },\n      property: [\n        {\n          pattern: /((?:^|[;{])[ \\t]*)(?!\\d)\\w+(?:\\.\\w+)*(?=[ \\t]*:)/m,\n          lookbehind: true\n        },\n        {\n          pattern:\n            /((?:^|[;{])[ \\t]*)property[ \\t]+(?!\\d)\\w+(?:\\.\\w+)*[ \\t]+(?!\\d)\\w+(?:\\.\\w+)*(?=[ \\t]*:)/m,\n          lookbehind: true,\n          inside: {\n            keyword: /^property/,\n            property: /\\w+(?:\\.\\w+)*/\n          }\n        }\n      ],\n      'javascript-expression': {\n        pattern: RegExp(\n          /(:[ \\t]*)(?![\\s;}[])(?:(?!$|[;}])<js>)+/.source.replace(\n            /<js>/g,\n            function () {\n              return jsExpr\n            }\n          ),\n          'm'\n        ),\n        lookbehind: true,\n        greedy: true,\n        alias: 'language-javascript',\n        inside: Prism.languages.javascript\n      },\n      string: {\n        pattern: /\"(?:\\\\.|[^\\\\\"\\r\\n])*\"/,\n        greedy: true\n      },\n      keyword: /\\b(?:as|import|on)\\b/,\n      punctuation: /[{}[\\]:;,]/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/qml.js?");

/***/ })

}]);