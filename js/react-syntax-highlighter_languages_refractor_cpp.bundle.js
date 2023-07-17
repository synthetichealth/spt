"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_cpp"],{

/***/ "./node_modules/refractor/lang/c.js":
/*!******************************************!*\
  !*** ./node_modules/refractor/lang/c.js ***!
  \******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = c\nc.displayName = 'c'\nc.aliases = []\nfunction c(Prism) {\n  Prism.languages.c = Prism.languages.extend('clike', {\n    comment: {\n      pattern:\n        /\\/\\/(?:[^\\r\\n\\\\]|\\\\(?:\\r\\n?|\\n|(?![\\r\\n])))*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n      greedy: true\n    },\n    string: {\n      // https://en.cppreference.com/w/c/language/string_literal\n      pattern: /\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\"\\\\\\r\\n])*\"/,\n      greedy: true\n    },\n    'class-name': {\n      pattern:\n        /(\\b(?:enum|struct)\\s+(?:__attribute__\\s*\\(\\([\\s\\S]*?\\)\\)\\s*)?)\\w+|\\b[a-z]\\w*_t\\b/,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\\b/,\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n    number:\n      /(?:\\b0x(?:[\\da-f]+(?:\\.[\\da-f]*)?|\\.[\\da-f]+)(?:p[+-]?\\d+)?|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?)[ful]{0,4}/i,\n    operator: />>=?|<<=?|->|([-+&|:])\\1|[?:~]|[-+*/%&|^!=<>]=?/\n  })\n  Prism.languages.insertBefore('c', 'string', {\n    char: {\n      // https://en.cppreference.com/w/c/language/character_constant\n      pattern: /'(?:\\\\(?:\\r\\n|[\\s\\S])|[^'\\\\\\r\\n]){0,32}'/,\n      greedy: true\n    }\n  })\n  Prism.languages.insertBefore('c', 'string', {\n    macro: {\n      // allow for multiline macro definitions\n      // spaces after the # character compile fine with gcc\n      pattern:\n        /(^[\\t ]*)#\\s*[a-z](?:[^\\r\\n\\\\/]|\\/(?!\\*)|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/|\\\\(?:\\r\\n|[\\s\\S]))*/im,\n      lookbehind: true,\n      greedy: true,\n      alias: 'property',\n      inside: {\n        string: [\n          {\n            // highlight the path of the include statement as a string\n            pattern: /^(#\\s*include\\s*)<[^>]+>/,\n            lookbehind: true\n          },\n          Prism.languages.c['string']\n        ],\n        char: Prism.languages.c['char'],\n        comment: Prism.languages.c['comment'],\n        'macro-name': [\n          {\n            pattern: /(^#\\s*define\\s+)\\w+\\b(?!\\()/i,\n            lookbehind: true\n          },\n          {\n            pattern: /(^#\\s*define\\s+)\\w+\\b(?=\\()/i,\n            lookbehind: true,\n            alias: 'function'\n          }\n        ],\n        // highlight macro directives as keywords\n        directive: {\n          pattern: /^(#\\s*)[a-z]+/,\n          lookbehind: true,\n          alias: 'keyword'\n        },\n        'directive-hash': /^#/,\n        punctuation: /##|\\\\(?=[\\r\\n])/,\n        expression: {\n          pattern: /\\S[\\s\\S]*/,\n          inside: Prism.languages.c\n        }\n      }\n    }\n  })\n  Prism.languages.insertBefore('c', 'function', {\n    // highlight predefined macros as constants\n    constant:\n      /\\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\\b/\n  })\n  delete Prism.languages.c['boolean']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/c.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/cpp.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/cpp.js ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

eval("\nvar refractorC = __webpack_require__(/*! ./c.js */ \"./node_modules/refractor/lang/c.js\")\nmodule.exports = cpp\ncpp.displayName = 'cpp'\ncpp.aliases = []\nfunction cpp(Prism) {\n  Prism.register(refractorC)\n  ;(function (Prism) {\n    var keyword =\n      /\\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\\b/\n    var modName = /\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b/.source.replace(\n      /<keyword>/g,\n      function () {\n        return keyword.source\n      }\n    )\n    Prism.languages.cpp = Prism.languages.extend('c', {\n      'class-name': [\n        {\n          pattern: RegExp(\n            /(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+/.source.replace(\n              /<keyword>/g,\n              function () {\n                return keyword.source\n              }\n            )\n          ),\n          lookbehind: true\n        }, // This is intended to capture the class name of method implementations like:\n        //   void foo::bar() const {}\n        // However! The `foo` in the above example could also be a namespace, so we only capture the class name if\n        // it starts with an uppercase letter. This approximation should give decent results.\n        /\\b[A-Z]\\w*(?=\\s*::\\s*\\w+\\s*\\()/, // This will capture the class name before destructors like:\n        //   Foo::~Foo() {}\n        /\\b[A-Z_]\\w*(?=\\s*::\\s*~\\w+\\s*\\()/i, // This also intends to capture the class name of method implementations but here the class has template\n        // parameters, so it can't be a namespace (until C++ adds generic namespaces).\n        /\\b\\w+(?=\\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\\s*::\\s*\\w+\\s*\\()/\n      ],\n      keyword: keyword,\n      number: {\n        pattern:\n          /(?:\\b0b[01']+|\\b0x(?:[\\da-f']+(?:\\.[\\da-f']*)?|\\.[\\da-f']+)(?:p[+-]?[\\d']+)?|(?:\\b[\\d']+(?:\\.[\\d']*)?|\\B\\.[\\d']+)(?:e[+-]?[\\d']+)?)[ful]{0,4}/i,\n        greedy: true\n      },\n      operator:\n        />>=?|<<=?|->|--|\\+\\+|&&|\\|\\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\\b/,\n      boolean: /\\b(?:false|true)\\b/\n    })\n    Prism.languages.insertBefore('cpp', 'string', {\n      module: {\n        // https://en.cppreference.com/w/cpp/language/modules\n        pattern: RegExp(\n          /(\\b(?:import|module)\\s+)/.source +\n            '(?:' + // header-name\n            /\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\"\\\\\\r\\n])*\"|<[^<>\\r\\n]*>/.source +\n            '|' + // module name or partition or both\n            /<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>/.source.replace(\n              /<mod-name>/g,\n              function () {\n                return modName\n              }\n            ) +\n            ')'\n        ),\n        lookbehind: true,\n        greedy: true,\n        inside: {\n          string: /^[<\"][\\s\\S]+/,\n          operator: /:/,\n          punctuation: /\\./\n        }\n      },\n      'raw-string': {\n        pattern: /R\"([^()\\\\ ]{0,16})\\([\\s\\S]*?\\)\\1\"/,\n        alias: 'string',\n        greedy: true\n      }\n    })\n    Prism.languages.insertBefore('cpp', 'keyword', {\n      'generic-function': {\n        pattern: /\\b(?!operator\\b)[a-z_]\\w*\\s*<(?:[^<>]|<[^<>]*>)*>(?=\\s*\\()/i,\n        inside: {\n          function: /^\\w+/,\n          generic: {\n            pattern: /<[\\s\\S]+/,\n            alias: 'class-name',\n            inside: Prism.languages.cpp\n          }\n        }\n      }\n    })\n    Prism.languages.insertBefore('cpp', 'operator', {\n      'double-colon': {\n        pattern: /::/,\n        alias: 'punctuation'\n      }\n    })\n    Prism.languages.insertBefore('cpp', 'class-name', {\n      // the base clause is an optional list of parent classes\n      // https://en.cppreference.com/w/cpp/language/class\n      'base-clause': {\n        pattern:\n          /(\\b(?:class|struct)\\s+\\w+\\s*:\\s*)[^;{}\"'\\s]+(?:\\s+[^;{}\"'\\s]+)*(?=\\s*[;{])/,\n        lookbehind: true,\n        greedy: true,\n        inside: Prism.languages.extend('cpp', {})\n      }\n    })\n    Prism.languages.insertBefore(\n      'inside',\n      'double-colon',\n      {\n        // All untokenized words that are not namespaces should be class names\n        'class-name': /\\b[a-z_]\\w*\\b(?!\\s*::)/i\n      },\n      Prism.languages.cpp['base-clause']\n    )\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/cpp.js?");

/***/ })

}]);