"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_textile"],{

/***/ "./node_modules/refractor/lang/textile.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/textile.js ***!
  \************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = textile\ntextile.displayName = 'textile'\ntextile.aliases = []\nfunction textile(Prism) {\n  ;(function (Prism) {\n    // We don't allow for pipes inside parentheses\n    // to not break table pattern |(. foo |). bar |\n    var modifierRegex = /\\([^|()\\n]+\\)|\\[[^\\]\\n]+\\]|\\{[^}\\n]+\\}/.source // Opening and closing parentheses which are not a modifier\n    // This pattern is necessary to prevent exponential backtracking\n    var parenthesesRegex = /\\)|\\((?![^|()\\n]+\\))/.source\n    /**\n     * @param {string} source\n     * @param {string} [flags]\n     */\n    function withModifier(source, flags) {\n      return RegExp(\n        source\n          .replace(/<MOD>/g, function () {\n            return '(?:' + modifierRegex + ')'\n          })\n          .replace(/<PAR>/g, function () {\n            return '(?:' + parenthesesRegex + ')'\n          }),\n        flags || ''\n      )\n    }\n    var modifierTokens = {\n      css: {\n        pattern: /\\{[^{}]+\\}/,\n        inside: {\n          rest: Prism.languages.css\n        }\n      },\n      'class-id': {\n        pattern: /(\\()[^()]+(?=\\))/,\n        lookbehind: true,\n        alias: 'attr-value'\n      },\n      lang: {\n        pattern: /(\\[)[^\\[\\]]+(?=\\])/,\n        lookbehind: true,\n        alias: 'attr-value'\n      },\n      // Anything else is punctuation (the first pattern is for row/col spans inside tables)\n      punctuation: /[\\\\\\/]\\d+|\\S/\n    }\n    var textile = (Prism.languages.textile = Prism.languages.extend('markup', {\n      phrase: {\n        pattern: /(^|\\r|\\n)\\S[\\s\\S]*?(?=$|\\r?\\n\\r?\\n|\\r\\r)/,\n        lookbehind: true,\n        inside: {\n          // h1. Header 1\n          'block-tag': {\n            pattern: withModifier(/^[a-z]\\w*(?:<MOD>|<PAR>|[<>=])*\\./.source),\n            inside: {\n              modifier: {\n                pattern: withModifier(\n                  /(^[a-z]\\w*)(?:<MOD>|<PAR>|[<>=])+(?=\\.)/.source\n                ),\n                lookbehind: true,\n                inside: modifierTokens\n              },\n              tag: /^[a-z]\\w*/,\n              punctuation: /\\.$/\n            }\n          },\n          // # List item\n          // * List item\n          list: {\n            pattern: withModifier(/^[*#]+<MOD>*\\s+\\S.*/.source, 'm'),\n            inside: {\n              modifier: {\n                pattern: withModifier(/(^[*#]+)<MOD>+/.source),\n                lookbehind: true,\n                inside: modifierTokens\n              },\n              punctuation: /^[*#]+/\n            }\n          },\n          // | cell | cell | cell |\n          table: {\n            // Modifiers can be applied to the row: {color:red}.|1|2|3|\n            // or the cell: |{color:red}.1|2|3|\n            pattern: withModifier(\n              /^(?:(?:<MOD>|<PAR>|[<>=^~])+\\.\\s*)?(?:\\|(?:(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+\\.|(?!(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+\\.))[^|]*)+\\|/\n                .source,\n              'm'\n            ),\n            inside: {\n              modifier: {\n                // Modifiers for rows after the first one are\n                // preceded by a pipe and a line feed\n                pattern: withModifier(\n                  /(^|\\|(?:\\r?\\n|\\r)?)(?:<MOD>|<PAR>|[<>=^~_]|[\\\\/]\\d+)+(?=\\.)/\n                    .source\n                ),\n                lookbehind: true,\n                inside: modifierTokens\n              },\n              punctuation: /\\||^\\./\n            }\n          },\n          inline: {\n            // eslint-disable-next-line regexp/no-super-linear-backtracking\n            pattern: withModifier(\n              /(^|[^a-zA-Z\\d])(\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>*.+?\\2(?![a-zA-Z\\d])/\n                .source\n            ),\n            lookbehind: true,\n            inside: {\n              // Note: superscripts and subscripts are not handled specifically\n              // *bold*, **bold**\n              bold: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^(\\*\\*?)<MOD>*).+?(?=\\2)/.source),\n                lookbehind: true\n              },\n              // _italic_, __italic__\n              italic: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^(__?)<MOD>*).+?(?=\\2)/.source),\n                lookbehind: true\n              },\n              // ??cite??\n              cite: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^\\?\\?<MOD>*).+?(?=\\?\\?)/.source),\n                lookbehind: true,\n                alias: 'string'\n              },\n              // @code@\n              code: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^@<MOD>*).+?(?=@)/.source),\n                lookbehind: true,\n                alias: 'keyword'\n              },\n              // +inserted+\n              inserted: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^\\+<MOD>*).+?(?=\\+)/.source),\n                lookbehind: true\n              },\n              // -deleted-\n              deleted: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^-<MOD>*).+?(?=-)/.source),\n                lookbehind: true\n              },\n              // %span%\n              span: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^%<MOD>*).+?(?=%)/.source),\n                lookbehind: true\n              },\n              modifier: {\n                pattern: withModifier(\n                  /(^\\*\\*|__|\\?\\?|[*_%@+\\-^~])<MOD>+/.source\n                ),\n                lookbehind: true,\n                inside: modifierTokens\n              },\n              punctuation: /[*_%?@+\\-^~]+/\n            }\n          },\n          // [alias]http://example.com\n          'link-ref': {\n            pattern: /^\\[[^\\]]+\\]\\S+$/m,\n            inside: {\n              string: {\n                pattern: /(^\\[)[^\\]]+(?=\\])/,\n                lookbehind: true\n              },\n              url: {\n                pattern: /(^\\])\\S+$/,\n                lookbehind: true\n              },\n              punctuation: /[\\[\\]]/\n            }\n          },\n          // \"text\":http://example.com\n          // \"text\":link-ref\n          link: {\n            // eslint-disable-next-line regexp/no-super-linear-backtracking\n            pattern: withModifier(\n              /\"<MOD>*[^\"]+\":.+?(?=[^\\w/]?(?:\\s|$))/.source\n            ),\n            inside: {\n              text: {\n                // eslint-disable-next-line regexp/no-super-linear-backtracking\n                pattern: withModifier(/(^\"<MOD>*)[^\"]+(?=\")/.source),\n                lookbehind: true\n              },\n              modifier: {\n                pattern: withModifier(/(^\")<MOD>+/.source),\n                lookbehind: true,\n                inside: modifierTokens\n              },\n              url: {\n                pattern: /(:).+/,\n                lookbehind: true\n              },\n              punctuation: /[\":]/\n            }\n          },\n          // !image.jpg!\n          // !image.jpg(Title)!:http://example.com\n          image: {\n            pattern: withModifier(\n              /!(?:<MOD>|<PAR>|[<>=])*(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?!(?::.+?(?=[^\\w/]?(?:\\s|$)))?/\n                .source\n            ),\n            inside: {\n              source: {\n                pattern: withModifier(\n                  /(^!(?:<MOD>|<PAR>|[<>=])*)(?![<>=])[^!\\s()]+(?:\\([^)]+\\))?(?=!)/\n                    .source\n                ),\n                lookbehind: true,\n                alias: 'url'\n              },\n              modifier: {\n                pattern: withModifier(/(^!)(?:<MOD>|<PAR>|[<>=])+/.source),\n                lookbehind: true,\n                inside: modifierTokens\n              },\n              url: {\n                pattern: /(:).+/,\n                lookbehind: true\n              },\n              punctuation: /[!:]/\n            }\n          },\n          // Footnote[1]\n          footnote: {\n            pattern: /\\b\\[\\d+\\]/,\n            alias: 'comment',\n            inside: {\n              punctuation: /\\[|\\]/\n            }\n          },\n          // CSS(Cascading Style Sheet)\n          acronym: {\n            pattern: /\\b[A-Z\\d]+\\([^)]+\\)/,\n            inside: {\n              comment: {\n                pattern: /(\\()[^()]+(?=\\))/,\n                lookbehind: true\n              },\n              punctuation: /[()]/\n            }\n          },\n          // Prism(C)\n          mark: {\n            pattern: /\\b\\((?:C|R|TM)\\)/,\n            alias: 'comment',\n            inside: {\n              punctuation: /[()]/\n            }\n          }\n        }\n      }\n    }))\n    var phraseInside = textile['phrase'].inside\n    var nestedPatterns = {\n      inline: phraseInside['inline'],\n      link: phraseInside['link'],\n      image: phraseInside['image'],\n      footnote: phraseInside['footnote'],\n      acronym: phraseInside['acronym'],\n      mark: phraseInside['mark']\n    } // Only allow alpha-numeric HTML tags, not XML tags\n    textile.tag.pattern =\n      /<\\/?(?!\\d)[a-z0-9]+(?:\\s+[^\\s>\\/=]+(?:=(?:(\"|')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|[^\\s'\">=]+))?)*\\s*\\/?>/i // Allow some nesting\n    var phraseInlineInside = phraseInside['inline'].inside\n    phraseInlineInside['bold'].inside = nestedPatterns\n    phraseInlineInside['italic'].inside = nestedPatterns\n    phraseInlineInside['inserted'].inside = nestedPatterns\n    phraseInlineInside['deleted'].inside = nestedPatterns\n    phraseInlineInside['span'].inside = nestedPatterns // Allow some styles inside table cells\n    var phraseTableInside = phraseInside['table'].inside\n    phraseTableInside['inline'] = nestedPatterns['inline']\n    phraseTableInside['link'] = nestedPatterns['link']\n    phraseTableInside['image'] = nestedPatterns['image']\n    phraseTableInside['footnote'] = nestedPatterns['footnote']\n    phraseTableInside['acronym'] = nestedPatterns['acronym']\n    phraseTableInside['mark'] = nestedPatterns['mark']\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/textile.js?");

/***/ })

}]);