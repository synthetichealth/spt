"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_typescript"],{

/***/ "./node_modules/refractor/lang/typescript.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/typescript.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = typescript\ntypescript.displayName = 'typescript'\ntypescript.aliases = ['ts']\nfunction typescript(Prism) {\n  ;(function (Prism) {\n    Prism.languages.typescript = Prism.languages.extend('javascript', {\n      'class-name': {\n        pattern:\n          /(\\b(?:class|extends|implements|instanceof|interface|new|type)\\s+)(?!keyof\\b)(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*(?:\\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,\n        lookbehind: true,\n        greedy: true,\n        inside: null // see below\n      },\n      builtin:\n        /\\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\\b/\n    }) // The keywords TypeScript adds to JavaScript\n    Prism.languages.typescript.keyword.push(\n      /\\b(?:abstract|declare|is|keyof|readonly|require)\\b/, // keywords that have to be followed by an identifier\n      /\\b(?:asserts|infer|interface|module|namespace|type)\\b(?=\\s*(?:[{_$a-zA-Z\\xA0-\\uFFFF]|$))/, // This is for `import type *, {}`\n      /\\btype\\b(?=\\s*(?:[\\{*]|$))/\n    ) // doesn't work with TS because TS is too complex\n    delete Prism.languages.typescript['parameter']\n    delete Prism.languages.typescript['literal-property'] // a version of typescript specifically for highlighting types\n    var typeInside = Prism.languages.extend('typescript', {})\n    delete typeInside['class-name']\n    Prism.languages.typescript['class-name'].inside = typeInside\n    Prism.languages.insertBefore('typescript', 'function', {\n      decorator: {\n        pattern: /@[$\\w\\xA0-\\uFFFF]+/,\n        inside: {\n          at: {\n            pattern: /^@/,\n            alias: 'operator'\n          },\n          function: /^[\\s\\S]+/\n        }\n      },\n      'generic-function': {\n        // e.g. foo<T extends \"bar\" | \"baz\">( ...\n        pattern:\n          /#?(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*\\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\\s*\\()/,\n        greedy: true,\n        inside: {\n          function: /^#?(?!\\s)[_$a-zA-Z\\xA0-\\uFFFF](?:(?!\\s)[$\\w\\xA0-\\uFFFF])*/,\n          generic: {\n            pattern: /<[\\s\\S]+/,\n            // everything after the first <\n            alias: 'class-name',\n            inside: typeInside\n          }\n        }\n      }\n    })\n    Prism.languages.ts = Prism.languages.typescript\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/typescript.js?");

/***/ })

}]);