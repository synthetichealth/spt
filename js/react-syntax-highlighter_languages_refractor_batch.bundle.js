"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_batch"],{

/***/ "./node_modules/refractor/lang/batch.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/batch.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = batch\nbatch.displayName = 'batch'\nbatch.aliases = []\nfunction batch(Prism) {\n  ;(function (Prism) {\n    var variable = /%%?[~:\\w]+%?|!\\S+!/\n    var parameter = {\n      pattern: /\\/[a-z?]+(?=[ :]|$):?|-[a-z]\\b|--[a-z-]+\\b/im,\n      alias: 'attr-name',\n      inside: {\n        punctuation: /:/\n      }\n    }\n    var string = /\"(?:[\\\\\"]\"|[^\"])*\"(?!\")/\n    var number = /(?:\\b|-)\\d+\\b/\n    Prism.languages.batch = {\n      comment: [\n        /^::.*/m,\n        {\n          pattern: /((?:^|[&(])[ \\t]*)rem\\b(?:[^^&)\\r\\n]|\\^(?:\\r\\n|[\\s\\S]))*/im,\n          lookbehind: true\n        }\n      ],\n      label: {\n        pattern: /^:.*/m,\n        alias: 'property'\n      },\n      command: [\n        {\n          // FOR command\n          pattern:\n            /((?:^|[&(])[ \\t]*)for(?: \\/[a-z?](?:[ :](?:\"[^\"]*\"|[^\\s\"/]\\S*))?)* \\S+ in \\([^)]+\\) do/im,\n          lookbehind: true,\n          inside: {\n            keyword: /\\b(?:do|in)\\b|^for\\b/i,\n            string: string,\n            parameter: parameter,\n            variable: variable,\n            number: number,\n            punctuation: /[()',]/\n          }\n        },\n        {\n          // IF command\n          pattern:\n            /((?:^|[&(])[ \\t]*)if(?: \\/[a-z?](?:[ :](?:\"[^\"]*\"|[^\\s\"/]\\S*))?)* (?:not )?(?:cmdextversion \\d+|defined \\w+|errorlevel \\d+|exist \\S+|(?:\"[^\"]*\"|(?!\")(?:(?!==)\\S)+)?(?:==| (?:equ|geq|gtr|leq|lss|neq) )(?:\"[^\"]*\"|[^\\s\"]\\S*))/im,\n          lookbehind: true,\n          inside: {\n            keyword:\n              /\\b(?:cmdextversion|defined|errorlevel|exist|not)\\b|^if\\b/i,\n            string: string,\n            parameter: parameter,\n            variable: variable,\n            number: number,\n            operator: /\\^|==|\\b(?:equ|geq|gtr|leq|lss|neq)\\b/i\n          }\n        },\n        {\n          // ELSE command\n          pattern: /((?:^|[&()])[ \\t]*)else\\b/im,\n          lookbehind: true,\n          inside: {\n            keyword: /^else\\b/i\n          }\n        },\n        {\n          // SET command\n          pattern:\n            /((?:^|[&(])[ \\t]*)set(?: \\/[a-z](?:[ :](?:\"[^\"]*\"|[^\\s\"/]\\S*))?)* (?:[^^&)\\r\\n]|\\^(?:\\r\\n|[\\s\\S]))*/im,\n          lookbehind: true,\n          inside: {\n            keyword: /^set\\b/i,\n            string: string,\n            parameter: parameter,\n            variable: [variable, /\\w+(?=(?:[*\\/%+\\-&^|]|<<|>>)?=)/],\n            number: number,\n            operator: /[*\\/%+\\-&^|]=?|<<=?|>>=?|[!~_=]/,\n            punctuation: /[()',]/\n          }\n        },\n        {\n          // Other commands\n          pattern:\n            /((?:^|[&(])[ \\t]*@?)\\w+\\b(?:\"(?:[\\\\\"]\"|[^\"])*\"(?!\")|[^\"^&)\\r\\n]|\\^(?:\\r\\n|[\\s\\S]))*/m,\n          lookbehind: true,\n          inside: {\n            keyword: /^\\w+\\b/,\n            string: string,\n            parameter: parameter,\n            label: {\n              pattern: /(^\\s*):\\S+/m,\n              lookbehind: true,\n              alias: 'property'\n            },\n            variable: variable,\n            number: number,\n            operator: /\\^/\n          }\n        }\n      ],\n      operator: /[&@]/,\n      punctuation: /[()']/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/batch.js?");

/***/ })

}]);