"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_factor"],{

/***/ "./node_modules/refractor/lang/factor.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/factor.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = factor\nfactor.displayName = 'factor'\nfactor.aliases = []\nfunction factor(Prism) {\n  ;(function (Prism) {\n    var comment_inside = {\n      function:\n        /\\b(?:BUGS?|FIX(?:MES?)?|NOTES?|TODOS?|XX+|HACKS?|WARN(?:ING)?|\\?{2,}|!{2,})\\b/\n    }\n    var string_inside = {\n      number: /\\\\[^\\s']|%\\w/\n    }\n    var factor = {\n      comment: [\n        {\n          // ! single-line exclamation point comments with whitespace after/around the !\n          pattern: /(^|\\s)(?:! .*|!$)/,\n          lookbehind: true,\n          inside: comment_inside\n        },\n        /* from basis/multiline: */\n        {\n          // /* comment */, /* comment*/\n          pattern: /(^|\\s)\\/\\*\\s[\\s\\S]*?\\*\\/(?=\\s|$)/,\n          lookbehind: true,\n          greedy: true,\n          inside: comment_inside\n        },\n        {\n          // ![[ comment ]] , ![===[ comment]===]\n          pattern: /(^|\\s)!\\[(={0,6})\\[\\s[\\s\\S]*?\\]\\2\\](?=\\s|$)/,\n          lookbehind: true,\n          greedy: true,\n          inside: comment_inside\n        }\n      ],\n      number: [\n        {\n          // basic base 10 integers 9, -9\n          pattern: /(^|\\s)[+-]?\\d+(?=\\s|$)/,\n          lookbehind: true\n        },\n        {\n          // base prefix integers 0b010 0o70 0xad 0d10 0XAD -0xa9\n          pattern: /(^|\\s)[+-]?0(?:b[01]+|o[0-7]+|d\\d+|x[\\dA-F]+)(?=\\s|$)/i,\n          lookbehind: true\n        },\n        {\n          // fractional ratios 1/5 -1/5 and the literal float approximations 1/5. -1/5.\n          pattern: /(^|\\s)[+-]?\\d+\\/\\d+\\.?(?=\\s|$)/,\n          lookbehind: true\n        },\n        {\n          // positive mixed numbers 23+1/5 +23+1/5\n          pattern: /(^|\\s)\\+?\\d+\\+\\d+\\/\\d+(?=\\s|$)/,\n          lookbehind: true\n        },\n        {\n          // negative mixed numbers -23-1/5\n          pattern: /(^|\\s)-\\d+-\\d+\\/\\d+(?=\\s|$)/,\n          lookbehind: true\n        },\n        {\n          // basic decimal floats -0.01 0. .0 .1 -.1 -1. -12.13 +12.13\n          // and scientific notation with base 10 exponents 3e4 3e-4 .3e-4\n          pattern:\n            /(^|\\s)[+-]?(?:\\d*\\.\\d+|\\d+\\.\\d*|\\d+)(?:e[+-]?\\d+)?(?=\\s|$)/i,\n          lookbehind: true\n        },\n        {\n          // NAN literal syntax NAN: 80000deadbeef, NAN: a\n          pattern: /(^|\\s)NAN:\\s+[\\da-fA-F]+(?=\\s|$)/,\n          lookbehind: true\n        },\n        {\n          /*\nbase prefix floats 0x1.0p3 (8.0) 0b1.010p2 (5.0) 0x1.p1 0b1.11111111p11111...\n\"The normalized hex form ±0x1.MMMMMMMMMMMMM[pP]±EEEE allows any floating-point number to be specified precisely.\nThe values of MMMMMMMMMMMMM and EEEE map directly to the mantissa and exponent fields of the binary IEEE 754 representation.\"\n<https://docs.factorcode.org/content/article-syntax-floats.html>\n*/\n          pattern:\n            /(^|\\s)[+-]?0(?:b1\\.[01]*|o1\\.[0-7]*|d1\\.\\d*|x1\\.[\\dA-F]*)p\\d+(?=\\s|$)/i,\n          lookbehind: true\n        }\n      ],\n      // R/ regexp?\\/\\\\/\n      regexp: {\n        pattern:\n          /(^|\\s)R\\/\\s(?:\\\\\\S|[^\\\\/])*\\/(?:[idmsr]*|[idmsr]+-[idmsr]+)(?=\\s|$)/,\n        lookbehind: true,\n        alias: 'number',\n        inside: {\n          variable: /\\\\\\S/,\n          keyword: /[+?*\\[\\]^$(){}.|]/,\n          operator: {\n            pattern: /(\\/)[idmsr]+(?:-[idmsr]+)?/,\n            lookbehind: true\n          }\n        }\n      },\n      boolean: {\n        pattern: /(^|\\s)[tf](?=\\s|$)/,\n        lookbehind: true\n      },\n      // SBUF\" asd\", URL\" ://...\", P\" /etc/\"\n      'custom-string': {\n        pattern: /(^|\\s)[A-Z0-9\\-]+\"\\s(?:\\\\\\S|[^\"\\\\])*\"/,\n        lookbehind: true,\n        greedy: true,\n        alias: 'string',\n        inside: {\n          number: /\\\\\\S|%\\w|\\//\n        }\n      },\n      'multiline-string': [\n        {\n          // STRING: name \\n content \\n ; -> CONSTANT: name \"content\" (symbol)\n          pattern: /(^|\\s)STRING:\\s+\\S+(?:\\n|\\r\\n).*(?:\\n|\\r\\n)\\s*;(?=\\s|$)/,\n          lookbehind: true,\n          greedy: true,\n          alias: 'string',\n          inside: {\n            number: string_inside.number,\n            // trailing semicolon on its own line\n            'semicolon-or-setlocal': {\n              pattern: /([\\r\\n][ \\t]*);(?=\\s|$)/,\n              lookbehind: true,\n              alias: 'function'\n            }\n          }\n        },\n        {\n          // HEREDOC: marker \\n content \\n marker ; -> \"content\" (immediate)\n          pattern: /(^|\\s)HEREDOC:\\s+\\S+(?:\\n|\\r\\n).*(?:\\n|\\r\\n)\\s*\\S+(?=\\s|$)/,\n          lookbehind: true,\n          greedy: true,\n          alias: 'string',\n          inside: string_inside\n        },\n        {\n          // [[ string ]], [==[ string]==]\n          pattern: /(^|\\s)\\[(={0,6})\\[\\s[\\s\\S]*?\\]\\2\\](?=\\s|$)/,\n          lookbehind: true,\n          greedy: true,\n          alias: 'string',\n          inside: string_inside\n        }\n      ],\n      'special-using': {\n        pattern: /(^|\\s)USING:(?:\\s\\S+)*(?=\\s+;(?:\\s|$))/,\n        lookbehind: true,\n        alias: 'function',\n        inside: {\n          // this is essentially a regex for vocab names, which i don't want to specify\n          // but the USING: gets picked up as a vocab name\n          string: {\n            pattern: /(\\s)[^:\\s]+/,\n            lookbehind: true\n          }\n        }\n      },\n      /* this description of stack effect literal syntax is not complete and not as specific as theoretically possible\ntrying to do better is more work and regex-computation-time than it's worth though.\n- we'd like to have the \"delimiter\" parts of the stack effect [ (, --, and ) ] be a different (less-important or comment-like) colour to the stack effect contents\n- we'd like if nested stack effects were treated as such rather than just appearing flat (with `inside`)\n- we'd like if the following variable name conventions were recognised specifically:\nspecial row variables = ..a b..\ntype and stack effect annotations end with a colon = ( quot: ( a: ( -- ) -- b ) -- x ), ( x: number -- )\nword throws unconditional error = *\nany other word-like variable name = a ? q' etc\nhttps://docs.factorcode.org/content/article-effects.html\nthese are pretty complicated to highlight properly without a real parser, and therefore out of scope\nthe old pattern, which may be later useful, was: (^|\\s)(?:call|execute|eval)?\\((?:\\s+[^\"\\r\\n\\t ]\\S*)*?\\s+--(?:\\s+[^\"\\n\\t ]\\S*)*?\\s+\\)(?=\\s|$)\n*/\n      // current solution is not great\n      'stack-effect-delimiter': [\n        {\n          // opening parenthesis\n          pattern: /(^|\\s)(?:call|eval|execute)?\\((?=\\s)/,\n          lookbehind: true,\n          alias: 'operator'\n        },\n        {\n          // middle --\n          pattern: /(\\s)--(?=\\s)/,\n          lookbehind: true,\n          alias: 'operator'\n        },\n        {\n          // closing parenthesis\n          pattern: /(\\s)\\)(?=\\s|$)/,\n          lookbehind: true,\n          alias: 'operator'\n        }\n      ],\n      combinators: {\n        pattern: null,\n        lookbehind: true,\n        alias: 'keyword'\n      },\n      'kernel-builtin': {\n        pattern: null,\n        lookbehind: true,\n        alias: 'variable'\n      },\n      'sequences-builtin': {\n        pattern: null,\n        lookbehind: true,\n        alias: 'variable'\n      },\n      'math-builtin': {\n        pattern: null,\n        lookbehind: true,\n        alias: 'variable'\n      },\n      'constructor-word': {\n        // <array> but not <=>\n        pattern: /(^|\\s)<(?!=+>|-+>)\\S+>(?=\\s|$)/,\n        lookbehind: true,\n        alias: 'keyword'\n      },\n      'other-builtin-syntax': {\n        pattern: null,\n        lookbehind: true,\n        alias: 'operator'\n      },\n      /*\nfull list of supported word naming conventions: (the convention appears outside of the [brackets])\nset-[x]\nchange-[x]\nwith-[x]\nnew-[x]\n>[string]\n[base]>\n[string]>[number]\n+[symbol]+\n[boolean-word]?\n?[of]\n[slot-reader]>>\n>>[slot-setter]\n[slot-writer]<<\n([implementation-detail])\n[mutater]!\n[variant]*\n[prettyprint].\n$[help-markup]\n<constructors>, SYNTAX:, etc are supported by their own patterns.\n`with` and `new` from `kernel` are their own builtins.\nsee <https://docs.factorcode.org/content/article-conventions.html>\n*/\n      'conventionally-named-word': {\n        pattern:\n          /(^|\\s)(?!\")(?:(?:change|new|set|with)-\\S+|\\$\\S+|>[^>\\s]+|[^:>\\s]+>|[^>\\s]+>[^>\\s]+|\\+[^+\\s]+\\+|[^?\\s]+\\?|\\?[^?\\s]+|[^>\\s]+>>|>>[^>\\s]+|[^<\\s]+<<|\\([^()\\s]+\\)|[^!\\s]+!|[^*\\s]\\S*\\*|[^.\\s]\\S*\\.)(?=\\s|$)/,\n        lookbehind: true,\n        alias: 'keyword'\n      },\n      'colon-syntax': {\n        pattern: /(^|\\s)(?:[A-Z0-9\\-]+#?)?:{1,2}\\s+(?:;\\S+|(?!;)\\S+)(?=\\s|$)/,\n        lookbehind: true,\n        greedy: true,\n        alias: 'function'\n      },\n      'semicolon-or-setlocal': {\n        pattern: /(\\s)(?:;|:>)(?=\\s|$)/,\n        lookbehind: true,\n        alias: 'function'\n      },\n      // do not highlight leading } or trailing X{ at the begin/end of the file as it's invalid syntax\n      'curly-brace-literal-delimiter': [\n        {\n          // opening\n          pattern: /(^|\\s)[a-z]*\\{(?=\\s)/i,\n          lookbehind: true,\n          alias: 'operator'\n        },\n        {\n          // closing\n          pattern: /(\\s)\\}(?=\\s|$)/,\n          lookbehind: true,\n          alias: 'operator'\n        }\n      ],\n      // do not highlight leading ] or trailing [ at the begin/end of the file as it's invalid syntax\n      'quotation-delimiter': [\n        {\n          // opening\n          pattern: /(^|\\s)\\[(?=\\s)/,\n          lookbehind: true,\n          alias: 'operator'\n        },\n        {\n          // closing\n          pattern: /(\\s)\\](?=\\s|$)/,\n          lookbehind: true,\n          alias: 'operator'\n        }\n      ],\n      'normal-word': {\n        pattern: /(^|\\s)[^\"\\s]\\S*(?=\\s|$)/,\n        lookbehind: true\n      },\n      /*\nbasic first-class string \"a\"\nwith escaped double-quote \"a\\\"\"\nescaped backslash \"\\\\\"\nand general escapes since Factor has so many \"\\N\"\nsyntax that works in the reference implementation that isn't fully\nsupported because it's an implementation detail:\n\"string 1\"\"string 2\" -> 2 strings (works anyway)\n\"string\"5 -> string, 5\n\"string\"[ ] -> string, quotation\n{ \"a\"} -> array<string>\nthe rest of those examples all properly recognise the string, but not\nthe other object (number, quotation, etc)\nthis is fine for a regex-only implementation.\n*/\n      string: {\n        pattern: /\"(?:\\\\\\S|[^\"\\\\])*\"/,\n        greedy: true,\n        inside: string_inside\n      }\n    }\n    var escape = function (str) {\n      return (str + '').replace(/([.?*+\\^$\\[\\]\\\\(){}|\\-])/g, '\\\\$1')\n    }\n    var arrToWordsRegExp = function (arr) {\n      return new RegExp('(^|\\\\s)(?:' + arr.map(escape).join('|') + ')(?=\\\\s|$)')\n    }\n    var builtins = {\n      'kernel-builtin': [\n        'or',\n        '2nipd',\n        '4drop',\n        'tuck',\n        'wrapper',\n        'nip',\n        'wrapper?',\n        'callstack>array',\n        'die',\n        'dupd',\n        'callstack',\n        'callstack?',\n        '3dup',\n        'hashcode',\n        'pick',\n        '4nip',\n        'build',\n        '>boolean',\n        'nipd',\n        'clone',\n        '5nip',\n        'eq?',\n        '?',\n        '=',\n        'swapd',\n        '2over',\n        'clear',\n        '2dup',\n        'get-retainstack',\n        'not',\n        'tuple?',\n        'dup',\n        '3nipd',\n        'call',\n        '-rotd',\n        'object',\n        'drop',\n        'assert=',\n        'assert?',\n        '-rot',\n        'execute',\n        'boa',\n        'get-callstack',\n        'curried?',\n        '3drop',\n        'pickd',\n        'overd',\n        'over',\n        'roll',\n        '3nip',\n        'swap',\n        'and',\n        '2nip',\n        'rotd',\n        'throw',\n        '(clone)',\n        'hashcode*',\n        'spin',\n        'reach',\n        '4dup',\n        'equal?',\n        'get-datastack',\n        'assert',\n        '2drop',\n        '<wrapper>',\n        'boolean?',\n        'identity-hashcode',\n        'identity-tuple?',\n        'null',\n        'composed?',\n        'new',\n        '5drop',\n        'rot',\n        '-roll',\n        'xor',\n        'identity-tuple',\n        'boolean'\n      ],\n      'other-builtin-syntax': [\n        // syntax\n        '=======',\n        'recursive',\n        'flushable',\n        '>>',\n        '<<<<<<',\n        'M\\\\',\n        'B',\n        'PRIVATE>',\n        '\\\\',\n        '======',\n        'final',\n        'inline',\n        'delimiter',\n        'deprecated',\n        '<PRIVATE',\n        '>>>>>>',\n        '<<<<<<<',\n        'parse-complex',\n        'malformed-complex',\n        'read-only',\n        '>>>>>>>',\n        'call-next-method',\n        '<<',\n        'foldable', // literals\n        '$',\n        '$[',\n        '${'\n      ],\n      'sequences-builtin': [\n        'member-eq?',\n        'mismatch',\n        'append',\n        'assert-sequence=',\n        'longer',\n        'repetition',\n        'clone-like',\n        '3sequence',\n        'assert-sequence?',\n        'last-index-from',\n        'reversed',\n        'index-from',\n        'cut*',\n        'pad-tail',\n        'join-as',\n        'remove-eq!',\n        'concat-as',\n        'but-last',\n        'snip',\n        'nths',\n        'nth',\n        'sequence',\n        'longest',\n        'slice?',\n        '<slice>',\n        'remove-nth',\n        'tail-slice',\n        'empty?',\n        'tail*',\n        'member?',\n        'virtual-sequence?',\n        'set-length',\n        'drop-prefix',\n        'iota',\n        'unclip',\n        'bounds-error?',\n        'unclip-last-slice',\n        'non-negative-integer-expected',\n        'non-negative-integer-expected?',\n        'midpoint@',\n        'longer?',\n        '?set-nth',\n        '?first',\n        'rest-slice',\n        'prepend-as',\n        'prepend',\n        'fourth',\n        'sift',\n        'subseq-start',\n        'new-sequence',\n        '?last',\n        'like',\n        'first4',\n        '1sequence',\n        'reverse',\n        'slice',\n        'virtual@',\n        'repetition?',\n        'set-last',\n        'index',\n        '4sequence',\n        'max-length',\n        'set-second',\n        'immutable-sequence',\n        'first2',\n        'first3',\n        'supremum',\n        'unclip-slice',\n        'suffix!',\n        'insert-nth',\n        'tail',\n        '3append',\n        'short',\n        'suffix',\n        'concat',\n        'flip',\n        'immutable?',\n        'reverse!',\n        '2sequence',\n        'sum',\n        'delete-all',\n        'indices',\n        'snip-slice',\n        '<iota>',\n        'check-slice',\n        'sequence?',\n        'head',\n        'append-as',\n        'halves',\n        'sequence=',\n        'collapse-slice',\n        '?second',\n        'slice-error?',\n        'product',\n        'bounds-check?',\n        'bounds-check',\n        'immutable',\n        'virtual-exemplar',\n        'harvest',\n        'remove',\n        'pad-head',\n        'last',\n        'set-fourth',\n        'cartesian-product',\n        'remove-eq',\n        'shorten',\n        'shorter',\n        'reversed?',\n        'shorter?',\n        'shortest',\n        'head-slice',\n        'pop*',\n        'tail-slice*',\n        'but-last-slice',\n        'iota?',\n        'append!',\n        'cut-slice',\n        'new-resizable',\n        'head-slice*',\n        'sequence-hashcode',\n        'pop',\n        'set-nth',\n        '?nth',\n        'second',\n        'join',\n        'immutable-sequence?',\n        '<reversed>',\n        '3append-as',\n        'virtual-sequence',\n        'subseq?',\n        'remove-nth!',\n        'length',\n        'last-index',\n        'lengthen',\n        'assert-sequence',\n        'copy',\n        'move',\n        'third',\n        'first',\n        'tail?',\n        'set-first',\n        'prefix',\n        'bounds-error',\n        '<repetition>',\n        'exchange',\n        'surround',\n        'cut',\n        'min-length',\n        'set-third',\n        'push-all',\n        'head?',\n        'subseq-start-from',\n        'delete-slice',\n        'rest',\n        'sum-lengths',\n        'head*',\n        'infimum',\n        'remove!',\n        'glue',\n        'slice-error',\n        'subseq',\n        'push',\n        'replace-slice',\n        'subseq-as',\n        'unclip-last'\n      ],\n      'math-builtin': [\n        'number=',\n        'next-power-of-2',\n        '?1+',\n        'fp-special?',\n        'imaginary-part',\n        'float>bits',\n        'number?',\n        'fp-infinity?',\n        'bignum?',\n        'fp-snan?',\n        'denominator',\n        'gcd',\n        '*',\n        '+',\n        'fp-bitwise=',\n        '-',\n        'u>=',\n        '/',\n        '>=',\n        'bitand',\n        'power-of-2?',\n        'log2-expects-positive',\n        'neg?',\n        '<',\n        'log2',\n        '>',\n        'integer?',\n        'number',\n        'bits>double',\n        '2/',\n        'zero?',\n        'bits>float',\n        'float?',\n        'shift',\n        'ratio?',\n        'rect>',\n        'even?',\n        'ratio',\n        'fp-sign',\n        'bitnot',\n        '>fixnum',\n        'complex?',\n        '/i',\n        'integer>fixnum',\n        '/f',\n        'sgn',\n        '>bignum',\n        'next-float',\n        'u<',\n        'u>',\n        'mod',\n        'recip',\n        'rational',\n        '>float',\n        '2^',\n        'integer',\n        'fixnum?',\n        'neg',\n        'fixnum',\n        'sq',\n        'bignum',\n        '>rect',\n        'bit?',\n        'fp-qnan?',\n        'simple-gcd',\n        'complex',\n        '<fp-nan>',\n        'real',\n        '>fraction',\n        'double>bits',\n        'bitor',\n        'rem',\n        'fp-nan-payload',\n        'real-part',\n        'log2-expects-positive?',\n        'prev-float',\n        'align',\n        'unordered?',\n        'float',\n        'fp-nan?',\n        'abs',\n        'bitxor',\n        'integer>fixnum-strict',\n        'u<=',\n        'odd?',\n        '<=',\n        '/mod',\n        '>integer',\n        'real?',\n        'rational?',\n        'numerator'\n      ] // that's all for now\n    }\n    Object.keys(builtins).forEach(function (k) {\n      factor[k].pattern = arrToWordsRegExp(builtins[k])\n    })\n    var combinators = [\n      // kernel\n      '2bi',\n      'while',\n      '2tri',\n      'bi*',\n      '4dip',\n      'both?',\n      'same?',\n      'tri@',\n      'curry',\n      'prepose',\n      '3bi',\n      '?if',\n      'tri*',\n      '2keep',\n      '3keep',\n      'curried',\n      '2keepd',\n      'when',\n      '2bi*',\n      '2tri*',\n      '4keep',\n      'bi@',\n      'keepdd',\n      'do',\n      'unless*',\n      'tri-curry',\n      'if*',\n      'loop',\n      'bi-curry*',\n      'when*',\n      '2bi@',\n      '2tri@',\n      'with',\n      '2with',\n      'either?',\n      'bi',\n      'until',\n      '3dip',\n      '3curry',\n      'tri-curry*',\n      'tri-curry@',\n      'bi-curry',\n      'keepd',\n      'compose',\n      '2dip',\n      'if',\n      '3tri',\n      'unless',\n      'tuple',\n      'keep',\n      '2curry',\n      'tri',\n      'most',\n      'while*',\n      'dip',\n      'composed',\n      'bi-curry@', // sequences\n      'find-last-from',\n      'trim-head-slice',\n      'map-as',\n      'each-from',\n      'none?',\n      'trim-tail',\n      'partition',\n      'if-empty',\n      'accumulate*',\n      'reject!',\n      'find-from',\n      'accumulate-as',\n      'collector-for-as',\n      'reject',\n      'map',\n      'map-sum',\n      'accumulate!',\n      '2each-from',\n      'follow',\n      'supremum-by',\n      'map!',\n      'unless-empty',\n      'collector',\n      'padding',\n      'reduce-index',\n      'replicate-as',\n      'infimum-by',\n      'trim-tail-slice',\n      'count',\n      'find-index',\n      'filter',\n      'accumulate*!',\n      'reject-as',\n      'map-integers',\n      'map-find',\n      'reduce',\n      'selector',\n      'interleave',\n      '2map',\n      'filter-as',\n      'binary-reduce',\n      'map-index-as',\n      'find',\n      'produce',\n      'filter!',\n      'replicate',\n      'cartesian-map',\n      'cartesian-each',\n      'find-index-from',\n      'map-find-last',\n      '3map-as',\n      '3map',\n      'find-last',\n      'selector-as',\n      '2map-as',\n      '2map-reduce',\n      'accumulate',\n      'each',\n      'each-index',\n      'accumulate*-as',\n      'when-empty',\n      'all?',\n      'collector-as',\n      'push-either',\n      'new-like',\n      'collector-for',\n      '2selector',\n      'push-if',\n      '2all?',\n      'map-reduce',\n      '3each',\n      'any?',\n      'trim-slice',\n      '2reduce',\n      'change-nth',\n      'produce-as',\n      '2each',\n      'trim',\n      'trim-head',\n      'cartesian-find',\n      'map-index', // math\n      'if-zero',\n      'each-integer',\n      'unless-zero',\n      '(find-integer)',\n      'when-zero',\n      'find-last-integer',\n      '(all-integers?)',\n      'times',\n      '(each-integer)',\n      'find-integer',\n      'all-integers?', // math.combinators\n      'unless-negative',\n      'if-positive',\n      'when-positive',\n      'when-negative',\n      'unless-positive',\n      'if-negative', // combinators\n      'case',\n      '2cleave',\n      'cond>quot',\n      'case>quot',\n      '3cleave',\n      'wrong-values',\n      'to-fixed-point',\n      'alist>quot',\n      'cond',\n      'cleave',\n      'call-effect',\n      'recursive-hashcode',\n      'spread',\n      'deep-spread>quot', // combinators.short-circuit\n      '2||',\n      '0||',\n      'n||',\n      '0&&',\n      '2&&',\n      '3||',\n      '1||',\n      '1&&',\n      'n&&',\n      '3&&', // combinators.smart\n      'smart-unless*',\n      'keep-inputs',\n      'reduce-outputs',\n      'smart-when*',\n      'cleave>array',\n      'smart-with',\n      'smart-apply',\n      'smart-if',\n      'inputs/outputs',\n      'output>sequence-n',\n      'map-outputs',\n      'map-reduce-outputs',\n      'dropping',\n      'output>array',\n      'smart-map-reduce',\n      'smart-2map-reduce',\n      'output>array-n',\n      'nullary',\n      'input<sequence',\n      'append-outputs',\n      'drop-inputs',\n      'inputs',\n      'smart-2reduce',\n      'drop-outputs',\n      'smart-reduce',\n      'preserving',\n      'smart-when',\n      'outputs',\n      'append-outputs-as',\n      'smart-unless',\n      'smart-if*',\n      'sum-outputs',\n      'input<sequence-unsafe',\n      'output>sequence' // tafn\n    ]\n    factor.combinators.pattern = arrToWordsRegExp(combinators)\n    Prism.languages.factor = factor\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/factor.js?");

/***/ })

}]);