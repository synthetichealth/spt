"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_actionscript"],{

/***/ "./node_modules/refractor/lang/actionscript.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/actionscript.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = actionscript\nactionscript.displayName = 'actionscript'\nactionscript.aliases = []\nfunction actionscript(Prism) {\n  Prism.languages.actionscript = Prism.languages.extend('javascript', {\n    keyword:\n      /\\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\\b/,\n    operator: /\\+\\+|--|(?:[+\\-*\\/%^]|&&?|\\|\\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/\n  })\n  Prism.languages.actionscript['class-name'].alias = 'function' // doesn't work with AS because AS is too complex\n  delete Prism.languages.actionscript['parameter']\n  delete Prism.languages.actionscript['literal-property']\n  if (Prism.languages.markup) {\n    Prism.languages.insertBefore('actionscript', 'string', {\n      xml: {\n        pattern:\n          /(^|[^.])<\\/?\\w+(?:\\s+[^\\s>\\/=]+=(\"|')(?:\\\\[\\s\\S]|(?!\\2)[^\\\\])*\\2)*\\s*\\/?>/,\n        lookbehind: true,\n        inside: Prism.languages.markup\n      }\n    })\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/actionscript.js?");

/***/ })

}]);