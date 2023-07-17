"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_vhdl"],{

/***/ "./node_modules/refractor/lang/vhdl.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/vhdl.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = vhdl\nvhdl.displayName = 'vhdl'\nvhdl.aliases = []\nfunction vhdl(Prism) {\n  Prism.languages.vhdl = {\n    comment: /--.+/,\n    // support for all logic vectors\n    'vhdl-vectors': {\n      pattern: /\\b[oxb]\"[\\da-f_]+\"|\"[01uxzwlh-]+\"/i,\n      alias: 'number'\n    },\n    // support for operator overloading included\n    'quoted-function': {\n      pattern: /\"\\S+?\"(?=\\()/,\n      alias: 'function'\n    },\n    string: /\"(?:[^\\\\\"\\r\\n]|\\\\(?:\\r\\n|[\\s\\S]))*\"/,\n    constant: /\\b(?:library|use)\\b/i,\n    // support for predefined attributes included\n    keyword:\n      /\\b(?:'active|'ascending|'base|'delayed|'driving|'driving_value|'event|'high|'image|'instance_name|'last_active|'last_event|'last_value|'left|'leftof|'length|'low|'path_name|'pos|'pred|'quiet|'range|'reverse_range|'right|'rightof|'simple_name|'stable|'succ|'transaction|'val|'value|access|after|alias|all|architecture|array|assert|attribute|begin|block|body|buffer|bus|case|component|configuration|constant|disconnect|downto|else|elsif|end|entity|exit|file|for|function|generate|generic|group|guarded|if|impure|in|inertial|inout|is|label|library|linkage|literal|loop|map|new|next|null|of|on|open|others|out|package|port|postponed|procedure|process|pure|range|record|register|reject|report|return|select|severity|shared|signal|subtype|then|to|transport|type|unaffected|units|until|use|variable|wait|when|while|with)\\b/i,\n    boolean: /\\b(?:false|true)\\b/i,\n    function: /\\w+(?=\\()/,\n    // decimal, based, physical, and exponential numbers supported\n    number: /'[01uxzwlh-]'|\\b(?:\\d+#[\\da-f_.]+#|\\d[\\d_.]*)(?:e[-+]?\\d+)?/i,\n    operator:\n      /[<>]=?|:=|[-+*/&=]|\\b(?:abs|and|mod|nand|nor|not|or|rem|rol|ror|sla|sll|sra|srl|xnor|xor)\\b/i,\n    punctuation: /[{}[\\];(),.:]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/vhdl.js?");

/***/ })

}]);