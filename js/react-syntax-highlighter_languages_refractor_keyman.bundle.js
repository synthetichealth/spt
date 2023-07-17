"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_keyman"],{

/***/ "./node_modules/refractor/lang/keyman.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/keyman.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = keyman\nkeyman.displayName = 'keyman'\nkeyman.aliases = []\nfunction keyman(Prism) {\n  Prism.languages.keyman = {\n    comment: {\n      pattern: /\\bc .*/i,\n      greedy: true\n    },\n    string: {\n      pattern: /\"[^\"\\r\\n]*\"|'[^'\\r\\n]*'/,\n      greedy: true\n    },\n    'virtual-key': {\n      pattern:\n        /\\[\\s*(?:(?:ALT|CAPS|CTRL|LALT|LCTRL|NCAPS|RALT|RCTRL|SHIFT)\\s+)*(?:[TKU]_[\\w?]+|[A-E]\\d\\d?|\"[^\"\\r\\n]*\"|'[^'\\r\\n]*')\\s*\\]/i,\n      greedy: true,\n      alias: 'function' // alias for styles\n    },\n    // https://help.keyman.com/developer/language/guide/headers\n    'header-keyword': {\n      pattern: /&\\w+/,\n      alias: 'bold' // alias for styles\n    },\n    'header-statement': {\n      pattern:\n        /\\b(?:bitmap|bitmaps|caps always off|caps on only|copyright|hotkey|language|layout|message|name|shift frees caps|version)\\b/i,\n      alias: 'bold' // alias for styles\n    },\n    'rule-keyword': {\n      pattern:\n        /\\b(?:any|baselayout|beep|call|context|deadkey|dk|if|index|layer|notany|nul|outs|platform|reset|return|save|set|store|use)\\b/i,\n      alias: 'keyword'\n    },\n    'structural-keyword': {\n      pattern: /\\b(?:ansi|begin|group|match|nomatch|unicode|using keys)\\b/i,\n      alias: 'keyword'\n    },\n    'compile-target': {\n      pattern: /\\$(?:keyman|keymanonly|keymanweb|kmfl|weaver):/i,\n      alias: 'property'\n    },\n    // U+####, x###, d### characters and numbers\n    number: /\\b(?:U\\+[\\dA-F]+|d\\d+|x[\\da-f]+|\\d+)\\b/i,\n    operator: /[+>\\\\$]|\\.\\./,\n    punctuation: /[()=,]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/keyman.js?");

/***/ })

}]);