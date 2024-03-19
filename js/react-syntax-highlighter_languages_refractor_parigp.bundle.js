"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_parigp"],{

/***/ "./node_modules/refractor/lang/parigp.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/parigp.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = parigp\nparigp.displayName = 'parigp'\nparigp.aliases = []\nfunction parigp(Prism) {\n  Prism.languages.parigp = {\n    comment: /\\/\\*[\\s\\S]*?\\*\\/|\\\\\\\\.*/,\n    string: {\n      pattern: /\"(?:[^\"\\\\\\r\\n]|\\\\.)*\"/,\n      greedy: true\n    },\n    // PARI/GP does not care about white spaces at all\n    // so let's process the keywords to build an appropriate regexp\n    // (e.g. \"b *r *e *a *k\", etc.)\n    keyword: (function () {\n      var keywords = [\n        'breakpoint',\n        'break',\n        'dbg_down',\n        'dbg_err',\n        'dbg_up',\n        'dbg_x',\n        'forcomposite',\n        'fordiv',\n        'forell',\n        'forpart',\n        'forprime',\n        'forstep',\n        'forsubgroup',\n        'forvec',\n        'for',\n        'iferr',\n        'if',\n        'local',\n        'my',\n        'next',\n        'return',\n        'until',\n        'while'\n      ]\n      keywords = keywords\n        .map(function (keyword) {\n          return keyword.split('').join(' *')\n        })\n        .join('|')\n      return RegExp('\\\\b(?:' + keywords + ')\\\\b')\n    })(),\n    function: /\\b\\w(?:[\\w ]*\\w)?(?= *\\()/,\n    number: {\n      // The lookbehind and the negative lookahead prevent from breaking the .. operator\n      pattern:\n        /((?:\\. *\\. *)?)(?:\\b\\d(?: *\\d)*(?: *(?!\\. *\\.)\\.(?: *\\d)*)?|\\. *\\d(?: *\\d)*)(?: *e *(?:[+-] *)?\\d(?: *\\d)*)?/i,\n      lookbehind: true\n    },\n    operator:\n      /\\. *\\.|[*\\/!](?: *=)?|%(?: *=|(?: *#)?(?: *')*)?|\\+(?: *[+=])?|-(?: *[-=>])?|<(?: *>|(?: *<)?(?: *=)?)?|>(?: *>)?(?: *=)?|=(?: *=){0,2}|\\\\(?: *\\/)?(?: *=)?|&(?: *&)?|\\| *\\||['#~^]/,\n    punctuation: /[\\[\\]{}().,:;|]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/parigp.js?");

/***/ })

}]);