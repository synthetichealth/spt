"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_java"],{

/***/ "./node_modules/refractor/lang/java.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/java.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = java\njava.displayName = 'java'\njava.aliases = []\nfunction java(Prism) {\n  ;(function (Prism) {\n    var keywords =\n      /\\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\\b/ // full package (optional) + parent classes (optional)\n    var classNamePrefix = /(^|[^\\w.])(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*/\n      .source // based on the java naming conventions\n    var className = {\n      pattern: RegExp(classNamePrefix + /[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b/.source),\n      lookbehind: true,\n      inside: {\n        namespace: {\n          pattern: /^[a-z]\\w*(?:\\s*\\.\\s*[a-z]\\w*)*(?:\\s*\\.)?/,\n          inside: {\n            punctuation: /\\./\n          }\n        },\n        punctuation: /\\./\n      }\n    }\n    Prism.languages.java = Prism.languages.extend('clike', {\n      string: {\n        pattern: /(^|[^\\\\])\"(?:\\\\.|[^\"\\\\\\r\\n])*\"/,\n        lookbehind: true,\n        greedy: true\n      },\n      'class-name': [\n        className,\n        {\n          // variables and parameters\n          // this to support class names (or generic parameters) which do not contain a lower case letter (also works for methods)\n          pattern: RegExp(\n            classNamePrefix + /[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()])/.source\n          ),\n          lookbehind: true,\n          inside: className.inside\n        }\n      ],\n      keyword: keywords,\n      function: [\n        Prism.languages.clike.function,\n        {\n          pattern: /(::\\s*)[a-z_]\\w*/,\n          lookbehind: true\n        }\n      ],\n      number:\n        /\\b0b[01][01_]*L?\\b|\\b0x(?:\\.[\\da-f_p+-]+|[\\da-f_]+(?:\\.[\\da-f_p+-]+)?)\\b|(?:\\b\\d[\\d_]*(?:\\.[\\d_]*)?|\\B\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[dfl]?/i,\n      operator: {\n        pattern:\n          /(^|[^.])(?:<<=?|>>>?=?|->|--|\\+\\+|&&|\\|\\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,\n        lookbehind: true\n      }\n    })\n    Prism.languages.insertBefore('java', 'string', {\n      'triple-quoted-string': {\n        // http://openjdk.java.net/jeps/355#Description\n        pattern: /\"\"\"[ \\t]*[\\r\\n](?:(?:\"|\"\")?(?:\\\\.|[^\"\\\\]))*\"\"\"/,\n        greedy: true,\n        alias: 'string'\n      },\n      char: {\n        pattern: /'(?:\\\\.|[^'\\\\\\r\\n]){1,6}'/,\n        greedy: true\n      }\n    })\n    Prism.languages.insertBefore('java', 'class-name', {\n      annotation: {\n        pattern: /(^|[^.])@\\w+(?:\\s*\\.\\s*\\w+)*/,\n        lookbehind: true,\n        alias: 'punctuation'\n      },\n      generics: {\n        pattern:\n          /<(?:[\\w\\s,.?]|&(?!&)|<(?:[\\w\\s,.?]|&(?!&)|<(?:[\\w\\s,.?]|&(?!&)|<(?:[\\w\\s,.?]|&(?!&))*>)*>)*>)*>/,\n        inside: {\n          'class-name': className,\n          keyword: keywords,\n          punctuation: /[<>(),.:]/,\n          operator: /[?&|]/\n        }\n      },\n      namespace: {\n        pattern: RegExp(\n          /(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?/.source.replace(\n            /<keyword>/g,\n            function () {\n              return keywords.source\n            }\n          )\n        ),\n        lookbehind: true,\n        inside: {\n          punctuation: /\\./\n        }\n      }\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/java.js?");

/***/ })

}]);