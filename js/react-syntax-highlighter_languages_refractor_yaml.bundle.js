"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_yaml"],{

/***/ "./node_modules/refractor/lang/yaml.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/yaml.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = yaml\nyaml.displayName = 'yaml'\nyaml.aliases = ['yml']\nfunction yaml(Prism) {\n  ;(function (Prism) {\n    // https://yaml.org/spec/1.2/spec.html#c-ns-anchor-property\n    // https://yaml.org/spec/1.2/spec.html#c-ns-alias-node\n    var anchorOrAlias = /[*&][^\\s[\\]{},]+/ // https://yaml.org/spec/1.2/spec.html#c-ns-tag-property\n    var tag =\n      /!(?:<[\\w\\-%#;/?:@&=+$,.!~*'()[\\]]+>|(?:[a-zA-Z\\d-]*!)?[\\w\\-%#;/?:@&=+$.~*'()]+)?/ // https://yaml.org/spec/1.2/spec.html#c-ns-properties(n,c)\n    var properties =\n      '(?:' +\n      tag.source +\n      '(?:[ \\t]+' +\n      anchorOrAlias.source +\n      ')?|' +\n      anchorOrAlias.source +\n      '(?:[ \\t]+' +\n      tag.source +\n      ')?)' // https://yaml.org/spec/1.2/spec.html#ns-plain(n,c)\n    // This is a simplified version that doesn't support \"#\" and multiline keys\n    // All these long scarry character classes are simplified versions of YAML's characters\n    var plainKey =\n      /(?:[^\\s\\x00-\\x08\\x0e-\\x1f!\"#%&'*,\\-:>?@[\\]`{|}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]|[?:-]<PLAIN>)(?:[ \\t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(\n        /<PLAIN>/g,\n        function () {\n          return /[^\\s\\x00-\\x08\\x0e-\\x1f,[\\]{}\\x7f-\\x84\\x86-\\x9f\\ud800-\\udfff\\ufffe\\uffff]/\n            .source\n        }\n      )\n    var string = /\"(?:[^\"\\\\\\r\\n]|\\\\.)*\"|'(?:[^'\\\\\\r\\n]|\\\\.)*'/.source\n    /**\n     *\n     * @param {string} value\n     * @param {string} [flags]\n     * @returns {RegExp}\n     */\n    function createValuePattern(value, flags) {\n      flags = (flags || '').replace(/m/g, '') + 'm' // add m flag\n      var pattern =\n        /([:\\-,[{]\\s*(?:\\s<<prop>>[ \\t]+)?)(?:<<value>>)(?=[ \\t]*(?:$|,|\\]|\\}|(?:[\\r\\n]\\s*)?#))/.source\n          .replace(/<<prop>>/g, function () {\n            return properties\n          })\n          .replace(/<<value>>/g, function () {\n            return value\n          })\n      return RegExp(pattern, flags)\n    }\n    Prism.languages.yaml = {\n      scalar: {\n        pattern: RegExp(\n          /([\\-:]\\s*(?:\\s<<prop>>[ \\t]+)?[|>])[ \\t]*(?:((?:\\r?\\n|\\r)[ \\t]+)\\S[^\\r\\n]*(?:\\2[^\\r\\n]+)*)/.source.replace(\n            /<<prop>>/g,\n            function () {\n              return properties\n            }\n          )\n        ),\n        lookbehind: true,\n        alias: 'string'\n      },\n      comment: /#.*/,\n      key: {\n        pattern: RegExp(\n          /((?:^|[:\\-,[{\\r\\n?])[ \\t]*(?:<<prop>>[ \\t]+)?)<<key>>(?=\\s*:\\s)/.source\n            .replace(/<<prop>>/g, function () {\n              return properties\n            })\n            .replace(/<<key>>/g, function () {\n              return '(?:' + plainKey + '|' + string + ')'\n            })\n        ),\n        lookbehind: true,\n        greedy: true,\n        alias: 'atrule'\n      },\n      directive: {\n        pattern: /(^[ \\t]*)%.+/m,\n        lookbehind: true,\n        alias: 'important'\n      },\n      datetime: {\n        pattern: createValuePattern(\n          /\\d{4}-\\d\\d?-\\d\\d?(?:[tT]|[ \\t]+)\\d\\d?:\\d{2}:\\d{2}(?:\\.\\d*)?(?:[ \\t]*(?:Z|[-+]\\d\\d?(?::\\d{2})?))?|\\d{4}-\\d{2}-\\d{2}|\\d\\d?:\\d{2}(?::\\d{2}(?:\\.\\d*)?)?/\n            .source\n        ),\n        lookbehind: true,\n        alias: 'number'\n      },\n      boolean: {\n        pattern: createValuePattern(/false|true/.source, 'i'),\n        lookbehind: true,\n        alias: 'important'\n      },\n      null: {\n        pattern: createValuePattern(/null|~/.source, 'i'),\n        lookbehind: true,\n        alias: 'important'\n      },\n      string: {\n        pattern: createValuePattern(string),\n        lookbehind: true,\n        greedy: true\n      },\n      number: {\n        pattern: createValuePattern(\n          /[+-]?(?:0x[\\da-f]+|0o[0-7]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?|\\.inf|\\.nan)/\n            .source,\n          'i'\n        ),\n        lookbehind: true\n      },\n      tag: tag,\n      important: anchorOrAlias,\n      punctuation: /---|[:[\\]{}\\-,|>?]|\\.\\.\\./\n    }\n    Prism.languages.yml = Prism.languages.yaml\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/yaml.js?");

/***/ })

}]);