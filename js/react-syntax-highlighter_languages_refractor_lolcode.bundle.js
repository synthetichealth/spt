"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_lolcode"],{

/***/ "./node_modules/refractor/lang/lolcode.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/lolcode.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = lolcode\nlolcode.displayName = 'lolcode'\nlolcode.aliases = []\nfunction lolcode(Prism) {\n  Prism.languages.lolcode = {\n    comment: [/\\bOBTW\\s[\\s\\S]*?\\sTLDR\\b/, /\\bBTW.+/],\n    string: {\n      pattern: /\"(?::.|[^\":])*\"/,\n      inside: {\n        variable: /:\\{[^}]+\\}/,\n        symbol: [/:\\([a-f\\d]+\\)/i, /:\\[[^\\]]+\\]/, /:[)>o\":]/]\n      },\n      greedy: true\n    },\n    number: /(?:\\B-)?(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)/,\n    symbol: {\n      pattern: /(^|\\s)(?:A )?(?:BUKKIT|NOOB|NUMBAR|NUMBR|TROOF|YARN)(?=\\s|,|$)/,\n      lookbehind: true,\n      inside: {\n        keyword: /A(?=\\s)/\n      }\n    },\n    label: {\n      pattern: /((?:^|\\s)(?:IM IN YR|IM OUTTA YR) )[a-zA-Z]\\w*/,\n      lookbehind: true,\n      alias: 'string'\n    },\n    function: {\n      pattern: /((?:^|\\s)(?:HOW IZ I|I IZ|IZ) )[a-zA-Z]\\w*/,\n      lookbehind: true\n    },\n    keyword: [\n      {\n        pattern:\n          /(^|\\s)(?:AN|FOUND YR|GIMMEH|GTFO|HAI|HAS A|HOW IZ I|I HAS A|I IZ|IF U SAY SO|IM IN YR|IM OUTTA YR|IS NOW(?: A)?|ITZ(?: A)?|IZ|KTHX|KTHXBYE|LIEK(?: A)?|MAEK|MEBBE|MKAY|NERFIN|NO WAI|O HAI IM|O RLY\\?|OIC|OMG|OMGWTF|R|SMOOSH|SRS|TIL|UPPIN|VISIBLE|WILE|WTF\\?|YA RLY|YR)(?=\\s|,|$)/,\n        lookbehind: true\n      },\n      /'Z(?=\\s|,|$)/\n    ],\n    boolean: {\n      pattern: /(^|\\s)(?:FAIL|WIN)(?=\\s|,|$)/,\n      lookbehind: true\n    },\n    variable: {\n      pattern: /(^|\\s)IT(?=\\s|,|$)/,\n      lookbehind: true\n    },\n    operator: {\n      pattern:\n        /(^|\\s)(?:NOT|BOTH SAEM|DIFFRINT|(?:ALL|ANY|BIGGR|BOTH|DIFF|EITHER|MOD|PRODUKT|QUOSHUNT|SMALLR|SUM|WON) OF)(?=\\s|,|$)/,\n      lookbehind: true\n    },\n    punctuation: /\\.{3}|…|,|!/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/lolcode.js?");

/***/ })

}]);