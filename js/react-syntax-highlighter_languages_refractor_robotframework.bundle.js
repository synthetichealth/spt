"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_robotframework"],{

/***/ "./node_modules/refractor/lang/robotframework.js":
/*!*******************************************************!*\
  !*** ./node_modules/refractor/lang/robotframework.js ***!
  \*******************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = robotframework\nrobotframework.displayName = 'robotframework'\nrobotframework.aliases = []\nfunction robotframework(Prism) {\n  ;(function (Prism) {\n    var comment = {\n      pattern: /(^[ \\t]*| {2}|\\t)#.*/m,\n      lookbehind: true,\n      greedy: true\n    }\n    var variable = {\n      pattern: /((?:^|[^\\\\])(?:\\\\{2})*)[$@&%]\\{(?:[^{}\\r\\n]|\\{[^{}\\r\\n]*\\})*\\}/,\n      lookbehind: true,\n      inside: {\n        punctuation: /^[$@&%]\\{|\\}$/\n      }\n    }\n    function createSection(name, inside) {\n      var extendecInside = {}\n      extendecInside['section-header'] = {\n        pattern: /^ ?\\*{3}.+?\\*{3}/,\n        alias: 'keyword'\n      } // copy inside tokens\n      for (var token in inside) {\n        extendecInside[token] = inside[token]\n      }\n      extendecInside['tag'] = {\n        pattern: /([\\r\\n](?: {2}|\\t)[ \\t]*)\\[[-\\w]+\\]/,\n        lookbehind: true,\n        inside: {\n          punctuation: /\\[|\\]/\n        }\n      }\n      extendecInside['variable'] = variable\n      extendecInside['comment'] = comment\n      return {\n        pattern: RegExp(\n          /^ ?\\*{3}[ \\t]*<name>[ \\t]*\\*{3}(?:.|[\\r\\n](?!\\*{3}))*/.source.replace(\n            /<name>/g,\n            function () {\n              return name\n            }\n          ),\n          'im'\n        ),\n        alias: 'section',\n        inside: extendecInside\n      }\n    }\n    var docTag = {\n      pattern:\n        /(\\[Documentation\\](?: {2}|\\t)[ \\t]*)(?![ \\t]|#)(?:.|(?:\\r\\n?|\\n)[ \\t]*\\.{3})+/,\n      lookbehind: true,\n      alias: 'string'\n    }\n    var testNameLike = {\n      pattern: /([\\r\\n] ?)(?!#)(?:\\S(?:[ \\t]\\S)*)+/,\n      lookbehind: true,\n      alias: 'function',\n      inside: {\n        variable: variable\n      }\n    }\n    var testPropertyLike = {\n      pattern: /([\\r\\n](?: {2}|\\t)[ \\t]*)(?!\\[|\\.{3}|#)(?:\\S(?:[ \\t]\\S)*)+/,\n      lookbehind: true,\n      inside: {\n        variable: variable\n      }\n    }\n    Prism.languages['robotframework'] = {\n      settings: createSection('Settings', {\n        documentation: {\n          pattern:\n            /([\\r\\n] ?Documentation(?: {2}|\\t)[ \\t]*)(?![ \\t]|#)(?:.|(?:\\r\\n?|\\n)[ \\t]*\\.{3})+/,\n          lookbehind: true,\n          alias: 'string'\n        },\n        property: {\n          pattern: /([\\r\\n] ?)(?!\\.{3}|#)(?:\\S(?:[ \\t]\\S)*)+/,\n          lookbehind: true\n        }\n      }),\n      variables: createSection('Variables'),\n      'test-cases': createSection('Test Cases', {\n        'test-name': testNameLike,\n        documentation: docTag,\n        property: testPropertyLike\n      }),\n      keywords: createSection('Keywords', {\n        'keyword-name': testNameLike,\n        documentation: docTag,\n        property: testPropertyLike\n      }),\n      tasks: createSection('Tasks', {\n        'task-name': testNameLike,\n        documentation: docTag,\n        property: testPropertyLike\n      }),\n      comment: comment\n    }\n    Prism.languages.robot = Prism.languages['robotframework']\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/robotframework.js?");

/***/ })

}]);