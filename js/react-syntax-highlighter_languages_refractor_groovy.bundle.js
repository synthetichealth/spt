"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_groovy"],{

/***/ "./node_modules/refractor/lang/groovy.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/groovy.js ***!
  \***********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = groovy\ngroovy.displayName = 'groovy'\ngroovy.aliases = []\nfunction groovy(Prism) {\n  Prism.languages.groovy = Prism.languages.extend('clike', {\n    string: [\n      {\n        // https://groovy-lang.org/syntax.html#_dollar_slashy_string\n        pattern:\n          /(\"\"\"|''')(?:[^\\\\]|\\\\[\\s\\S])*?\\1|\\$\\/(?:[^/$]|\\$(?:[/$]|(?![/$]))|\\/(?!\\$))*\\/\\$/,\n        greedy: true\n      },\n      {\n        // TODO: Slash strings (e.g. /foo/) can contain line breaks but this will cause a lot of trouble with\n        // simple division (see JS regex), so find a fix maybe?\n        pattern: /([\"'/])(?:\\\\.|(?!\\1)[^\\\\\\r\\n])*\\1/,\n        greedy: true\n      }\n    ],\n    keyword:\n      /\\b(?:abstract|as|assert|boolean|break|byte|case|catch|char|class|const|continue|def|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|in|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|trait|transient|try|void|volatile|while)\\b/,\n    number:\n      /\\b(?:0b[01_]+|0x[\\da-f_]+(?:\\.[\\da-f_p\\-]+)?|[\\d_]+(?:\\.[\\d_]+)?(?:e[+-]?\\d+)?)[glidf]?\\b/i,\n    operator: {\n      pattern:\n        /(^|[^.])(?:~|==?~?|\\?[.:]?|\\*(?:[.=]|\\*=?)?|\\.[@&]|\\.\\.<|\\.\\.(?!\\.)|-[-=>]?|\\+[+=]?|!=?|<(?:<=?|=>?)?|>(?:>>?=?|=)?|&[&=]?|\\|[|=]?|\\/=?|\\^=?|%=?)/,\n      lookbehind: true\n    },\n    punctuation: /\\.+|[{}[\\];(),:$]/\n  })\n  Prism.languages.insertBefore('groovy', 'string', {\n    shebang: {\n      pattern: /#!.+/,\n      alias: 'comment'\n    }\n  })\n  Prism.languages.insertBefore('groovy', 'punctuation', {\n    'spock-block': /\\b(?:and|cleanup|expect|given|setup|then|when|where):/\n  })\n  Prism.languages.insertBefore('groovy', 'function', {\n    annotation: {\n      pattern: /(^|[^.])@\\w+/,\n      lookbehind: true,\n      alias: 'punctuation'\n    }\n  }) // Handle string interpolation\n  Prism.hooks.add('wrap', function (env) {\n    if (env.language === 'groovy' && env.type === 'string') {\n      var delimiter = env.content.value[0]\n      if (delimiter != \"'\") {\n        var pattern = /([^\\\\])(?:\\$(?:\\{.*?\\}|[\\w.]+))/\n        if (delimiter === '$') {\n          pattern = /([^\\$])(?:\\$(?:\\{.*?\\}|[\\w.]+))/\n        } // To prevent double HTML-encoding we have to decode env.content first\n        env.content.value = env.content.value\n          .replace(/&lt;/g, '<')\n          .replace(/&amp;/g, '&')\n        env.content = Prism.highlight(env.content.value, {\n          expression: {\n            pattern: pattern,\n            lookbehind: true,\n            inside: Prism.languages.groovy\n          }\n        })\n        env.classes.push(delimiter === '/' ? 'regex' : 'gstring')\n      }\n    }\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/groovy.js?");

/***/ })

}]);