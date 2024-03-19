"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_racket"],{

/***/ "./node_modules/refractor/lang/racket.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/racket.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorScheme = __webpack_require__(/*! ./scheme.js */ \"./node_modules/refractor/lang/scheme.js\")\nmodule.exports = racket\nracket.displayName = 'racket'\nracket.aliases = ['rkt']\nfunction racket(Prism) {\n  Prism.register(refractorScheme)\n  Prism.languages.racket = Prism.languages.extend('scheme', {\n    'lambda-parameter': {\n      // the racket lambda syntax is a lot more complex, so we won't even attempt to capture it.\n      // this will just prevent false positives of the `function` pattern\n      pattern: /([(\\[]lambda\\s+[(\\[])[^()\\[\\]'\\s]+/,\n      lookbehind: true\n    }\n  })\n  Prism.languages.insertBefore('racket', 'string', {\n    lang: {\n      pattern: /^#lang.+/m,\n      greedy: true,\n      alias: 'keyword'\n    }\n  })\n  Prism.languages.rkt = Prism.languages.racket\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/racket.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/scheme.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/scheme.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = scheme\nscheme.displayName = 'scheme'\nscheme.aliases = []\nfunction scheme(Prism) {\n  ;(function (Prism) {\n    Prism.languages.scheme = {\n      // this supports \"normal\" single-line comments:\n      //   ; comment\n      // and (potentially nested) multiline comments:\n      //   #| comment #| nested |# still comment |#\n      // (only 1 level of nesting is supported)\n      comment:\n        /;.*|#;\\s*(?:\\((?:[^()]|\\([^()]*\\))*\\)|\\[(?:[^\\[\\]]|\\[[^\\[\\]]*\\])*\\])|#\\|(?:[^#|]|#(?!\\|)|\\|(?!#)|#\\|(?:[^#|]|#(?!\\|)|\\|(?!#))*\\|#)*\\|#/,\n      string: {\n        pattern: /\"(?:[^\"\\\\]|\\\\.)*\"/,\n        greedy: true\n      },\n      symbol: {\n        pattern: /'[^()\\[\\]#'\\s]+/,\n        greedy: true\n      },\n      char: {\n        pattern:\n          /#\\\\(?:[ux][a-fA-F\\d]+\\b|[-a-zA-Z]+\\b|[\\uD800-\\uDBFF][\\uDC00-\\uDFFF]|\\S)/,\n        greedy: true\n      },\n      'lambda-parameter': [\n        // https://www.cs.cmu.edu/Groups/AI/html/r4rs/r4rs_6.html#SEC30\n        {\n          pattern:\n            /((?:^|[^'`#])[(\\[]lambda\\s+)(?:[^|()\\[\\]'\\s]+|\\|(?:[^\\\\|]|\\\\.)*\\|)/,\n          lookbehind: true\n        },\n        {\n          pattern: /((?:^|[^'`#])[(\\[]lambda\\s+[(\\[])[^()\\[\\]']+/,\n          lookbehind: true\n        }\n      ],\n      keyword: {\n        pattern:\n          /((?:^|[^'`#])[(\\[])(?:begin|case(?:-lambda)?|cond(?:-expand)?|define(?:-library|-macro|-record-type|-syntax|-values)?|defmacro|delay(?:-force)?|do|else|except|export|guard|if|import|include(?:-ci|-library-declarations)?|lambda|let(?:rec)?(?:-syntax|-values|\\*)?|let\\*-values|only|parameterize|prefix|(?:quasi-?)?quote|rename|set!|syntax-(?:case|rules)|unless|unquote(?:-splicing)?|when)(?=[()\\[\\]\\s]|$)/,\n        lookbehind: true\n      },\n      builtin: {\n        // all functions of the base library of R7RS plus some of built-ins of R5Rs\n        pattern:\n          /((?:^|[^'`#])[(\\[])(?:abs|and|append|apply|assoc|ass[qv]|binary-port\\?|boolean=?\\?|bytevector(?:-append|-copy|-copy!|-length|-u8-ref|-u8-set!|\\?)?|caar|cadr|call-with-(?:current-continuation|port|values)|call\\/cc|car|cdar|cddr|cdr|ceiling|char(?:->integer|-ready\\?|\\?|<\\?|<=\\?|=\\?|>\\?|>=\\?)|close-(?:input-port|output-port|port)|complex\\?|cons|current-(?:error|input|output)-port|denominator|dynamic-wind|eof-object\\??|eq\\?|equal\\?|eqv\\?|error|error-object(?:-irritants|-message|\\?)|eval|even\\?|exact(?:-integer-sqrt|-integer\\?|\\?)?|expt|features|file-error\\?|floor(?:-quotient|-remainder|\\/)?|flush-output-port|for-each|gcd|get-output-(?:bytevector|string)|inexact\\??|input-port(?:-open\\?|\\?)|integer(?:->char|\\?)|lcm|length|list(?:->string|->vector|-copy|-ref|-set!|-tail|\\?)?|make-(?:bytevector|list|parameter|string|vector)|map|max|member|memq|memv|min|modulo|negative\\?|newline|not|null\\?|number(?:->string|\\?)|numerator|odd\\?|open-(?:input|output)-(?:bytevector|string)|or|output-port(?:-open\\?|\\?)|pair\\?|peek-char|peek-u8|port\\?|positive\\?|procedure\\?|quotient|raise|raise-continuable|rational\\?|rationalize|read-(?:bytevector|bytevector!|char|error\\?|line|string|u8)|real\\?|remainder|reverse|round|set-c[ad]r!|square|string(?:->list|->number|->symbol|->utf8|->vector|-append|-copy|-copy!|-fill!|-for-each|-length|-map|-ref|-set!|\\?|<\\?|<=\\?|=\\?|>\\?|>=\\?)?|substring|symbol(?:->string|\\?|=\\?)|syntax-error|textual-port\\?|truncate(?:-quotient|-remainder|\\/)?|u8-ready\\?|utf8->string|values|vector(?:->list|->string|-append|-copy|-copy!|-fill!|-for-each|-length|-map|-ref|-set!|\\?)?|with-exception-handler|write-(?:bytevector|char|string|u8)|zero\\?)(?=[()\\[\\]\\s]|$)/,\n        lookbehind: true\n      },\n      operator: {\n        pattern: /((?:^|[^'`#])[(\\[])(?:[-+*%/]|[<>]=?|=>?)(?=[()\\[\\]\\s]|$)/,\n        lookbehind: true\n      },\n      number: {\n        // The number pattern from [the R7RS spec](https://small.r7rs.org/attachment/r7rs.pdf).\n        //\n        // <number>      := <num 2>|<num 8>|<num 10>|<num 16>\n        // <num R>       := <prefix R><complex R>\n        // <complex R>   := <real R>(?:@<real R>|<imaginary R>)?|<imaginary R>\n        // <imaginary R> := [+-](?:<ureal R>|(?:inf|nan)\\.0)?i\n        // <real R>      := [+-]?<ureal R>|[+-](?:inf|nan)\\.0\n        // <ureal R>     := <uint R>(?:\\/<uint R>)?\n        //                | <decimal R>\n        //\n        // <decimal 10>  := (?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?\n        // <uint R>      := <digit R>+\n        // <prefix R>    := <radix R>(?:#[ei])?|(?:#[ei])?<radix R>\n        // <radix 2>     := #b\n        // <radix 8>     := #o\n        // <radix 10>    := (?:#d)?\n        // <radix 16>    := #x\n        // <digit 2>     := [01]\n        // <digit 8>     := [0-7]\n        // <digit 10>    := \\d\n        // <digit 16>    := [0-9a-f]\n        //\n        // The problem with this grammar is that the resulting regex is way to complex, so we simplify by grouping all\n        // non-decimal bases together. This results in a decimal (dec) and combined binary, octal, and hexadecimal (box)\n        // pattern:\n        pattern: RegExp(\n          SortedBNF({\n            '<ureal dec>':\n              /\\d+(?:\\/\\d+)|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[esfdl][+-]?\\d+)?/.source,\n            '<real dec>': /[+-]?<ureal dec>|[+-](?:inf|nan)\\.0/.source,\n            '<imaginary dec>': /[+-](?:<ureal dec>|(?:inf|nan)\\.0)?i/.source,\n            '<complex dec>':\n              /<real dec>(?:@<real dec>|<imaginary dec>)?|<imaginary dec>/\n                .source,\n            '<num dec>': /(?:#d(?:#[ei])?|#[ei](?:#d)?)?<complex dec>/.source,\n            '<ureal box>': /[0-9a-f]+(?:\\/[0-9a-f]+)?/.source,\n            '<real box>': /[+-]?<ureal box>|[+-](?:inf|nan)\\.0/.source,\n            '<imaginary box>': /[+-](?:<ureal box>|(?:inf|nan)\\.0)?i/.source,\n            '<complex box>':\n              /<real box>(?:@<real box>|<imaginary box>)?|<imaginary box>/\n                .source,\n            '<num box>': /#[box](?:#[ei])?|(?:#[ei])?#[box]<complex box>/\n              .source,\n            '<number>': /(^|[()\\[\\]\\s])(?:<num dec>|<num box>)(?=[()\\[\\]\\s]|$)/\n              .source\n          }),\n          'i'\n        ),\n        lookbehind: true\n      },\n      boolean: {\n        pattern: /(^|[()\\[\\]\\s])#(?:[ft]|false|true)(?=[()\\[\\]\\s]|$)/,\n        lookbehind: true\n      },\n      function: {\n        pattern:\n          /((?:^|[^'`#])[(\\[])(?:[^|()\\[\\]'\\s]+|\\|(?:[^\\\\|]|\\\\.)*\\|)(?=[()\\[\\]\\s]|$)/,\n        lookbehind: true\n      },\n      identifier: {\n        pattern: /(^|[()\\[\\]\\s])\\|(?:[^\\\\|]|\\\\.)*\\|(?=[()\\[\\]\\s]|$)/,\n        lookbehind: true,\n        greedy: true\n      },\n      punctuation: /[()\\[\\]']/\n    }\n    /**\n     * Given a topologically sorted BNF grammar, this will return the RegExp source of last rule of the grammar.\n     *\n     * @param {Record<string, string>} grammar\n     * @returns {string}\n     */\n    function SortedBNF(grammar) {\n      for (var key in grammar) {\n        grammar[key] = grammar[key].replace(/<[\\w\\s]+>/g, function (key) {\n          return '(?:' + grammar[key].trim() + ')'\n        })\n      } // return the last item\n      return grammar[key]\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/scheme.js?");

/***/ })

}]);