"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_javadoc"],{

/***/ "./node_modules/refractor/lang/java.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/java.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = java\njava.displayName = 'java'\njava.aliases = []\nfunction java(Prism) {\n  ;(function (Prism) {\n    var keywords =\n      /\\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\\b/ // full package (optional) + parent classes (optional)\n    var classNamePrefix = /(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*/\n      .source // based on the java naming conventions\n    var className = {\n      pattern: RegExp(classNamePrefix + /[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b/.source),\n      lookbehind: true,\n      inside: {\n        namespace: {\n          pattern: /^[a-z]\\w*(?:\\s*\\.\\s*[a-z]\\w*)*(?:\\s*\\.)?/,\n          inside: {\n            punctuation: /\\./\n          }\n        },\n        punctuation: /\\./\n      }\n    }\n    Prism.languages.java = Prism.languages.extend('clike', {\n      string: {\n        pattern: /(^|[^\\\\])\"(?:\\\\.|[^\"\\\\\\r\\n])*\"/,\n        lookbehind: true,\n        greedy: true\n      },\n      'class-name': [\n        className,\n        {\n          // variables and parameters\n          // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)\n          pattern: RegExp(\n            classNamePrefix + /[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()])/.source\n          ),\n          lookbehind: true,\n          inside: className.inside\n        }\n      ],\n      keyword: keywords,\n      function: [\n        Prism.languages.clike.function,\n        {\n          pattern: /(::\\s*)[a-z_]\\w*/,\n          lookbehind: true\n        }\n      ],\n      number:\n        /\\b0b[01][01_]*L?\\b|\\b0x(?:\\.[\\da-f_p+-]+|[\\da-f_]+(?:\\.[\\da-f_p+-]+)?)\\b|(?:\\b\\d[\\d_]*(?:\\.[\\d_]*)?|\\B\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[dfl]?/i,\n      operator: {\n        pattern:\n          /(^|[^.])(?:<<=?|>>>?=?|->|--|\\+\\+|&&|\\|\\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,\n        lookbehind: true\n      }\n    })\n    Prism.languages.insertBefore('java', 'string', {\n      'triple-quoted-string': {\n        // http://openjdk.java.net/jeps/355#Description\n        pattern: /\"\"\"[ \\t]*[\\r\\n](?:(?:\"|\"\")?(?:\\\\.|[^\"\\\\]))*\"\"\"/,\n        greedy: true,\n        alias: 'string'\n      },\n      char: {\n        pattern: /'(?:\\\\.|[^'\\\\\\r\\n]){1,6}'/,\n        greedy: true\n      }\n    })\n    Prism.languages.insertBefore('java', 'class-name', {\n      annotation: {\n        pattern: /(^|[^.])@\\w+(?:\\s*\\.\\s*\\w+)*/,\n        lookbehind: true,\n        alias: 'punctuation'\n      },\n      generics: {\n        pattern:\n          /<(?:[\\w\\s,.?]|&(?!&)|<(?:[\\w\\s,.?]|&(?!&)|<(?:[\\w\\s,.?]|&(?!&)|<(?:[\\w\\s,.?]|&(?!&))*>)*>)*>)*>/,\n        inside: {\n          'class-name': className,\n          keyword: keywords,\n          punctuation: /[<>(),.:]/,\n          operator: /[?&|]/\n        }\n      },\n      namespace: {\n        pattern: RegExp(\n          /(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?/.source.replace(\n            /<keyword>/g,\n            function () {\n              return keywords.source\n            }\n          )\n        ),\n        lookbehind: true,\n        inside: {\n          punctuation: /\\./\n        }\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/java.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/javadoc.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/javadoc.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorJava = __webpack_require__(/*! ./java.js */ \"./node_modules/refractor/lang/java.js\")\nvar refractorJavadoclike = __webpack_require__(/*! ./javadoclike.js */ \"./node_modules/refractor/lang/javadoclike.js\")\nmodule.exports = javadoc\njavadoc.displayName = 'javadoc'\njavadoc.aliases = []\nfunction javadoc(Prism) {\n  Prism.register(refractorJava)\n  Prism.register(refractorJavadoclike)\n  ;(function (Prism) {\n    var codeLinePattern = /(^(?:[\\t ]*(?:\\*\\s*)*))[^*\\s].*$/m\n    var memberReference = /#\\s*\\w+(?:\\s*\\([^()]*\\))?/.source\n    var reference =\n      /(?:\\b[a-zA-Z]\\w+\\s*\\.\\s*)*\\b[A-Z]\\w*(?:\\s*<mem>)?|<mem>/.source.replace(\n        /<mem>/g,\n        function () {\n          return memberReference\n        }\n      )\n    Prism.languages.javadoc = Prism.languages.extend('javadoclike', {})\n    Prism.languages.insertBefore('javadoc', 'keyword', {\n      reference: {\n        pattern: RegExp(\n          /(@(?:exception|link|linkplain|see|throws|value)\\s+(?:\\*\\s*)?)/\n            .source +\n            '(?:' +\n            reference +\n            ')'\n        ),\n        lookbehind: true,\n        inside: {\n          function: {\n            pattern: /(#\\s*)\\w+(?=\\s*\\()/,\n            lookbehind: true\n          },\n          field: {\n            pattern: /(#\\s*)\\w+/,\n            lookbehind: true\n          },\n          namespace: {\n            pattern: /\\b(?:[a-z]\\w*\\s*\\.\\s*)+/,\n            inside: {\n              punctuation: /\\./\n            }\n          },\n          'class-name': /\\b[A-Z]\\w*/,\n          keyword: Prism.languages.java.keyword,\n          punctuation: /[#()[\\],.]/\n        }\n      },\n      'class-name': {\n        // @param <T> the first generic type parameter\n        pattern: /(@param\\s+)<[A-Z]\\w*>/,\n        lookbehind: true,\n        inside: {\n          punctuation: /[.<>]/\n        }\n      },\n      'code-section': [\n        {\n          pattern:\n            /(\\{@code\\s+(?!\\s))(?:[^\\s{}]|\\s+(?![\\s}])|\\{(?:[^{}]|\\{(?:[^{}]|\\{(?:[^{}]|\\{[^{}]*\\})*\\})*\\})*\\})+(?=\\s*\\})/,\n          lookbehind: true,\n          inside: {\n            code: {\n              // there can't be any HTML inside of {@code} tags\n              pattern: codeLinePattern,\n              lookbehind: true,\n              inside: Prism.languages.java,\n              alias: 'language-java'\n            }\n          }\n        },\n        {\n          pattern:\n            /(<(code|pre|tt)>(?!<code>)\\s*)\\S(?:\\S|\\s+\\S)*?(?=\\s*<\\/\\2>)/,\n          lookbehind: true,\n          inside: {\n            line: {\n              pattern: codeLinePattern,\n              lookbehind: true,\n              inside: {\n                // highlight HTML tags and entities\n                tag: Prism.languages.markup.tag,\n                entity: Prism.languages.markup.entity,\n                code: {\n                  // everything else is Java code\n                  pattern: /.+/,\n                  inside: Prism.languages.java,\n                  alias: 'language-java'\n                }\n              }\n            }\n          }\n        }\n      ],\n      tag: Prism.languages.markup.tag,\n      entity: Prism.languages.markup.entity\n    })\n    Prism.languages.javadoclike.addSupport('java', Prism.languages.javadoc)\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/javadoc.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/javadoclike.js":
/*!****************************************************!*\
  !*** ./node_modules/refractor/lang/javadoclike.js ***!
  \****************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = javadoclike\njavadoclike.displayName = 'javadoclike'\njavadoclike.aliases = []\nfunction javadoclike(Prism) {\n  ;(function (Prism) {\n    var javaDocLike = (Prism.languages.javadoclike = {\n      parameter: {\n        pattern:\n          /(^[\\t ]*(?:\\/{3}|\\*|\\/\\*\\*)\\s*@(?:arg|arguments|param)\\s+)\\w+/m,\n        lookbehind: true\n      },\n      keyword: {\n        // keywords are the first word in a line preceded be an `@` or surrounded by curly braces.\n        // @word, {@word}\n        pattern: /(^[\\t ]*(?:\\/{3}|\\*|\\/\\*\\*)\\s*|\\{)@[a-z][a-zA-Z-]+\\b/m,\n        lookbehind: true\n      },\n      punctuation: /[{}]/\n    })\n    /**\n     * Adds doc comment support to the given language and calls a given callback on each doc comment pattern.\n     *\n     * @param {string} lang the language add doc comment support to.\n     * @param {(pattern: {inside: {rest: undefined}}) => void} callback the function called with each doc comment pattern as argument.\n     */\n    function docCommentSupport(lang, callback) {\n      var tokenName = 'doc-comment'\n      var grammar = Prism.languages[lang]\n      if (!grammar) {\n        return\n      }\n      var token = grammar[tokenName]\n      if (!token) {\n        // add doc comment: /** */\n        var definition = {}\n        definition[tokenName] = {\n          pattern: /(^|[^\\\\])\\/\\*\\*[^/][\\s\\S]*?(?:\\*\\/|$)/,\n          lookbehind: true,\n          alias: 'comment'\n        }\n        grammar = Prism.languages.insertBefore(lang, 'comment', definition)\n        token = grammar[tokenName]\n      }\n      if (token instanceof RegExp) {\n        // convert regex to object\n        token = grammar[tokenName] = {\n          pattern: token\n        }\n      }\n      if (Array.isArray(token)) {\n        for (var i = 0, l = token.length; i < l; i++) {\n          if (token[i] instanceof RegExp) {\n            token[i] = {\n              pattern: token[i]\n            }\n          }\n          callback(token[i])\n        }\n      } else {\n        callback(token)\n      }\n    }\n    /**\n     * Adds doc-comment support to the given languages for the given documentation language.\n     *\n     * @param {string[]|string} languages\n     * @param {Object} docLanguage\n     */\n    function addSupport(languages, docLanguage) {\n      if (typeof languages === 'string') {\n        languages = [languages]\n      }\n      languages.forEach(function (lang) {\n        docCommentSupport(lang, function (pattern) {\n          if (!pattern.inside) {\n            pattern.inside = {}\n          }\n          pattern.inside.rest = docLanguage\n        })\n      })\n    }\n    Object.defineProperty(javaDocLike, 'addSupport', {\n      value: addSupport\n    })\n    javaDocLike.addSupport(['java', 'javascript', 'php'], javaDocLike)\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/javadoclike.js?");

/***/ })

}]);