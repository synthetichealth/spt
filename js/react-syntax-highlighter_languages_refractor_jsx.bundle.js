"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_jsx"],{

/***/ "./node_modules/refractor/lang/jsx.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/jsx.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = jsx\njsx.displayName = 'jsx'\njsx.aliases = []\nfunction jsx(Prism) {\n  ;(function (Prism) {\n    var javascript = Prism.util.clone(Prism.languages.javascript)\n    var space = /(?:\\s|\\/\\/.*(?!.)|\\/\\*(?:[^*]|\\*(?!\\/))\\*\\/)/.source\n    var braces = /(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})/.source\n    var spread = /(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})/.source\n    /**\n     * @param {string} source\n     * @param {string} [flags]\n     */\n    function re(source, flags) {\n      source = source\n        .replace(/<S>/g, function () {\n          return space\n        })\n        .replace(/<BRACES>/g, function () {\n          return braces\n        })\n        .replace(/<SPREAD>/g, function () {\n          return spread\n        })\n      return RegExp(source, flags)\n    }\n    spread = re(spread).source\n    Prism.languages.jsx = Prism.languages.extend('markup', javascript)\n    Prism.languages.jsx.tag.pattern = re(\n      /<\\/?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:\"(?:\\\\[\\s\\S]|[^\\\\\"])*\"|'(?:\\\\[\\s\\S]|[^\\\\'])*'|[^\\s{'\"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\\/?)?>/\n        .source\n    )\n    Prism.languages.jsx.tag.inside['tag'].pattern = /^<\\/?[^\\s>\\/]*/\n    Prism.languages.jsx.tag.inside['attr-value'].pattern =\n      /=(?!\\{)(?:\"(?:\\\\[\\s\\S]|[^\\\\\"])*\"|'(?:\\\\[\\s\\S]|[^\\\\'])*'|[^\\s'\">]+)/\n    Prism.languages.jsx.tag.inside['tag'].inside['class-name'] =\n      /^[A-Z]\\w*(?:\\.[A-Z]\\w*)*$/\n    Prism.languages.jsx.tag.inside['comment'] = javascript['comment']\n    Prism.languages.insertBefore(\n      'inside',\n      'attr-name',\n      {\n        spread: {\n          pattern: re(/<SPREAD>/.source),\n          inside: Prism.languages.jsx\n        }\n      },\n      Prism.languages.jsx.tag\n    )\n    Prism.languages.insertBefore(\n      'inside',\n      'special-attr',\n      {\n        script: {\n          // Allow for two levels of nesting\n          pattern: re(/=<BRACES>/.source),\n          alias: 'language-javascript',\n          inside: {\n            'script-punctuation': {\n              pattern: /^=(?=\\{)/,\n              alias: 'punctuation'\n            },\n            rest: Prism.languages.jsx\n          }\n        }\n      },\n      Prism.languages.jsx.tag\n    ) // The following will handle plain text inside tags\n    var stringifyToken = function (token) {\n      if (!token) {\n        return ''\n      }\n      if (typeof token === 'string') {\n        return token\n      }\n      if (typeof token.content === 'string') {\n        return token.content\n      }\n      return token.content.map(stringifyToken).join('')\n    }\n    var walkTokens = function (tokens) {\n      var openedTags = []\n      for (var i = 0; i < tokens.length; i++) {\n        var token = tokens[i]\n        var notTagNorBrace = false\n        if (typeof token !== 'string') {\n          if (\n            token.type === 'tag' &&\n            token.content[0] &&\n            token.content[0].type === 'tag'\n          ) {\n            // We found a tag, now find its kind\n            if (token.content[0].content[0].content === '</') {\n              // Closing tag\n              if (\n                openedTags.length > 0 &&\n                openedTags[openedTags.length - 1].tagName ===\n                  stringifyToken(token.content[0].content[1])\n              ) {\n                // Pop matching opening tag\n                openedTags.pop()\n              }\n            } else {\n              if (token.content[token.content.length - 1].content === '/>') {\n                // Autoclosed tag, ignore\n              } else {\n                // Opening tag\n                openedTags.push({\n                  tagName: stringifyToken(token.content[0].content[1]),\n                  openedBraces: 0\n                })\n              }\n            }\n          } else if (\n            openedTags.length > 0 &&\n            token.type === 'punctuation' &&\n            token.content === '{'\n          ) {\n            // Here we might have entered a JSX context inside a tag\n            openedTags[openedTags.length - 1].openedBraces++\n          } else if (\n            openedTags.length > 0 &&\n            openedTags[openedTags.length - 1].openedBraces > 0 &&\n            token.type === 'punctuation' &&\n            token.content === '}'\n          ) {\n            // Here we might have left a JSX context inside a tag\n            openedTags[openedTags.length - 1].openedBraces--\n          } else {\n            notTagNorBrace = true\n          }\n        }\n        if (notTagNorBrace || typeof token === 'string') {\n          if (\n            openedTags.length > 0 &&\n            openedTags[openedTags.length - 1].openedBraces === 0\n          ) {\n            // Here we are inside a tag, and not inside a JSX context.\n            // That's plain text: drop any tokens matched.\n            var plainText = stringifyToken(token) // And merge text with adjacent text\n            if (\n              i < tokens.length - 1 &&\n              (typeof tokens[i + 1] === 'string' ||\n                tokens[i + 1].type === 'plain-text')\n            ) {\n              plainText += stringifyToken(tokens[i + 1])\n              tokens.splice(i + 1, 1)\n            }\n            if (\n              i > 0 &&\n              (typeof tokens[i - 1] === 'string' ||\n                tokens[i - 1].type === 'plain-text')\n            ) {\n              plainText = stringifyToken(tokens[i - 1]) + plainText\n              tokens.splice(i - 1, 1)\n              i--\n            }\n            tokens[i] = new Prism.Token(\n              'plain-text',\n              plainText,\n              null,\n              plainText\n            )\n          }\n        }\n        if (token.content && typeof token.content !== 'string') {\n          walkTokens(token.content)\n        }\n      }\n    }\n    Prism.hooks.add('after-tokenize', function (env) {\n      if (env.language !== 'jsx' && env.language !== 'tsx') {\n        return\n      }\n      walkTokens(env.tokens)\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/jsx.js?");

/***/ })

}]);