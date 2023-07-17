"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_gdscript"],{

/***/ "./node_modules/refractor/lang/gdscript.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/gdscript.js ***!
  \*************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = gdscript\ngdscript.displayName = 'gdscript'\ngdscript.aliases = []\nfunction gdscript(Prism) {\n  Prism.languages.gdscript = {\n    comment: /#.*/,\n    string: {\n      pattern:\n        /@?(?:(\"|')(?:(?!\\1)[^\\n\\\\]|\\\\[\\s\\S])*\\1(?!\"|')|\"\"\"(?:[^\\\\]|\\\\[\\s\\S])*?\"\"\")/,\n      greedy: true\n    },\n    'class-name': {\n      // class_name Foo, extends Bar, class InnerClass\n      // export(int) var baz, export(int, 0) var i\n      // as Node\n      // const FOO: int = 9, var bar: bool = true\n      // func add(reference: Item, amount: int) -> Item:\n      pattern:\n        /(^(?:class|class_name|extends)[ \\t]+|^export\\([ \\t]*|\\bas[ \\t]+|(?:\\b(?:const|var)[ \\t]|[,(])[ \\t]*\\w+[ \\t]*:[ \\t]*|->[ \\t]*)[a-zA-Z_]\\w*/m,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:and|as|assert|break|breakpoint|class|class_name|const|continue|elif|else|enum|export|extends|for|func|if|in|is|master|mastersync|match|not|null|onready|or|pass|preload|puppet|puppetsync|remote|remotesync|return|self|setget|signal|static|tool|var|while|yield)\\b/,\n    function: /\\b[a-z_]\\w*(?=[ \\t]*\\()/i,\n    variable: /\\$\\w+/,\n    number: [\n      /\\b0b[01_]+\\b|\\b0x[\\da-fA-F_]+\\b|(?:\\b\\d[\\d_]*(?:\\.[\\d_]*)?|\\B\\.[\\d_]+)(?:e[+-]?[\\d_]+)?\\b/,\n      /\\b(?:INF|NAN|PI|TAU)\\b/\n    ],\n    constant: /\\b[A-Z][A-Z_\\d]*\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    operator: /->|:=|&&|\\|\\||<<|>>|[-+*/%&|!<>=]=?|[~^]/,\n    punctuation: /[.:,;()[\\]{}]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/gdscript.js?");

/***/ })

}]);