"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_velocity"],{

/***/ "./node_modules/refractor/lang/velocity.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/velocity.js ***!
  \*************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = velocity\nvelocity.displayName = 'velocity'\nvelocity.aliases = []\nfunction velocity(Prism) {\n  ;(function (Prism) {\n    Prism.languages.velocity = Prism.languages.extend('markup', {})\n    var velocity = {\n      variable: {\n        pattern:\n          /(^|[^\\\\](?:\\\\\\\\)*)\\$!?(?:[a-z][\\w-]*(?:\\([^)]*\\))?(?:\\.[a-z][\\w-]*(?:\\([^)]*\\))?|\\[[^\\]]+\\])*|\\{[^}]+\\})/i,\n        lookbehind: true,\n        inside: {} // See below\n      },\n      string: {\n        pattern: /\"[^\"]*\"|'[^']*'/,\n        greedy: true\n      },\n      number: /\\b\\d+\\b/,\n      boolean: /\\b(?:false|true)\\b/,\n      operator:\n        /[=!<>]=?|[+*/%-]|&&|\\|\\||\\.\\.|\\b(?:eq|g[et]|l[et]|n(?:e|ot))\\b/,\n      punctuation: /[(){}[\\]:,.]/\n    }\n    velocity.variable.inside = {\n      string: velocity['string'],\n      function: {\n        pattern: /([^\\w-])[a-z][\\w-]*(?=\\()/,\n        lookbehind: true\n      },\n      number: velocity['number'],\n      boolean: velocity['boolean'],\n      punctuation: velocity['punctuation']\n    }\n    Prism.languages.insertBefore('velocity', 'comment', {\n      unparsed: {\n        pattern: /(^|[^\\\\])#\\[\\[[\\s\\S]*?\\]\\]#/,\n        lookbehind: true,\n        greedy: true,\n        inside: {\n          punctuation: /^#\\[\\[|\\]\\]#$/\n        }\n      },\n      'velocity-comment': [\n        {\n          pattern: /(^|[^\\\\])#\\*[\\s\\S]*?\\*#/,\n          lookbehind: true,\n          greedy: true,\n          alias: 'comment'\n        },\n        {\n          pattern: /(^|[^\\\\])##.*/,\n          lookbehind: true,\n          greedy: true,\n          alias: 'comment'\n        }\n      ],\n      directive: {\n        pattern:\n          /(^|[^\\\\](?:\\\\\\\\)*)#@?(?:[a-z][\\w-]*|\\{[a-z][\\w-]*\\})(?:\\s*\\((?:[^()]|\\([^()]*\\))*\\))?/i,\n        lookbehind: true,\n        inside: {\n          keyword: {\n            pattern: /^#@?(?:[a-z][\\w-]*|\\{[a-z][\\w-]*\\})|\\bin\\b/,\n            inside: {\n              punctuation: /[{}]/\n            }\n          },\n          rest: velocity\n        }\n      },\n      variable: velocity['variable']\n    })\n    Prism.languages.velocity['tag'].inside['attr-value'].inside.rest =\n      Prism.languages.velocity\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/velocity.js?");

/***/ })

}]);