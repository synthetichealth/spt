"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_cshtml"],{

/***/ "./node_modules/refractor/lang/cshtml.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/cshtml.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorCsharp = __webpack_require__(/*! ./csharp.js */ \"./node_modules/refractor/lang/csharp.js\")\nmodule.exports = cshtml\ncshtml.displayName = 'cshtml'\ncshtml.aliases = ['razor']\nfunction cshtml(Prism) {\n  Prism.register(refractorCsharp)\n  // Docs:\n  // https://docs.microsoft.com/en-us/aspnet/core/razor-pages/?view=aspnetcore-5.0&tabs=visual-studio\n  // https://docs.microsoft.com/en-us/aspnet/core/mvc/views/razor?view=aspnetcore-5.0\n  ;(function (Prism) {\n    var commentLike = /\\/(?![/*])|\\/\\/.*[\\r\\n]|\\/\\*[^*]*(?:\\*(?!\\/)[^*]*)*\\*\\//\n      .source\n    var stringLike =\n      /@(?!\")|\"(?:[^\\r\\n\\\\\"]|\\\\.)*\"|@\"(?:[^\\\\\"]|\"\"|\\\\[\\s\\S])*\"(?!\")/.source +\n      '|' +\n      /'(?:(?:[^\\r\\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'|(?=[^\\\\](?!')))/.source\n    /**\n     * Creates a nested pattern where all occurrences of the string `<<self>>` are replaced with the pattern itself.\n     *\n     * @param {string} pattern\n     * @param {number} depthLog2\n     * @returns {string}\n     */\n    function nested(pattern, depthLog2) {\n      for (var i = 0; i < depthLog2; i++) {\n        pattern = pattern.replace(/<self>/g, function () {\n          return '(?:' + pattern + ')'\n        })\n      }\n      return pattern\n        .replace(/<self>/g, '[^\\\\s\\\\S]')\n        .replace(/<str>/g, '(?:' + stringLike + ')')\n        .replace(/<comment>/g, '(?:' + commentLike + ')')\n    }\n    var round = nested(/\\((?:[^()'\"@/]|<str>|<comment>|<self>)*\\)/.source, 2)\n    var square = nested(/\\[(?:[^\\[\\]'\"@/]|<str>|<comment>|<self>)*\\]/.source, 2)\n    var curly = nested(/\\{(?:[^{}'\"@/]|<str>|<comment>|<self>)*\\}/.source, 2)\n    var angle = nested(/<(?:[^<>'\"@/]|<str>|<comment>|<self>)*>/.source, 2) // Note about the above bracket patterns:\n    // They all ignore HTML expressions that might be in the C# code. This is a problem because HTML (like strings and\n    // comments) is parsed differently. This is a huge problem because HTML might contain brackets and quotes which\n    // messes up the bracket and string counting implemented by the above patterns.\n    //\n    // This problem is not fixable because 1) HTML expression are highly context sensitive and very difficult to detect\n    // and 2) they require one capturing group at every nested level. See the `tagRegion` pattern to admire the\n    // complexity of an HTML expression.\n    //\n    // To somewhat alleviate the problem a bit, the patterns for characters (e.g. 'a') is very permissive, it also\n    // allows invalid characters to support HTML expressions like this: <p>That's it!</p>.\n    var tagAttrs =\n      /(?:\\s(?:\\s*[^\\s>\\/=]+(?:\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))|(?=[\\s/>])))+)?/\n        .source\n    var tagContent = /(?!\\d)[^\\s>\\/=$<%]+/.source + tagAttrs + /\\s*\\/?>/.source\n    var tagRegion =\n      /\\B@?/.source +\n      '(?:' +\n      /<([a-zA-Z][\\w:]*)/.source +\n      tagAttrs +\n      /\\s*>/.source +\n      '(?:' +\n      (/[^<]/.source +\n        '|' + // all tags that are not the start tag\n        // eslint-disable-next-line regexp/strict\n        /<\\/?(?!\\1\\b)/.source +\n        tagContent +\n        '|' + // nested start tag\n        nested(\n          // eslint-disable-next-line regexp/strict\n          /<\\1/.source +\n            tagAttrs +\n            /\\s*>/.source +\n            '(?:' +\n            (/[^<]/.source +\n              '|' + // all tags that are not the start tag\n              // eslint-disable-next-line regexp/strict\n              /<\\/?(?!\\1\\b)/.source +\n              tagContent +\n              '|' +\n              '<self>') +\n            ')*' + // eslint-disable-next-line regexp/strict\n            /<\\/\\1\\s*>/.source,\n          2\n        )) +\n      ')*' + // eslint-disable-next-line regexp/strict\n      /<\\/\\1\\s*>/.source +\n      '|' +\n      /</.source +\n      tagContent +\n      ')' // Now for the actual language definition(s):\n    //\n    // Razor as a language has 2 parts:\n    //  1) CSHTML: A markup-like language that has been extended with inline C# code expressions and blocks.\n    //  2) C#+HTML: A variant of C# that can contain CSHTML tags as expressions.\n    //\n    // In the below code, both CSHTML and C#+HTML will be create as separate language definitions that reference each\n    // other. However, only CSHTML will be exported via `Prism.languages`.\n    Prism.languages.cshtml = Prism.languages.extend('markup', {})\n    var csharpWithHtml = Prism.languages.insertBefore(\n      'csharp',\n      'string',\n      {\n        html: {\n          pattern: RegExp(tagRegion),\n          greedy: true,\n          inside: Prism.languages.cshtml\n        }\n      },\n      {\n        csharp: Prism.languages.extend('csharp', {})\n      }\n    )\n    var cs = {\n      pattern: /\\S[\\s\\S]*/,\n      alias: 'language-csharp',\n      inside: csharpWithHtml\n    }\n    Prism.languages.insertBefore('cshtml', 'prolog', {\n      'razor-comment': {\n        pattern: /@\\*[\\s\\S]*?\\*@/,\n        greedy: true,\n        alias: 'comment'\n      },\n      block: {\n        pattern: RegExp(\n          /(^|[^@])@/.source +\n            '(?:' +\n            [\n              // @{ ... }\n              curly, // @code{ ... }\n              /(?:code|functions)\\s*/.source + curly, // @for (...) { ... }\n              /(?:for|foreach|lock|switch|using|while)\\s*/.source +\n                round +\n                /\\s*/.source +\n                curly, // @do { ... } while (...);\n              /do\\s*/.source +\n                curly +\n                /\\s*while\\s*/.source +\n                round +\n                /(?:\\s*;)?/.source, // @try { ... } catch (...) { ... } finally { ... }\n              /try\\s*/.source +\n                curly +\n                /\\s*catch\\s*/.source +\n                round +\n                /\\s*/.source +\n                curly +\n                /\\s*finally\\s*/.source +\n                curly, // @if (...) {...} else if (...) {...} else {...}\n              /if\\s*/.source +\n                round +\n                /\\s*/.source +\n                curly +\n                '(?:' +\n                /\\s*else/.source +\n                '(?:' +\n                /\\s+if\\s*/.source +\n                round +\n                ')?' +\n                /\\s*/.source +\n                curly +\n                ')*'\n            ].join('|') +\n            ')'\n        ),\n        lookbehind: true,\n        greedy: true,\n        inside: {\n          keyword: /^@\\w*/,\n          csharp: cs\n        }\n      },\n      directive: {\n        pattern:\n          /^([ \\t]*)@(?:addTagHelper|attribute|implements|inherits|inject|layout|model|namespace|page|preservewhitespace|removeTagHelper|section|tagHelperPrefix|using)(?=\\s).*/m,\n        lookbehind: true,\n        greedy: true,\n        inside: {\n          keyword: /^@\\w+/,\n          csharp: cs\n        }\n      },\n      value: {\n        pattern: RegExp(\n          /(^|[^@])@/.source +\n            /(?:await\\b\\s*)?/.source +\n            '(?:' +\n            /\\w+\\b/.source +\n            '|' +\n            round +\n            ')' +\n            '(?:' +\n            /[?!]?\\.\\w+\\b/.source +\n            '|' +\n            round +\n            '|' +\n            square +\n            '|' +\n            angle +\n            round +\n            ')*'\n        ),\n        lookbehind: true,\n        greedy: true,\n        alias: 'variable',\n        inside: {\n          keyword: /^@/,\n          csharp: cs\n        }\n      },\n      'delegate-operator': {\n        pattern: /(^|[^@])@(?=<)/,\n        lookbehind: true,\n        alias: 'operator'\n      }\n    })\n    Prism.languages.razor = Prism.languages.cshtml\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/cshtml.js?");

/***/ })

}]);