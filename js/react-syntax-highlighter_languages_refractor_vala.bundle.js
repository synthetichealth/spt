"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_vala"],{

/***/ "./node_modules/refractor/lang/vala.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/vala.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = vala\nvala.displayName = 'vala'\nvala.aliases = []\nfunction vala(Prism) {\n  Prism.languages.vala = Prism.languages.extend('clike', {\n    // Classes copied from prism-csharp\n    'class-name': [\n      {\n        // (Foo bar, Bar baz)\n        pattern: /\\b[A-Z]\\w*(?:\\.\\w+)*\\b(?=(?:\\?\\s+|\\*?\\s+\\*?)\\w)/,\n        inside: {\n          punctuation: /\\./\n        }\n      },\n      {\n        // [Foo]\n        pattern: /(\\[)[A-Z]\\w*(?:\\.\\w+)*\\b/,\n        lookbehind: true,\n        inside: {\n          punctuation: /\\./\n        }\n      },\n      {\n        // class Foo : Bar\n        pattern:\n          /(\\b(?:class|interface)\\s+[A-Z]\\w*(?:\\.\\w+)*\\s*:\\s*)[A-Z]\\w*(?:\\.\\w+)*\\b/,\n        lookbehind: true,\n        inside: {\n          punctuation: /\\./\n        }\n      },\n      {\n        // class Foo\n        pattern:\n          /((?:\\b(?:class|enum|interface|new|struct)\\s+)|(?:catch\\s+\\())[A-Z]\\w*(?:\\.\\w+)*\\b/,\n        lookbehind: true,\n        inside: {\n          punctuation: /\\./\n        }\n      }\n    ],\n    keyword:\n      /\\b(?:abstract|as|assert|async|base|bool|break|case|catch|char|class|const|construct|continue|default|delegate|delete|do|double|dynamic|else|ensures|enum|errordomain|extern|finally|float|for|foreach|get|if|in|inline|int|int16|int32|int64|int8|interface|internal|is|lock|long|namespace|new|null|out|override|owned|params|private|protected|public|ref|requires|return|set|short|signal|sizeof|size_t|ssize_t|static|string|struct|switch|this|throw|throws|try|typeof|uchar|uint|uint16|uint32|uint64|uint8|ulong|unichar|unowned|ushort|using|value|var|virtual|void|volatile|weak|while|yield)\\b/i,\n    function: /\\b\\w+(?=\\s*\\()/,\n    number:\n      /(?:\\b0x[\\da-f]+\\b|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?)(?:f|u?l?)?/i,\n    operator:\n      /\\+\\+|--|&&|\\|\\||<<=?|>>=?|=>|->|~|[+\\-*\\/%&^|=!<>]=?|\\?\\??|\\.\\.\\./,\n    punctuation: /[{}[\\];(),.:]/,\n    constant: /\\b[A-Z0-9_]+\\b/\n  })\n  Prism.languages.insertBefore('vala', 'string', {\n    'raw-string': {\n      pattern: /\"\"\"[\\s\\S]*?\"\"\"/,\n      greedy: true,\n      alias: 'string'\n    },\n    'template-string': {\n      pattern: /@\"[\\s\\S]*?\"/,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern: /\\$(?:\\([^)]*\\)|[a-zA-Z]\\w*)/,\n          inside: {\n            delimiter: {\n              pattern: /^\\$\\(?|\\)$/,\n              alias: 'punctuation'\n            },\n            rest: Prism.languages.vala\n          }\n        },\n        string: /[\\s\\S]+/\n      }\n    }\n  })\n  Prism.languages.insertBefore('vala', 'keyword', {\n    regex: {\n      pattern:\n        /\\/(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[imsx]{0,4}(?=\\s*(?:$|[\\r\\n,.;})\\]]))/,\n      greedy: true,\n      inside: {\n        'regex-source': {\n          pattern: /^(\\/)[\\s\\S]+(?=\\/[a-z]*$)/,\n          lookbehind: true,\n          alias: 'language-regex',\n          inside: Prism.languages.regex\n        },\n        'regex-delimiter': /^\\//,\n        'regex-flags': /^[a-z]+$/\n      }\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/vala.js?");

/***/ })

}]);