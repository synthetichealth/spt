"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_shellSession"],{

/***/ "./node_modules/refractor/lang/shell-session.js":
/*!******************************************************!*\
  !*** ./node_modules/refractor/lang/shell-session.js ***!
  \******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorBash = __webpack_require__(/*! ./bash.js */ \"./node_modules/refractor/lang/bash.js\")\nmodule.exports = shellSession\nshellSession.displayName = 'shellSession'\nshellSession.aliases = []\nfunction shellSession(Prism) {\n  Prism.register(refractorBash)\n  ;(function (Prism) {\n    // CAREFUL!\n    // The following patterns are concatenated, so the group referenced by a back reference is non-obvious!\n    var strings = [\n      // normal string\n      /\"(?:\\\\[\\s\\S]|\\$\\([^)]+\\)|\\$(?!\\()|`[^`]+`|[^\"\\\\`$])*\"/.source,\n      /'[^']*'/.source,\n      /\\$'(?:[^'\\\\]|\\\\[\\s\\S])*'/.source, // here doc\n      // 2 capturing groups\n      /<<-?\\s*([\"']?)(\\w+)\\1\\s[\\s\\S]*?[\\r\\n]\\2/.source\n    ].join('|')\n    Prism.languages['shell-session'] = {\n      command: {\n        pattern: RegExp(\n          // user info\n          /^/.source +\n            '(?:' + // <user> \":\" ( <path> )?\n            (/[^\\s@:$#%*!/\\\\]+@[^\\r\\n@:$#%*!/\\\\]+(?::[^\\0-\\x1F$#%*?\"<>:;|]+)?/\n              .source +\n              '|' + // <path>\n              // Since the path pattern is quite general, we will require it to start with a special character to\n              // prevent false positives.\n              /[/~.][^\\0-\\x1F$#%*?\"<>@:;|]*/.source) +\n            ')?' + // shell symbol\n            /[$#%](?=\\s)/.source + // bash command\n            /(?:[^\\\\\\r\\n \\t'\"<$]|[ \\t](?:(?!#)|#.*$)|\\\\(?:[^\\r]|\\r\\n?)|\\$(?!')|<(?!<)|<<str>>)+/.source.replace(\n              /<<str>>/g,\n              function () {\n                return strings\n              }\n            ),\n          'm'\n        ),\n        greedy: true,\n        inside: {\n          info: {\n            // foo@bar:~/files$ exit\n            // foo@bar$ exit\n            // ~/files$ exit\n            pattern: /^[^#$%]+/,\n            alias: 'punctuation',\n            inside: {\n              user: /^[^\\s@:$#%*!/\\\\]+@[^\\r\\n@:$#%*!/\\\\]+/,\n              punctuation: /:/,\n              path: /[\\s\\S]+/\n            }\n          },\n          bash: {\n            pattern: /(^[$#%]\\s*)\\S[\\s\\S]*/,\n            lookbehind: true,\n            alias: 'language-bash',\n            inside: Prism.languages.bash\n          },\n          'shell-symbol': {\n            pattern: /^[$#%]/,\n            alias: 'important'\n          }\n        }\n      },\n      output: /.(?:.*(?:[\\r\\n]|.$))*/\n    }\n    Prism.languages['sh-session'] = Prism.languages['shellsession'] =\n      Prism.languages['shell-session']\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/shell-session.js?");

/***/ })

}]);