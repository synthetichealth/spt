"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_warpscript"],{

/***/ "./node_modules/refractor/lang/warpscript.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/warpscript.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = warpscript\nwarpscript.displayName = 'warpscript'\nwarpscript.aliases = []\nfunction warpscript(Prism) {\n  Prism.languages.warpscript = {\n    comment: /#.*|\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\//,\n    string: {\n      pattern:\n        /\"(?:[^\"\\\\\\r\\n]|\\\\.)*\"|'(?:[^'\\\\\\r\\n]|\\\\.)*'|<'(?:[^\\\\']|'(?!>)|\\\\.)*'>/,\n      greedy: true\n    },\n    variable: /\\$\\S+/,\n    macro: {\n      pattern: /@\\S+/,\n      alias: 'property'\n    },\n    // WarpScript doesn't have any keywords, these are all functions under the control category\n    // https://www.warp10.io/tags/control\n    keyword:\n      /\\b(?:BREAK|CHECKMACRO|CONTINUE|CUDF|DEFINED|DEFINEDMACRO|EVAL|FAIL|FOR|FOREACH|FORSTEP|IFT|IFTE|MSGFAIL|NRETURN|RETHROW|RETURN|SWITCH|TRY|UDF|UNTIL|WHILE)\\b/,\n    number:\n      /[+-]?\\b(?:NaN|Infinity|\\d+(?:\\.\\d*)?(?:[Ee][+-]?\\d+)?|0x[\\da-fA-F]+|0b[01]+)\\b/,\n    boolean: /\\b(?:F|T|false|true)\\b/,\n    punctuation: /<%|%>|[{}[\\]()]/,\n    // Some operators from the \"operators\" category\n    // https://www.warp10.io/tags/operators\n    operator:\n      /==|&&?|\\|\\|?|\\*\\*?|>>>?|<<|[<>!~]=?|[-/%^]|\\+!?|\\b(?:AND|NOT|OR)\\b/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/warpscript.js?");

/***/ })

}]);