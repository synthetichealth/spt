"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_fsharp"],{

/***/ "./node_modules/refractor/lang/fsharp.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/fsharp.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = fsharp\nfsharp.displayName = 'fsharp'\nfsharp.aliases = []\nfunction fsharp(Prism) {\n  Prism.languages.fsharp = Prism.languages.extend('clike', {\n    comment: [\n      {\n        pattern: /(^|[^\\\\])\\(\\*(?!\\))[\\s\\S]*?\\*\\)/,\n        lookbehind: true,\n        greedy: true\n      },\n      {\n        pattern: /(^|[^\\\\:])\\/\\/.*/,\n        lookbehind: true,\n        greedy: true\n      }\n    ],\n    string: {\n      pattern: /(?:\"\"\"[\\s\\S]*?\"\"\"|@\"(?:\"\"|[^\"])*\"|\"(?:\\\\[\\s\\S]|[^\\\\\"])*\")B?/,\n      greedy: true\n    },\n    'class-name': {\n      pattern:\n        /(\\b(?:exception|inherit|interface|new|of|type)\\s+|\\w\\s*:\\s*|\\s:\\??>\\s*)[.\\w]+\\b(?:\\s*(?:->|\\*)\\s*[.\\w]+\\b)*(?!\\s*[:.])/,\n      lookbehind: true,\n      inside: {\n        operator: /->|\\*/,\n        punctuation: /\\./\n      }\n    },\n    keyword:\n      /\\b(?:let|return|use|yield)(?:!\\B|\\b)|\\b(?:abstract|and|as|asr|assert|atomic|base|begin|break|checked|class|component|const|constraint|constructor|continue|default|delegate|do|done|downcast|downto|eager|elif|else|end|event|exception|extern|external|false|finally|fixed|for|fun|function|functor|global|if|in|include|inherit|inline|interface|internal|land|lazy|lor|lsl|lsr|lxor|match|member|method|mixin|mod|module|mutable|namespace|new|not|null|object|of|open|or|override|parallel|private|process|protected|public|pure|rec|sealed|select|sig|static|struct|tailcall|then|to|trait|true|try|type|upcast|val|virtual|void|volatile|when|while|with)\\b/,\n    number: [\n      /\\b0x[\\da-fA-F]+(?:LF|lf|un)?\\b/,\n      /\\b0b[01]+(?:uy|y)?\\b/,\n      /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:[fm]|e[+-]?\\d+)?\\b/i,\n      /\\b\\d+(?:[IlLsy]|UL|u[lsy]?)?\\b/\n    ],\n    operator:\n      /([<>~&^])\\1\\1|([*.:<>&])\\2|<-|->|[!=:]=|<?\\|{1,3}>?|\\??(?:<=|>=|<>|[-+*/%=<>])\\??|[!?^&]|~[+~-]|:>|:\\?>?/\n  })\n  Prism.languages.insertBefore('fsharp', 'keyword', {\n    preprocessor: {\n      pattern: /(^[\\t ]*)#.*/m,\n      lookbehind: true,\n      alias: 'property',\n      inside: {\n        directive: {\n          pattern: /(^#)\\b(?:else|endif|if|light|line|nowarn)\\b/,\n          lookbehind: true,\n          alias: 'keyword'\n        }\n      }\n    }\n  })\n  Prism.languages.insertBefore('fsharp', 'punctuation', {\n    'computation-expression': {\n      pattern: /\\b[_a-z]\\w*(?=\\s*\\{)/i,\n      alias: 'keyword'\n    }\n  })\n  Prism.languages.insertBefore('fsharp', 'string', {\n    annotation: {\n      pattern: /\\[<.+?>\\]/,\n      greedy: true,\n      inside: {\n        punctuation: /^\\[<|>\\]$/,\n        'class-name': {\n          pattern: /^\\w+$|(^|;\\s*)[A-Z]\\w*(?=\\()/,\n          lookbehind: true\n        },\n        'annotation-content': {\n          pattern: /[\\s\\S]+/,\n          inside: Prism.languages.fsharp\n        }\n      }\n    },\n    char: {\n      pattern:\n        /'(?:[^\\\\']|\\\\(?:.|\\d{3}|x[a-fA-F\\d]{2}|u[a-fA-F\\d]{4}|U[a-fA-F\\d]{8}))'B?/,\n      greedy: true\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/fsharp.js?");

/***/ })

}]);