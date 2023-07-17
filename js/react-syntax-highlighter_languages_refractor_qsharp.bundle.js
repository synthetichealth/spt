"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_qsharp"],{

/***/ "./node_modules/refractor/lang/qsharp.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/qsharp.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = qsharp\nqsharp.displayName = 'qsharp'\nqsharp.aliases = ['qs']\nfunction qsharp(Prism) {\n  ;(function (Prism) {\n    /**\n     * Replaces all placeholders \"<<n>>\" of given pattern with the n-th replacement (zero based).\n     *\n     * Note: This is a simple text based replacement. Be careful when using backreferences!\n     *\n     * @param {string} pattern the given pattern.\n     * @param {string[]} replacements a list of replacement which can be inserted into the given pattern.\n     * @returns {string} the pattern with all placeholders replaced with their corresponding replacements.\n     * @example replace(/a<<0>>a/.source, [/b+/.source]) === /a(?:b+)a/.source\n     */\n    function replace(pattern, replacements) {\n      return pattern.replace(/<<(\\d+)>>/g, function (m, index) {\n        return '(?:' + replacements[+index] + ')'\n      })\n    }\n    /**\n     * @param {string} pattern\n     * @param {string[]} replacements\n     * @param {string} [flags]\n     * @returns {RegExp}\n     */\n    function re(pattern, replacements, flags) {\n      return RegExp(replace(pattern, replacements), flags || '')\n    }\n    /**\n     * Creates a nested pattern where all occurrences of the string `<<self>>` are replaced with the pattern itself.\n     *\n     * @param {string} pattern\n     * @param {number} depthLog2\n     * @returns {string}\n     */\n    function nested(pattern, depthLog2) {\n      for (var i = 0; i < depthLog2; i++) {\n        pattern = pattern.replace(/<<self>>/g, function () {\n          return '(?:' + pattern + ')'\n        })\n      }\n      return pattern.replace(/<<self>>/g, '[^\\\\s\\\\S]')\n    } // https://docs.microsoft.com/en-us/azure/quantum/user-guide/language/typesystem/\n    // https://github.com/microsoft/qsharp-language/tree/main/Specifications/Language/5_Grammar\n    var keywordKinds = {\n      // keywords which represent a return or variable type\n      type: 'Adj BigInt Bool Ctl Double false Int One Pauli PauliI PauliX PauliY PauliZ Qubit Range Result String true Unit Zero',\n      // all other keywords\n      other:\n        'Adjoint adjoint apply as auto body borrow borrowing Controlled controlled distribute elif else fail fixup for function if in internal intrinsic invert is let mutable namespace new newtype open operation repeat return self set until use using while within'\n    } // keywords\n    function keywordsToPattern(words) {\n      return '\\\\b(?:' + words.trim().replace(/ /g, '|') + ')\\\\b'\n    }\n    var keywords = RegExp(\n      keywordsToPattern(keywordKinds.type + ' ' + keywordKinds.other)\n    ) // types\n    var identifier = /\\b[A-Za-z_]\\w*\\b/.source\n    var qualifiedName = replace(/<<0>>(?:\\s*\\.\\s*<<0>>)*/.source, [identifier])\n    var typeInside = {\n      keyword: keywords,\n      punctuation: /[<>()?,.:[\\]]/\n    } // strings\n    var regularString = /\"(?:\\\\.|[^\\\\\"])*\"/.source\n    Prism.languages.qsharp = Prism.languages.extend('clike', {\n      comment: /\\/\\/.*/,\n      string: [\n        {\n          pattern: re(/(^|[^$\\\\])<<0>>/.source, [regularString]),\n          lookbehind: true,\n          greedy: true\n        }\n      ],\n      'class-name': [\n        {\n          // open Microsoft.Quantum.Canon;\n          // open Microsoft.Quantum.Canon as CN;\n          pattern: re(/(\\b(?:as|open)\\s+)<<0>>(?=\\s*(?:;|as\\b))/.source, [\n            qualifiedName\n          ]),\n          lookbehind: true,\n          inside: typeInside\n        },\n        {\n          // namespace Quantum.App1;\n          pattern: re(/(\\bnamespace\\s+)<<0>>(?=\\s*\\{)/.source, [qualifiedName]),\n          lookbehind: true,\n          inside: typeInside\n        }\n      ],\n      keyword: keywords,\n      number:\n        /(?:\\b0(?:x[\\da-f]+|b[01]+|o[0-7]+)|(?:\\B\\.\\d+|\\b\\d+(?:\\.\\d*)?)(?:e[-+]?\\d+)?)l?\\b/i,\n      operator:\n        /\\band=|\\bor=|\\band\\b|\\bnot\\b|\\bor\\b|<[-=]|[-=]>|>>>=?|<<<=?|\\^\\^\\^=?|\\|\\|\\|=?|&&&=?|w\\/=?|~~~|[*\\/+\\-^=!%]=?/,\n      punctuation: /::|[{}[\\];(),.:]/\n    })\n    Prism.languages.insertBefore('qsharp', 'number', {\n      range: {\n        pattern: /\\.\\./,\n        alias: 'operator'\n      }\n    }) // single line\n    var interpolationExpr = nested(\n      replace(/\\{(?:[^\"{}]|<<0>>|<<self>>)*\\}/.source, [regularString]),\n      2\n    )\n    Prism.languages.insertBefore('qsharp', 'string', {\n      'interpolation-string': {\n        pattern: re(/\\$\"(?:\\\\.|<<0>>|[^\\\\\"{])*\"/.source, [interpolationExpr]),\n        greedy: true,\n        inside: {\n          interpolation: {\n            pattern: re(/((?:^|[^\\\\])(?:\\\\\\\\)*)<<0>>/.source, [\n              interpolationExpr\n            ]),\n            lookbehind: true,\n            inside: {\n              punctuation: /^\\{|\\}$/,\n              expression: {\n                pattern: /[\\s\\S]+/,\n                alias: 'language-qsharp',\n                inside: Prism.languages.qsharp\n              }\n            }\n          },\n          string: /[\\s\\S]+/\n        }\n      }\n    })\n  })(Prism)\n  Prism.languages.qs = Prism.languages.qsharp\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/qsharp.js?");

/***/ })

}]);