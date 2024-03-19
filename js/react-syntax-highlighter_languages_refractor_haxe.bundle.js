"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_haxe"],{

/***/ "./node_modules/refractor/lang/haxe.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/haxe.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = haxe\nhaxe.displayName = 'haxe'\nhaxe.aliases = []\nfunction haxe(Prism) {\n  Prism.languages.haxe = Prism.languages.extend('clike', {\n    string: {\n      // Strings can be multi-line\n      pattern: /\"(?:[^\"\\\\]|\\\\[\\s\\S])*\"/,\n      greedy: true\n    },\n    'class-name': [\n      {\n        pattern:\n          /(\\b(?:abstract|class|enum|extends|implements|interface|new|typedef)\\s+)[A-Z_]\\w*/,\n        lookbehind: true\n      }, // based on naming convention\n      /\\b[A-Z]\\w*/\n    ],\n    // The final look-ahead prevents highlighting of keywords if expressions such as \"haxe.macro.Expr\"\n    keyword:\n      /\\bthis\\b|\\b(?:abstract|as|break|case|cast|catch|class|continue|default|do|dynamic|else|enum|extends|extern|final|for|from|function|if|implements|import|in|inline|interface|macro|new|null|operator|overload|override|package|private|public|return|static|super|switch|throw|to|try|typedef|untyped|using|var|while)(?!\\.)\\b/,\n    function: {\n      pattern: /\\b[a-z_]\\w*(?=\\s*(?:<[^<>]*>\\s*)?\\()/i,\n      greedy: true\n    },\n    operator: /\\.{3}|\\+\\+|--|&&|\\|\\||->|=>|(?:<<?|>{1,3}|[-+*/%!=&|^])=?|[?:~]/\n  })\n  Prism.languages.insertBefore('haxe', 'string', {\n    'string-interpolation': {\n      pattern: /'(?:[^'\\\\]|\\\\[\\s\\S])*'/,\n      greedy: true,\n      inside: {\n        interpolation: {\n          pattern: /(^|[^\\\\])\\$(?:\\w+|\\{[^{}]+\\})/,\n          lookbehind: true,\n          inside: {\n            'interpolation-punctuation': {\n              pattern: /^\\$\\{?|\\}$/,\n              alias: 'punctuation'\n            },\n            expression: {\n              pattern: /[\\s\\S]+/,\n              inside: Prism.languages.haxe\n            }\n          }\n        },\n        string: /[\\s\\S]+/\n      }\n    }\n  })\n  Prism.languages.insertBefore('haxe', 'class-name', {\n    regex: {\n      pattern: /~\\/(?:[^\\/\\\\\\r\\n]|\\\\.)+\\/[a-z]*/,\n      greedy: true,\n      inside: {\n        'regex-flags': /\\b[a-z]+$/,\n        'regex-source': {\n          pattern: /^(~\\/)[\\s\\S]+(?=\\/$)/,\n          lookbehind: true,\n          alias: 'language-regex',\n          inside: Prism.languages.regex\n        },\n        'regex-delimiter': /^~\\/|\\/$/\n      }\n    }\n  })\n  Prism.languages.insertBefore('haxe', 'keyword', {\n    preprocessor: {\n      pattern: /#(?:else|elseif|end|if)\\b.*/,\n      alias: 'property'\n    },\n    metadata: {\n      pattern: /@:?[\\w.]+/,\n      alias: 'symbol'\n    },\n    reification: {\n      pattern: /\\$(?:\\w+|(?=\\{))/,\n      alias: 'important'\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/haxe.js?");

/***/ })

}]);