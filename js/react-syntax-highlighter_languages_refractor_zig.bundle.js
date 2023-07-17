"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_zig"],{

/***/ "./node_modules/refractor/lang/zig.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/zig.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = zig\nzig.displayName = 'zig'\nzig.aliases = []\nfunction zig(Prism) {\n  ;(function (Prism) {\n    function literal(str) {\n      return function () {\n        return str\n      }\n    }\n    var keyword =\n      /\\b(?:align|allowzero|and|anyframe|anytype|asm|async|await|break|cancel|catch|comptime|const|continue|defer|else|enum|errdefer|error|export|extern|fn|for|if|inline|linksection|nakedcc|noalias|nosuspend|null|or|orelse|packed|promise|pub|resume|return|stdcallcc|struct|suspend|switch|test|threadlocal|try|undefined|union|unreachable|usingnamespace|var|volatile|while)\\b/\n    var IDENTIFIER = '\\\\b(?!' + keyword.source + ')(?!\\\\d)\\\\w+\\\\b'\n    var ALIGN = /align\\s*\\((?:[^()]|\\([^()]*\\))*\\)/.source\n    var PREFIX_TYPE_OP =\n      /(?:\\?|\\bpromise->|(?:\\[[^[\\]]*\\]|\\*(?!\\*)|\\*\\*)(?:\\s*<ALIGN>|\\s*const\\b|\\s*volatile\\b|\\s*allowzero\\b)*)/.source.replace(\n        /<ALIGN>/g,\n        literal(ALIGN)\n      )\n    var SUFFIX_EXPR =\n      /(?:\\bpromise\\b|(?:\\berror\\.)?<ID>(?:\\.<ID>)*(?!\\s+<ID>))/.source.replace(\n        /<ID>/g,\n        literal(IDENTIFIER)\n      )\n    var TYPE =\n      '(?!\\\\s)(?:!?\\\\s*(?:' + PREFIX_TYPE_OP + '\\\\s*)*' + SUFFIX_EXPR + ')+'\n    /*\n     * A simplified grammar for Zig compile time type literals:\n     *\n     * TypeExpr = ( \"!\"? PREFIX_TYPE_OP* SUFFIX_EXPR )+\n     *\n     * SUFFIX_EXPR = ( \\b \"promise\" \\b | ( \\b \"error\" \".\" )? IDENTIFIER ( \".\" IDENTIFIER )* (?! \\s+ IDENTIFIER ) )\n     *\n     * PREFIX_TYPE_OP = \"?\"\n     *                | \\b \"promise\" \"->\"\n     *                | ( \"[\" [^\\[\\]]* \"]\" | \"*\" | \"**\" ) ( ALIGN | \"const\" \\b | \"volatile\" \\b | \"allowzero\" \\b )*\n     *\n     * ALIGN = \"align\" \"(\" ( [^()] | \"(\" [^()]* \")\" )* \")\"\n     *\n     * IDENTIFIER = \\b (?! KEYWORD ) [a-zA-Z_] \\w* \\b\n     *\n     */\n    Prism.languages.zig = {\n      comment: [\n        {\n          pattern: /\\/\\/[/!].*/,\n          alias: 'doc-comment'\n        },\n        /\\/{2}.*/\n      ],\n      string: [\n        {\n          // \"string\" and c\"string\"\n          pattern: /(^|[^\\\\@])c?\"(?:[^\"\\\\\\r\\n]|\\\\.)*\"/,\n          lookbehind: true,\n          greedy: true\n        },\n        {\n          // multiline strings and c-strings\n          pattern: /([\\r\\n])([ \\t]+c?\\\\{2}).*(?:(?:\\r\\n?|\\n)\\2.*)*/,\n          lookbehind: true,\n          greedy: true\n        }\n      ],\n      char: {\n        // characters 'a', '\\n', '\\xFF', '\\u{10FFFF}'\n        pattern:\n          /(^|[^\\\\])'(?:[^'\\\\\\r\\n]|[\\uD800-\\uDFFF]{2}|\\\\(?:.|x[a-fA-F\\d]{2}|u\\{[a-fA-F\\d]{1,6}\\}))'/,\n        lookbehind: true,\n        greedy: true\n      },\n      builtin: /\\B@(?!\\d)\\w+(?=\\s*\\()/,\n      label: {\n        pattern:\n          /(\\b(?:break|continue)\\s*:\\s*)\\w+\\b|\\b(?!\\d)\\w+\\b(?=\\s*:\\s*(?:\\{|while\\b))/,\n        lookbehind: true\n      },\n      'class-name': [\n        // const Foo = struct {};\n        /\\b(?!\\d)\\w+(?=\\s*=\\s*(?:(?:extern|packed)\\s+)?(?:enum|struct|union)\\s*[({])/,\n        {\n          // const x: i32 = 9;\n          // var x: Bar;\n          // fn foo(x: bool, y: f32) void {}\n          pattern: RegExp(\n            /(:\\s*)<TYPE>(?=\\s*(?:<ALIGN>\\s*)?[=;,)])|<TYPE>(?=\\s*(?:<ALIGN>\\s*)?\\{)/.source\n              .replace(/<TYPE>/g, literal(TYPE))\n              .replace(/<ALIGN>/g, literal(ALIGN))\n          ),\n          lookbehind: true,\n          inside: null // see below\n        },\n        {\n          // extern fn foo(x: f64) f64; (optional alignment)\n          pattern: RegExp(\n            /(\\)\\s*)<TYPE>(?=\\s*(?:<ALIGN>\\s*)?;)/.source\n              .replace(/<TYPE>/g, literal(TYPE))\n              .replace(/<ALIGN>/g, literal(ALIGN))\n          ),\n          lookbehind: true,\n          inside: null // see below\n        }\n      ],\n      'builtin-type': {\n        pattern:\n          /\\b(?:anyerror|bool|c_u?(?:int|long|longlong|short)|c_longdouble|c_void|comptime_(?:float|int)|f(?:16|32|64|128)|[iu](?:8|16|32|64|128|size)|noreturn|type|void)\\b/,\n        alias: 'keyword'\n      },\n      keyword: keyword,\n      function: /\\b(?!\\d)\\w+(?=\\s*\\()/,\n      number:\n        /\\b(?:0b[01]+|0o[0-7]+|0x[a-fA-F\\d]+(?:\\.[a-fA-F\\d]*)?(?:[pP][+-]?[a-fA-F\\d]+)?|\\d+(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)\\b/,\n      boolean: /\\b(?:false|true)\\b/,\n      operator:\n        /\\.[*?]|\\.{2,3}|[-=]>|\\*\\*|\\+\\+|\\|\\||(?:<<|>>|[-+*]%|[-+*/%^&|<>!=])=?|[?~]/,\n      punctuation: /[.:,;(){}[\\]]/\n    }\n    Prism.languages.zig['class-name'].forEach(function (obj) {\n      if (obj.inside === null) {\n        obj.inside = Prism.languages.zig\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/zig.js?");

/***/ })

}]);