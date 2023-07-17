"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_coffeescript"],{

/***/ "./node_modules/refractor/lang/coffeescript.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/coffeescript.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = coffeescript\ncoffeescript.displayName = 'coffeescript'\ncoffeescript.aliases = ['coffee']\nfunction coffeescript(Prism) {\n  ;(function (Prism) {\n    // Ignore comments starting with { to privilege string interpolation highlighting\n    var comment = /#(?!\\{).+/\n    var interpolation = {\n      pattern: /#\\{[^}]+\\}/,\n      alias: 'variable'\n    }\n    Prism.languages.coffeescript = Prism.languages.extend('javascript', {\n      comment: comment,\n      string: [\n        // Strings are multiline\n        {\n          pattern: /'(?:\\\\[\\s\\S]|[^\\\\'])*'/,\n          greedy: true\n        },\n        {\n          // Strings are multiline\n          pattern: /\"(?:\\\\[\\s\\S]|[^\\\\\"])*\"/,\n          greedy: true,\n          inside: {\n            interpolation: interpolation\n          }\n        }\n      ],\n      keyword:\n        /\\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\\b/,\n      'class-member': {\n        pattern: /@(?!\\d)\\w+/,\n        alias: 'variable'\n      }\n    })\n    Prism.languages.insertBefore('coffeescript', 'comment', {\n      'multiline-comment': {\n        pattern: /###[\\s\\S]+?###/,\n        alias: 'comment'\n      },\n      // Block regexp can contain comments and interpolation\n      'block-regex': {\n        pattern: /\\/{3}[\\s\\S]*?\\/{3}/,\n        alias: 'regex',\n        inside: {\n          comment: comment,\n          interpolation: interpolation\n        }\n      }\n    })\n    Prism.languages.insertBefore('coffeescript', 'string', {\n      'inline-javascript': {\n        pattern: /`(?:\\\\[\\s\\S]|[^\\\\`])*`/,\n        inside: {\n          delimiter: {\n            pattern: /^`|`$/,\n            alias: 'punctuation'\n          },\n          script: {\n            pattern: /[\\s\\S]+/,\n            alias: 'language-javascript',\n            inside: Prism.languages.javascript\n          }\n        }\n      },\n      // Block strings\n      'multiline-string': [\n        {\n          pattern: /'''[\\s\\S]*?'''/,\n          greedy: true,\n          alias: 'string'\n        },\n        {\n          pattern: /\"\"\"[\\s\\S]*?\"\"\"/,\n          greedy: true,\n          alias: 'string',\n          inside: {\n            interpolation: interpolation\n          }\n        }\n      ]\n    })\n    Prism.languages.insertBefore('coffeescript', 'keyword', {\n      // Object property\n      property: /(?!\\d)\\w+(?=\\s*:(?!:))/\n    })\n    delete Prism.languages.coffeescript['template-string']\n    Prism.languages.coffee = Prism.languages.coffeescript\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/coffeescript.js?");

/***/ })

}]);