"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_solutionFile"],{

/***/ "./node_modules/refractor/lang/solution-file.js":
/*!******************************************************!*\
  !*** ./node_modules/refractor/lang/solution-file.js ***!
  \******************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = solutionFile\nsolutionFile.displayName = 'solutionFile'\nsolutionFile.aliases = []\nfunction solutionFile(Prism) {\n  ;(function (Prism) {\n    var guid = {\n      // https://en.wikipedia.org/wiki/Universally_unique_identifier#Format\n      pattern: /\\{[\\da-f]{8}-[\\da-f]{4}-[\\da-f]{4}-[\\da-f]{4}-[\\da-f]{12}\\}/i,\n      alias: 'constant',\n      inside: {\n        punctuation: /[{}]/\n      }\n    }\n    Prism.languages['solution-file'] = {\n      comment: {\n        pattern: /#.*/,\n        greedy: true\n      },\n      string: {\n        pattern: /\"[^\"\\r\\n]*\"|'[^'\\r\\n]*'/,\n        greedy: true,\n        inside: {\n          guid: guid\n        }\n      },\n      object: {\n        // Foo\n        //   Bar(\"abs\") = 9\n        //   EndBar\n        //   Prop = TRUE\n        // EndFoo\n        pattern:\n          /^([ \\t]*)(?:([A-Z]\\w*)\\b(?=.*(?:\\r\\n?|\\n)(?:\\1[ \\t].*(?:\\r\\n?|\\n))*\\1End\\2(?=[ \\t]*$))|End[A-Z]\\w*(?=[ \\t]*$))/m,\n        lookbehind: true,\n        greedy: true,\n        alias: 'keyword'\n      },\n      property: {\n        pattern: /^([ \\t]*)(?!\\s)[^\\r\\n\"#=()]*[^\\s\"#=()](?=\\s*=)/m,\n        lookbehind: true,\n        inside: {\n          guid: guid\n        }\n      },\n      guid: guid,\n      number: /\\b\\d+(?:\\.\\d+)*\\b/,\n      boolean: /\\b(?:FALSE|TRUE)\\b/,\n      operator: /=/,\n      punctuation: /[(),]/\n    }\n    Prism.languages['sln'] = Prism.languages['solution-file']\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/solution-file.js?");

/***/ })

}]);