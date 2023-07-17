"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_ruby"],{

/***/ "./node_modules/refractor/lang/ruby.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/ruby.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = ruby\nruby.displayName = 'ruby'\nruby.aliases = ['rb']\nfunction ruby(Prism) {\n  /**\n   * Original by Samuel Flores\n   *\n   * Adds the following new token classes:\n   *     constant, builtin, variable, symbol, regex\n   */\n  ;(function (Prism) {\n    Prism.languages.ruby = Prism.languages.extend('clike', {\n      comment: {\n        pattern: /#.*|^=begin\\s[\\s\\S]*?^=end/m,\n        greedy: true\n      },\n      'class-name': {\n        pattern:\n          /(\\b(?:class|module)\\s+|\\bcatch\\s+\\()[\\w.\\\\]+|\\b[A-Z_]\\w*(?=\\s*\\.\\s*new\\b)/,\n        lookbehind: true,\n        inside: {\n          punctuation: /[.\\\\]/\n        }\n      },\n      keyword:\n        /\\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\\b/,\n      operator:\n        /\\.{2,3}|&\\.|===|<?=>|[!=]?~|(?:&&|\\|\\||<<|>>|\\*\\*|[+\\-*/%<>!^&|=])=?|[?:]/,\n      punctuation: /[(){}[\\].,;]/\n    })\n    Prism.languages.insertBefore('ruby', 'operator', {\n      'double-colon': {\n        pattern: /::/,\n        alias: 'punctuation'\n      }\n    })\n    var interpolation = {\n      pattern: /((?:^|[^\\\\])(?:\\\\{2})*)#\\{(?:[^{}]|\\{[^{}]*\\})*\\}/,\n      lookbehind: true,\n      inside: {\n        content: {\n          pattern: /^(#\\{)[\\s\\S]+(?=\\}$)/,\n          lookbehind: true,\n          inside: Prism.languages.ruby\n        },\n        delimiter: {\n          pattern: /^#\\{|\\}$/,\n          alias: 'punctuation'\n        }\n      }\n    }\n    delete Prism.languages.ruby.function\n    var percentExpression =\n      '(?:' +\n      [\n        /([^a-zA-Z0-9\\s{(\\[<=])(?:(?!\\1)[^\\\\]|\\\\[\\s\\S])*\\1/.source,\n        /\\((?:[^()\\\\]|\\\\[\\s\\S]|\\((?:[^()\\\\]|\\\\[\\s\\S])*\\))*\\)/.source,\n        /\\{(?:[^{}\\\\]|\\\\[\\s\\S]|\\{(?:[^{}\\\\]|\\\\[\\s\\S])*\\})*\\}/.source,\n        /\\[(?:[^\\[\\]\\\\]|\\\\[\\s\\S]|\\[(?:[^\\[\\]\\\\]|\\\\[\\s\\S])*\\])*\\]/.source,\n        /<(?:[^<>\\\\]|\\\\[\\s\\S]|<(?:[^<>\\\\]|\\\\[\\s\\S])*>)*>/.source\n      ].join('|') +\n      ')'\n    var symbolName =\n      /(?:\"(?:\\\\.|[^\"\\\\\\r\\n])*\"|(?:\\b[a-zA-Z_]\\w*|[^\\s\\0-\\x7F]+)[?!]?|\\$.)/\n        .source\n    Prism.languages.insertBefore('ruby', 'keyword', {\n      'regex-literal': [\n        {\n          pattern: RegExp(\n            /%r/.source + percentExpression + /[egimnosux]{0,6}/.source\n          ),\n          greedy: true,\n          inside: {\n            interpolation: interpolation,\n            regex: /[\\s\\S]+/\n          }\n        },\n        {\n          pattern:\n            /(^|[^/])\\/(?!\\/)(?:\\[[^\\r\\n\\]]+\\]|\\\\.|[^[/\\\\\\r\\n])+\\/[egimnosux]{0,6}(?=\\s*(?:$|[\\r\\n,.;})#]))/,\n          lookbehind: true,\n          greedy: true,\n          inside: {\n            interpolation: interpolation,\n            regex: /[\\s\\S]+/\n          }\n        }\n      ],\n      variable: /[@$]+[a-zA-Z_]\\w*(?:[?!]|\\b)/,\n      symbol: [\n        {\n          pattern: RegExp(/(^|[^:]):/.source + symbolName),\n          lookbehind: true,\n          greedy: true\n        },\n        {\n          pattern: RegExp(\n            /([\\r\\n{(,][ \\t]*)/.source + symbolName + /(?=:(?!:))/.source\n          ),\n          lookbehind: true,\n          greedy: true\n        }\n      ],\n      'method-definition': {\n        pattern: /(\\bdef\\s+)\\w+(?:\\s*\\.\\s*\\w+)?/,\n        lookbehind: true,\n        inside: {\n          function: /\\b\\w+$/,\n          keyword: /^self\\b/,\n          'class-name': /^\\w+/,\n          punctuation: /\\./\n        }\n      }\n    })\n    Prism.languages.insertBefore('ruby', 'string', {\n      'string-literal': [\n        {\n          pattern: RegExp(/%[qQiIwWs]?/.source + percentExpression),\n          greedy: true,\n          inside: {\n            interpolation: interpolation,\n            string: /[\\s\\S]+/\n          }\n        },\n        {\n          pattern:\n            /(\"|')(?:#\\{[^}]+\\}|#(?!\\{)|\\\\(?:\\r\\n|[\\s\\S])|(?!\\1)[^\\\\#\\r\\n])*\\1/,\n          greedy: true,\n          inside: {\n            interpolation: interpolation,\n            string: /[\\s\\S]+/\n          }\n        },\n        {\n          pattern: /<<[-~]?([a-z_]\\w*)[\\r\\n](?:.*[\\r\\n])*?[\\t ]*\\1/i,\n          alias: 'heredoc-string',\n          greedy: true,\n          inside: {\n            delimiter: {\n              pattern: /^<<[-~]?[a-z_]\\w*|\\b[a-z_]\\w*$/i,\n              inside: {\n                symbol: /\\b\\w+/,\n                punctuation: /^<<[-~]?/\n              }\n            },\n            interpolation: interpolation,\n            string: /[\\s\\S]+/\n          }\n        },\n        {\n          pattern: /<<[-~]?'([a-z_]\\w*)'[\\r\\n](?:.*[\\r\\n])*?[\\t ]*\\1/i,\n          alias: 'heredoc-string',\n          greedy: true,\n          inside: {\n            delimiter: {\n              pattern: /^<<[-~]?'[a-z_]\\w*'|\\b[a-z_]\\w*$/i,\n              inside: {\n                symbol: /\\b\\w+/,\n                punctuation: /^<<[-~]?'|'$/\n              }\n            },\n            string: /[\\s\\S]+/\n          }\n        }\n      ],\n      'command-literal': [\n        {\n          pattern: RegExp(/%x/.source + percentExpression),\n          greedy: true,\n          inside: {\n            interpolation: interpolation,\n            command: {\n              pattern: /[\\s\\S]+/,\n              alias: 'string'\n            }\n          }\n        },\n        {\n          pattern: /`(?:#\\{[^}]+\\}|#(?!\\{)|\\\\(?:\\r\\n|[\\s\\S])|[^\\\\`#\\r\\n])*`/,\n          greedy: true,\n          inside: {\n            interpolation: interpolation,\n            command: {\n              pattern: /[\\s\\S]+/,\n              alias: 'string'\n            }\n          }\n        }\n      ]\n    })\n    delete Prism.languages.ruby.string\n    Prism.languages.insertBefore('ruby', 'number', {\n      builtin:\n        /\\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\\b/,\n      constant: /\\b[A-Z][A-Z0-9_]*(?:[?!]|\\b)/\n    })\n    Prism.languages.rb = Prism.languages.ruby\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/ruby.js?");

/***/ })

}]);