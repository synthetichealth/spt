"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_gap"],{

/***/ "./node_modules/refractor/lang/gap.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/gap.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = gap\ngap.displayName = 'gap'\ngap.aliases = []\nfunction gap(Prism) {\n  // https://www.gap-system.org/Manuals/doc/ref/chap4.html\n  // https://www.gap-system.org/Manuals/doc/ref/chap27.html\n  Prism.languages.gap = {\n    shell: {\n      pattern: /^gap>[\\s\\S]*?(?=^gap>|$(?![\\s\\S]))/m,\n      greedy: true,\n      inside: {\n        gap: {\n          pattern: /^(gap>).+(?:(?:\\r(?:\\n|(?!\\n))|\\n)>.*)*/,\n          lookbehind: true,\n          inside: null // see below\n        },\n        punctuation: /^gap>/\n      }\n    },\n    comment: {\n      pattern: /#.*/,\n      greedy: true\n    },\n    string: {\n      pattern:\n        /(^|[^\\\\'\"])(?:'(?:[^\\r\\n\\\\']|\\\\.){1,10}'|\"(?:[^\\r\\n\\\\\"]|\\\\.)*\"(?!\")|\"\"\"[\\s\\S]*?\"\"\")/,\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        continuation: {\n          pattern: /([\\r\\n])>/,\n          lookbehind: true,\n          alias: 'punctuation'\n        }\n      }\n    },\n    keyword:\n      /\\b(?:Assert|Info|IsBound|QUIT|TryNextMethod|Unbind|and|atomic|break|continue|do|elif|else|end|fi|for|function|if|in|local|mod|not|od|or|quit|readonly|readwrite|rec|repeat|return|then|until|while)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n    number: {\n      pattern:\n        /(^|[^\\w.]|\\.\\.)(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?(?:_[a-z]?)?(?=$|[^\\w.]|\\.\\.)/,\n      lookbehind: true\n    },\n    continuation: {\n      pattern: /([\\r\\n])>/,\n      lookbehind: true,\n      alias: 'punctuation'\n    },\n    operator: /->|[-+*/^~=!]|<>|[<>]=?|:=|\\.\\./,\n    punctuation: /[()[\\]{},;.:]/\n  }\n  Prism.languages.gap.shell.inside.gap.inside = Prism.languages.gap\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/gap.js?");

/***/ })

}]);