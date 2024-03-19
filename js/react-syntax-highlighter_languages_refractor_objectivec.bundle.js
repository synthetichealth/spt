"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_objectivec"],{

/***/ "./node_modules/refractor/lang/c.js":
/*!******************************************!*\
  !*** ./node_modules/refractor/lang/c.js ***!
  \******************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = c\nc.displayName = 'c'\nc.aliases = []\nfunction c(Prism) {\n  Prism.languages.c = Prism.languages.extend('clike', {\n    comment: {\n      pattern:\n        /\\/\\/(?:[^\\r\\n\\\\]|\\\\(?:\\r\\n?|\\n|(?![\\r\\n])))*|\\/\\*[\\s\\S]*?(?:\\*\\/|$)/,\n      greedy: true\n    },\n    string: {\n      // https://en.cppreference.com/w/c/language/string_literal\n      pattern: /\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\"\\\\\\r\\n])*\"/,\n      greedy: true\n    },\n    'class-name': {\n      pattern:\n        /(\\b(?:enum|struct)\\s+(?:__attribute__\\s*\\(\\([\\s\\S]*?\\)\\)\\s*)?)\\w+|\\b[a-z]\\w*_t\\b/,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\\b/,\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n    number:\n      /(?:\\b0x(?:[\\da-f]+(?:\\.[\\da-f]*)?|\\.[\\da-f]+)(?:p[+-]?\\d+)?|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?)[ful]{0,4}/i,\n    operator: />>=?|<<=?|->|([-+&|:])\\1|[?:~]|[-+*/%&|^!=<>]=?/\n  })\n  Prism.languages.insertBefore('c', 'string', {\n    char: {\n      // https://en.cppreference.com/w/c/language/character_constant\n      pattern: /'(?:\\\\(?:\\r\\n|[\\s\\S])|[^'\\\\\\r\\n]){0,32}'/,\n      greedy: true\n    }\n  })\n  Prism.languages.insertBefore('c', 'string', {\n    macro: {\n      // allow for multiline macro definitions\n      // spaces after the # character compile fine with gcc\n      pattern:\n        /(^[\\t ]*)#\\s*[a-z](?:[^\\r\\n\\\\/]|\\/(?!\\*)|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/|\\\\(?:\\r\\n|[\\s\\S]))*/im,\n      lookbehind: true,\n      greedy: true,\n      alias: 'property',\n      inside: {\n        string: [\n          {\n            // highlight the path of the include statement as a string\n            pattern: /^(#\\s*include\\s*)<[^>]+>/,\n            lookbehind: true\n          },\n          Prism.languages.c['string']\n        ],\n        char: Prism.languages.c['char'],\n        comment: Prism.languages.c['comment'],\n        'macro-name': [\n          {\n            pattern: /(^#\\s*define\\s+)\\w+\\b(?!\\()/i,\n            lookbehind: true\n          },\n          {\n            pattern: /(^#\\s*define\\s+)\\w+\\b(?=\\()/i,\n            lookbehind: true,\n            alias: 'function'\n          }\n        ],\n        // highlight macro directives as keywords\n        directive: {\n          pattern: /^(#\\s*)[a-z]+/,\n          lookbehind: true,\n          alias: 'keyword'\n        },\n        'directive-hash': /^#/,\n        punctuation: /##|\\\\(?=[\\r\\n])/,\n        expression: {\n          pattern: /\\S[\\s\\S]*/,\n          inside: Prism.languages.c\n        }\n      }\n    }\n  })\n  Prism.languages.insertBefore('c', 'function', {\n    // highlight predefined macros as constants\n    constant:\n      /\\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\\b/\n  })\n  delete Prism.languages.c['boolean']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/c.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/objectivec.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/objectivec.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorC = __webpack_require__(/*! ./c.js */ \"./node_modules/refractor/lang/c.js\")\nmodule.exports = objectivec\nobjectivec.displayName = 'objectivec'\nobjectivec.aliases = ['objc']\nfunction objectivec(Prism) {\n  Prism.register(refractorC)\n  Prism.languages.objectivec = Prism.languages.extend('c', {\n    string: {\n      pattern: /@?\"(?:\\\\(?:\\r\\n|[\\s\\S])|[^\"\\\\\\r\\n])*\"/,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|in|inline|int|long|register|return|self|short|signed|sizeof|static|struct|super|switch|typedef|typeof|union|unsigned|void|volatile|while)\\b|(?:@interface|@end|@implementation|@protocol|@class|@public|@protected|@private|@property|@try|@catch|@finally|@throw|@synthesize|@dynamic|@selector)\\b/,\n    operator: /-[->]?|\\+\\+?|!=?|<<?=?|>>?=?|==?|&&?|\\|\\|?|[~^%?*\\/@]/\n  })\n  delete Prism.languages.objectivec['class-name']\n  Prism.languages.objc = Prism.languages.objectivec\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/objectivec.js?");

/***/ })

}]);