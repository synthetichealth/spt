"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_v"],{

/***/ "./node_modules/refractor/lang/v.js":
/*!******************************************!*\
  !*** ./node_modules/refractor/lang/v.js ***!
  \******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = v\nv.displayName = 'v'\nv.aliases = []\nfunction v(Prism) {\n  ;(function (Prism) {\n    var interpolationExpr = {\n      pattern: /[\\s\\S]+/,\n      inside: null\n    }\n    Prism.languages.v = Prism.languages.extend('clike', {\n      string: {\n        pattern: /r?([\"'])(?:\\\\(?:\\r\\n|[\\s\\S])|(?!\\1)[^\\\\\\r\\n])*\\1/,\n        alias: 'quoted-string',\n        greedy: true,\n        inside: {\n          interpolation: {\n            pattern:\n              /((?:^|[^\\\\])(?:\\\\{2})*)\\$(?:\\{[^{}]*\\}|\\w+(?:\\.\\w+(?:\\([^\\(\\)]*\\))?|\\[[^\\[\\]]+\\])*)/,\n            lookbehind: true,\n            inside: {\n              'interpolation-variable': {\n                pattern: /^\\$\\w[\\s\\S]*$/,\n                alias: 'variable'\n              },\n              'interpolation-punctuation': {\n                pattern: /^\\$\\{|\\}$/,\n                alias: 'punctuation'\n              },\n              'interpolation-expression': interpolationExpr\n            }\n          }\n        }\n      },\n      'class-name': {\n        pattern: /(\\b(?:enum|interface|struct|type)\\s+)(?:C\\.)?\\w+/,\n        lookbehind: true\n      },\n      keyword:\n        /(?:\\b(?:__global|as|asm|assert|atomic|break|chan|const|continue|defer|else|embed|enum|fn|for|go(?:to)?|if|import|in|interface|is|lock|match|module|mut|none|or|pub|return|rlock|select|shared|sizeof|static|struct|type(?:of)?|union|unsafe)|\\$(?:else|for|if)|#(?:flag|include))\\b/,\n      number:\n        /\\b(?:0x[a-f\\d]+(?:_[a-f\\d]+)*|0b[01]+(?:_[01]+)*|0o[0-7]+(?:_[0-7]+)*|\\d+(?:_\\d+)*(?:\\.\\d+(?:_\\d+)*)?)\\b/i,\n      operator:\n        /~|\\?|[*\\/%^!=]=?|\\+[=+]?|-[=-]?|\\|[=|]?|&(?:=|&|\\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\\.\\.\\.?/,\n      builtin:\n        /\\b(?:any(?:_float|_int)?|bool|byte(?:ptr)?|charptr|f(?:32|64)|i(?:8|16|64|128|nt)|rune|size_t|string|u(?:16|32|64|128)|voidptr)\\b/\n    })\n    interpolationExpr.inside = Prism.languages.v\n    Prism.languages.insertBefore('v', 'string', {\n      char: {\n        pattern: /`(?:\\\\`|\\\\?[^`]{1,2})`/,\n        // using {1,2} instead of `u` flag for compatibility\n        alias: 'rune'\n      }\n    })\n    Prism.languages.insertBefore('v', 'operator', {\n      attribute: {\n        pattern:\n          /(^[\\t ]*)\\[(?:deprecated|direct_array_access|flag|inline|live|ref_only|typedef|unsafe_fn|windows_stdcall)\\]/m,\n        lookbehind: true,\n        alias: 'annotation',\n        inside: {\n          punctuation: /[\\[\\]]/,\n          keyword: /\\w+/\n        }\n      },\n      generic: {\n        pattern: /<\\w+>(?=\\s*[\\)\\{])/,\n        inside: {\n          punctuation: /[<>]/,\n          'class-name': /\\w+/\n        }\n      }\n    })\n    Prism.languages.insertBefore('v', 'function', {\n      'generic-function': {\n        // e.g. foo<T>( ...\n        pattern: /\\b\\w+\\s*<\\w+>(?=\\()/,\n        inside: {\n          function: /^\\w+/,\n          generic: {\n            pattern: /<\\w+>/,\n            inside: Prism.languages.v.generic.inside\n          }\n        }\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/v.js?");

/***/ })

}]);