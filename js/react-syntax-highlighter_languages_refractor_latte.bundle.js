"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_latte"],{

/***/ "./node_modules/refractor/lang/latte.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/latte.js ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorMarkupTemplating = __webpack_require__(/*! ./markup-templating.js */ \"./node_modules/refractor/lang/markup-templating.js\")\nvar refractorPhp = __webpack_require__(/*! ./php.js */ \"./node_modules/refractor/lang/php.js\")\nmodule.exports = latte\nlatte.displayName = 'latte'\nlatte.aliases = []\nfunction latte(Prism) {\n  Prism.register(refractorMarkupTemplating)\n  Prism.register(refractorPhp)\n  ;(function (Prism) {\n    Prism.languages.latte = {\n      comment: /^\\{\\*[\\s\\S]*/,\n      'latte-tag': {\n        // https://latte.nette.org/en/tags\n        pattern: /(^\\{(?:\\/(?=[a-z]))?)(?:[=_]|[a-z]\\w*\\b(?!\\())/i,\n        lookbehind: true,\n        alias: 'important'\n      },\n      delimiter: {\n        pattern: /^\\{\\/?|\\}$/,\n        alias: 'punctuation'\n      },\n      php: {\n        pattern: /\\S(?:[\\s\\S]*\\S)?/,\n        alias: 'language-php',\n        inside: Prism.languages.php\n      }\n    }\n    var markupLatte = Prism.languages.extend('markup', {})\n    Prism.languages.insertBefore(\n      'inside',\n      'attr-value',\n      {\n        'n-attr': {\n          pattern: /n:[\\w-]+(?:\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+))?/,\n          inside: {\n            'attr-name': {\n              pattern: /^[^\\s=]+/,\n              alias: 'important'\n            },\n            'attr-value': {\n              pattern: /=[\\s\\S]+/,\n              inside: {\n                punctuation: [\n                  /^=/,\n                  {\n                    pattern: /^(\\s*)[\"']|[\"']$/,\n                    lookbehind: true\n                  }\n                ],\n                php: {\n                  pattern: /\\S(?:[\\s\\S]*\\S)?/,\n                  inside: Prism.languages.php\n                }\n              }\n            }\n          }\n        }\n      },\n      markupLatte.tag\n    )\n    Prism.hooks.add('before-tokenize', function (env) {\n      if (env.language !== 'latte') {\n        return\n      }\n      var lattePattern =\n        /\\{\\*[\\s\\S]*?\\*\\}|\\{[^'\"\\s{}*](?:[^\"'/{}]|\\/(?![*/])|(\"|')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*\\}/g\n      Prism.languages['markup-templating'].buildPlaceholders(\n        env,\n        'latte',\n        lattePattern\n      )\n      env.grammar = markupLatte\n    })\n    Prism.hooks.add('after-tokenize', function (env) {\n      Prism.languages['markup-templating'].tokenizePlaceholders(env, 'latte')\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/latte.js?");

/***/ })

}]);