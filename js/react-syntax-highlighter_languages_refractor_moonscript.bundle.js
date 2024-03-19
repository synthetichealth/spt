"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_moonscript"],{

/***/ "./node_modules/refractor/lang/moonscript.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/moonscript.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = moonscript\nmoonscript.displayName = 'moonscript'\nmoonscript.aliases = ['moon']\nfunction moonscript(Prism) {\n  Prism.languages.moonscript = {\n    comment: /--.*/,\n    string: [\n      {\n        pattern: /'[^']*'|\\[(=*)\\[[\\s\\S]*?\\]\\1\\]/,\n        greedy: true\n      },\n      {\n        pattern: /\"[^\"]*\"/,\n        greedy: true,\n        inside: {\n          interpolation: {\n            pattern: /#\\{[^{}]*\\}/,\n            inside: {\n              moonscript: {\n                pattern: /(^#\\{)[\\s\\S]+(?=\\})/,\n                lookbehind: true,\n                inside: null // see beow\n              },\n              'interpolation-punctuation': {\n                pattern: /#\\{|\\}/,\n                alias: 'punctuation'\n              }\n            }\n          }\n        }\n      }\n    ],\n    'class-name': [\n      {\n        pattern: /(\\b(?:class|extends)[ \\t]+)\\w+/,\n        lookbehind: true\n      }, // class-like names start with a capital letter\n      /\\b[A-Z]\\w*/\n    ],\n    keyword:\n      /\\b(?:class|continue|do|else|elseif|export|extends|for|from|if|import|in|local|nil|return|self|super|switch|then|unless|using|when|while|with)\\b/,\n    variable: /@@?\\w*/,\n    property: {\n      pattern: /\\b(?!\\d)\\w+(?=:)|(:)(?!\\d)\\w+/,\n      lookbehind: true\n    },\n    function: {\n      pattern:\n        /\\b(?:_G|_VERSION|assert|collectgarbage|coroutine\\.(?:create|resume|running|status|wrap|yield)|debug\\.(?:debug|getfenv|gethook|getinfo|getlocal|getmetatable|getregistry|getupvalue|setfenv|sethook|setlocal|setmetatable|setupvalue|traceback)|dofile|error|getfenv|getmetatable|io\\.(?:close|flush|input|lines|open|output|popen|read|stderr|stdin|stdout|tmpfile|type|write)|ipairs|load|loadfile|loadstring|math\\.(?:abs|acos|asin|atan|atan2|ceil|cos|cosh|deg|exp|floor|fmod|frexp|ldexp|log|log10|max|min|modf|pi|pow|rad|random|randomseed|sin|sinh|sqrt|tan|tanh)|module|next|os\\.(?:clock|date|difftime|execute|exit|getenv|remove|rename|setlocale|time|tmpname)|package\\.(?:cpath|loaded|loadlib|path|preload|seeall)|pairs|pcall|print|rawequal|rawget|rawset|require|select|setfenv|setmetatable|string\\.(?:byte|char|dump|find|format|gmatch|gsub|len|lower|match|rep|reverse|sub|upper)|table\\.(?:concat|insert|maxn|remove|sort)|tonumber|tostring|type|unpack|xpcall)\\b/,\n      inside: {\n        punctuation: /\\./\n      }\n    },\n    boolean: /\\b(?:false|true)\\b/,\n    number:\n      /(?:\\B\\.\\d+|\\b\\d+\\.\\d+|\\b\\d+(?=[eE]))(?:[eE][-+]?\\d+)?\\b|\\b(?:0x[a-fA-F\\d]+|\\d+)(?:U?LL)?\\b/,\n    operator:\n      /\\.{3}|[-=]>|~=|(?:[-+*/%<>!=]|\\.\\.)=?|[:#^]|\\b(?:and|or)\\b=?|\\b(?:not)\\b/,\n    punctuation: /[.,()[\\]{}\\\\]/\n  }\n  Prism.languages.moonscript.string[1].inside.interpolation.inside.moonscript.inside =\n    Prism.languages.moonscript\n  Prism.languages.moon = Prism.languages.moonscript\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/moonscript.js?");

/***/ })

}]);