"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_ocaml"],{

/***/ "./node_modules/refractor/lang/ocaml.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/ocaml.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = ocaml\nocaml.displayName = 'ocaml'\nocaml.aliases = []\nfunction ocaml(Prism) {\n  // https://ocaml.org/manual/lex.html\n  Prism.languages.ocaml = {\n    comment: {\n      pattern: /\\(\\*[\\s\\S]*?\\*\\)/,\n      greedy: true\n    },\n    char: {\n      pattern: /'(?:[^\\\\\\r\\n']|\\\\(?:.|[ox]?[0-9a-f]{1,3}))'/i,\n      greedy: true\n    },\n    string: [\n      {\n        pattern: /\"(?:\\\\(?:[\\s\\S]|\\r\\n)|[^\\\\\\r\\n\"])*\"/,\n        greedy: true\n      },\n      {\n        pattern: /\\{([a-z_]*)\\|[\\s\\S]*?\\|\\1\\}/,\n        greedy: true\n      }\n    ],\n    number: [\n      // binary and octal\n      /\\b(?:0b[01][01_]*|0o[0-7][0-7_]*)\\b/i, // hexadecimal\n      /\\b0x[a-f0-9][a-f0-9_]*(?:\\.[a-f0-9_]*)?(?:p[+-]?\\d[\\d_]*)?(?!\\w)/i, // decimal\n      /\\b\\d[\\d_]*(?:\\.[\\d_]*)?(?:e[+-]?\\d[\\d_]*)?(?!\\w)/i\n    ],\n    directive: {\n      pattern: /\\B#\\w+/,\n      alias: 'property'\n    },\n    label: {\n      pattern: /\\B~\\w+/,\n      alias: 'property'\n    },\n    'type-variable': {\n      pattern: /\\B'\\w+/,\n      alias: 'function'\n    },\n    variant: {\n      pattern: /`\\w+/,\n      alias: 'symbol'\n    },\n    // For the list of keywords and operators,\n    // see: http://caml.inria.fr/pub/docs/manual-ocaml/lex.html#sec84\n    keyword:\n      /\\b(?:as|assert|begin|class|constraint|do|done|downto|else|end|exception|external|for|fun|function|functor|if|in|include|inherit|initializer|lazy|let|match|method|module|mutable|new|nonrec|object|of|open|private|rec|sig|struct|then|to|try|type|val|value|virtual|when|where|while|with)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    'operator-like-punctuation': {\n      pattern: /\\[[<>|]|[>|]\\]|\\{<|>\\}/,\n      alias: 'punctuation'\n    },\n    // Custom operators are allowed\n    operator:\n      /\\.[.~]|:[=>]|[=<>@^|&+\\-*\\/$%!?~][!$%&*+\\-.\\/:<=>?@^|~]*|\\b(?:and|asr|land|lor|lsl|lsr|lxor|mod|or)\\b/,\n    punctuation: /;;|::|[(){}\\[\\].,:;#]|\\b_\\b/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/ocaml.js?");

/***/ })

}]);