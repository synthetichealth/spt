"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_xojo"],{

/***/ "./node_modules/refractor/lang/xojo.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/xojo.js ***!
  \*********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = xojo\nxojo.displayName = 'xojo'\nxojo.aliases = []\nfunction xojo(Prism) {\n  Prism.languages.xojo = {\n    comment: {\n      pattern: /(?:'|\\/\\/|Rem\\b).+/i,\n      greedy: true\n    },\n    string: {\n      pattern: /\"(?:\"\"|[^\"])*\"/,\n      greedy: true\n    },\n    number: [/(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:E[+-]?\\d+)?/i, /&[bchou][a-z\\d]+/i],\n    directive: {\n      pattern: /#(?:Else|ElseIf|Endif|If|Pragma)\\b/i,\n      alias: 'property'\n    },\n    keyword:\n      /\\b(?:AddHandler|App|Array|As(?:signs)?|Auto|Boolean|Break|By(?:Ref|Val)|Byte|Call|Case|Catch|CFStringRef|CGFloat|Class|Color|Const|Continue|CString|Currency|CurrentMethodName|Declare|Delegate|Dim|Do(?:uble|wnTo)?|Each|Else(?:If)?|End|Enumeration|Event|Exception|Exit|Extends|False|Finally|For|Function|Get|GetTypeInfo|Global|GOTO|If|Implements|In|Inherits|Int(?:8|16|32|64|eger|erface)?|Lib|Loop|Me|Module|Next|Nil|Object|Optional|OSType|ParamArray|Private|Property|Protected|PString|Ptr|Raise(?:Event)?|ReDim|RemoveHandler|Return|Select(?:or)?|Self|Set|Shared|Short|Single|Soft|Static|Step|String|Sub|Super|Text|Then|To|True|Try|Ubound|UInt(?:8|16|32|64|eger)?|Until|Using|Var(?:iant)?|Wend|While|WindowPtr|WString)\\b/i,\n    operator:\n      /<[=>]?|>=?|[+\\-*\\/\\\\^=]|\\b(?:AddressOf|And|Ctype|IsA?|Mod|New|Not|Or|WeakAddressOf|Xor)\\b/i,\n    punctuation: /[.,;:()]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/xojo.js?");

/***/ })

}]);