"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_diff"],{

/***/ "./node_modules/refractor/lang/diff.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/diff.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = diff\ndiff.displayName = 'diff'\ndiff.aliases = []\nfunction diff(Prism) {\n  ;(function (Prism) {\n    Prism.languages.diff = {\n      coord: [\n        // Match all kinds of coord lines (prefixed by \"+++\", \"---\" or \"***\").\n        /^(?:\\*{3}|-{3}|\\+{3}).*$/m, // Match \"@@ ... @@\" coord lines in unified diff.\n        /^@@.*@@$/m, // Match coord lines in normal diff (starts with a number).\n        /^\\d.*$/m\n      ] // deleted, inserted, unchanged, diff\n    }\n    /**\n     * A map from the name of a block to its line prefix.\n     *\n     * @type {Object<string, string>}\n     */\n    var PREFIXES = {\n      'deleted-sign': '-',\n      'deleted-arrow': '<',\n      'inserted-sign': '+',\n      'inserted-arrow': '>',\n      unchanged: ' ',\n      diff: '!'\n    } // add a token for each prefix\n    Object.keys(PREFIXES).forEach(function (name) {\n      var prefix = PREFIXES[name]\n      var alias = []\n      if (!/^\\w+$/.test(name)) {\n        // \"deleted-sign\" -> \"deleted\"\n        alias.push(/\\w+/.exec(name)[0])\n      }\n      if (name === 'diff') {\n        alias.push('bold')\n      }\n      Prism.languages.diff[name] = {\n        pattern: RegExp(\n          '^(?:[' + prefix + '].*(?:\\r\\n?|\\n|(?![\\\\s\\\\S])))+',\n          'm'\n        ),\n        alias: alias,\n        inside: {\n          line: {\n            pattern: /(.)(?=[\\s\\S]).*(?:\\r\\n?|\\n)?/,\n            lookbehind: true\n          },\n          prefix: {\n            pattern: /[\\s\\S]/,\n            alias: /\\w+/.exec(name)[0]\n          }\n        }\n      }\n    }) // make prefixes available to Diff plugin\n    Object.defineProperty(Prism.languages.diff, 'PREFIXES', {\n      value: PREFIXES\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/diff.js?");

/***/ })

}]);