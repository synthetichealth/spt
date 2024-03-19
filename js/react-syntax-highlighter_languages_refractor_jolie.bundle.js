"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_jolie"],{

/***/ "./node_modules/refractor/lang/jolie.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/jolie.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = jolie\njolie.displayName = 'jolie'\njolie.aliases = []\nfunction jolie(Prism) {\n  Prism.languages.jolie = Prism.languages.extend('clike', {\n    string: {\n      pattern: /(^|[^\\\\])\"(?:\\\\[\\s\\S]|[^\"\\\\])*\"/,\n      lookbehind: true,\n      greedy: true\n    },\n    'class-name': {\n      pattern:\n        /((?:\\b(?:as|courier|embed|in|inputPort|outputPort|service)\\b|@)[ \\t]*)\\w+/,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:as|cH|comp|concurrent|constants|courier|cset|csets|default|define|else|embed|embedded|execution|exit|extender|for|foreach|forward|from|global|if|import|in|include|init|inputPort|install|instanceof|interface|is_defined|linkIn|linkOut|main|new|nullProcess|outputPort|over|private|provide|public|scope|sequential|service|single|spawn|synchronized|this|throw|throws|type|undef|until|while|with)\\b/,\n    function: /\\b[a-z_]\\w*(?=[ \\t]*[@(])/i,\n    number: /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?l?/i,\n    operator: /-[-=>]?|\\+[+=]?|<[<=]?|[>=*!]=?|&&|\\|\\||[?\\/%^@|]/,\n    punctuation: /[()[\\]{},;.:]/,\n    builtin:\n      /\\b(?:Byte|any|bool|char|double|enum|float|int|length|long|ranges|regex|string|undefined|void)\\b/\n  })\n  Prism.languages.insertBefore('jolie', 'keyword', {\n    aggregates: {\n      pattern:\n        /(\\bAggregates\\s*:\\s*)(?:\\w+(?:\\s+with\\s+\\w+)?\\s*,\\s*)*\\w+(?:\\s+with\\s+\\w+)?/,\n      lookbehind: true,\n      inside: {\n        keyword: /\\bwith\\b/,\n        'class-name': /\\w+/,\n        punctuation: /,/\n      }\n    },\n    redirects: {\n      pattern:\n        /(\\bRedirects\\s*:\\s*)(?:\\w+\\s*=>\\s*\\w+\\s*,\\s*)*(?:\\w+\\s*=>\\s*\\w+)/,\n      lookbehind: true,\n      inside: {\n        punctuation: /,/,\n        'class-name': /\\w+/,\n        operator: /=>/\n      }\n    },\n    property: {\n      pattern:\n        /\\b(?:Aggregates|[Ii]nterfaces|Java|Javascript|Jolie|[Ll]ocation|OneWay|[Pp]rotocol|Redirects|RequestResponse)\\b(?=[ \\t]*:)/\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/jolie.js?");

/***/ })

}]);