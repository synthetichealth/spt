"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_dart"],{

/***/ "./node_modules/refractor/lang/dart.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/dart.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = dart\ndart.displayName = 'dart'\ndart.aliases = []\nfunction dart(Prism) {\n  ;(function (Prism) {\n    var keywords = [\n      /\\b(?:async|sync|yield)\\*/,\n      /\\b(?:abstract|assert|async|await|break|case|catch|class|const|continue|covariant|default|deferred|do|dynamic|else|enum|export|extends|extension|external|factory|final|finally|for|get|hide|if|implements|import|in|interface|library|mixin|new|null|on|operator|part|rethrow|return|set|show|static|super|switch|sync|this|throw|try|typedef|var|void|while|with|yield)\\b/\n    ] // Handles named imports, such as http.Client\n    var packagePrefix = /(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*/\n      .source // based on the dart naming conventions\n    var className = {\n      pattern: RegExp(packagePrefix + /[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b/.source),\n      lookbehind: true,\n      inside: {\n        namespace: {\n          pattern: /^[a-z]\\w*(?:\\s*\\.\\s*[a-z]\\w*)*(?:\\s*\\.)?/,\n          inside: {\n            punctuation: /\\./\n          }\n        }\n      }\n    }\n    Prism.languages.dart = Prism.languages.extend('clike', {\n      'class-name': [\n        className,\n        {\n          // variables and parameters\n          // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)\n          pattern: RegExp(\n            packagePrefix + /[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()])/.source\n          ),\n          lookbehind: true,\n          inside: className.inside\n        }\n      ],\n      keyword: keywords,\n      operator:\n        /\\bis!|\\b(?:as|is)\\b|\\+\\+|--|&&|\\|\\||<<=?|>>=?|~(?:\\/=?)?|[+\\-*\\/%&^|=!<>]=?|\\?/\n    })\n    Prism.languages.insertBefore('dart', 'string', {\n      'string-literal': {\n        pattern:\n          /r?(?:(\"\"\"|''')[\\s\\S]*?\\1|([\"'])(?:\\\\.|(?!\\2)[^\\\\\\r\\n])*\\2(?!\\2))/,\n        greedy: true,\n        inside: {\n          interpolation: {\n            pattern:\n              /((?:^|[^\\\\])(?:\\\\{2})*)\\$(?:\\w+|\\{(?:[^{}]|\\{[^{}]*\\})*\\})/,\n            lookbehind: true,\n            inside: {\n              punctuation: /^\\$\\{?|\\}$/,\n              expression: {\n                pattern: /[\\s\\S]+/,\n                inside: Prism.languages.dart\n              }\n            }\n          },\n          string: /[\\s\\S]+/\n        }\n      },\n      string: undefined\n    })\n    Prism.languages.insertBefore('dart', 'class-name', {\n      metadata: {\n        pattern: /@\\w+/,\n        alias: 'function'\n      }\n    })\n    Prism.languages.insertBefore('dart', 'class-name', {\n      generics: {\n        pattern:\n          /<(?:[\\w\\s,.&?]|<(?:[\\w\\s,.&?]|<(?:[\\w\\s,.&?]|<[\\w\\s,.&?]*>)*>)*>)*>/,\n        inside: {\n          'class-name': className,\n          keyword: keywords,\n          punctuation: /[<>(),.:]/,\n          operator: /[?&|]/\n        }\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/dart.js?");

/***/ })

}]);