"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_systemd"],{

/***/ "./node_modules/refractor/lang/systemd.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/systemd.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = systemd\nsystemd.displayName = 'systemd'\nsystemd.aliases = []\nfunction systemd(Prism) {\n  // https://www.freedesktop.org/software/systemd/man/systemd.syntax.html\n  ;(function (Prism) {\n    var comment = {\n      pattern: /^[;#].*/m,\n      greedy: true\n    }\n    var quotesSource = /\"(?:[^\\r\\n\"\\\\]|\\\\(?:[^\\r]|\\r\\n?))*\"(?!\\S)/.source\n    Prism.languages.systemd = {\n      comment: comment,\n      section: {\n        pattern: /^\\[[^\\n\\r\\[\\]]*\\](?=[ \\t]*$)/m,\n        greedy: true,\n        inside: {\n          punctuation: /^\\[|\\]$/,\n          'section-name': {\n            pattern: /[\\s\\S]+/,\n            alias: 'selector'\n          }\n        }\n      },\n      key: {\n        pattern: /^[^\\s=]+(?=[ \\t]*=)/m,\n        greedy: true,\n        alias: 'attr-name'\n      },\n      value: {\n        // This pattern is quite complex because of two properties:\n        //  1) Quotes (strings) must be preceded by a space. Since we can't use lookbehinds, we have to \"resolve\"\n        //     the lookbehind. You will see this in the main loop where spaces are handled separately.\n        //  2) Line continuations.\n        //     After line continuations, empty lines and comments are ignored so we have to consume them.\n        pattern: RegExp(\n          /(=[ \\t]*(?!\\s))/.source + // the value either starts with quotes or not\n            '(?:' +\n            quotesSource +\n            '|(?=[^\"\\r\\n]))' + // main loop\n            '(?:' +\n            (/[^\\s\\\\]/.source + // handle spaces separately because of quotes\n              '|' +\n              '[ \\t]+(?:(?![ \\t\"])|' +\n              quotesSource +\n              ')' + // line continuation\n              '|' +\n              /\\\\[\\r\\n]+(?:[#;].*[\\r\\n]+)*(?![#;])/.source) +\n            ')*'\n        ),\n        lookbehind: true,\n        greedy: true,\n        alias: 'attr-value',\n        inside: {\n          comment: comment,\n          quoted: {\n            pattern: RegExp(/(^|\\s)/.source + quotesSource),\n            lookbehind: true,\n            greedy: true\n          },\n          punctuation: /\\\\$/m,\n          boolean: {\n            pattern: /^(?:false|no|off|on|true|yes)$/,\n            greedy: true\n          }\n        }\n      },\n      punctuation: /=/\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/systemd.js?");

/***/ })

}]);