"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_visualBasic"],{

/***/ "./node_modules/refractor/lang/visual-basic.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/visual-basic.js ***!
  \*****************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = visualBasic\nvisualBasic.displayName = 'visualBasic'\nvisualBasic.aliases = []\nfunction visualBasic(Prism) {\n  Prism.languages['visual-basic'] = {\n    comment: {\n      pattern: /(?:['‘’]|REM\\b)(?:[^\\r\\n_]|_(?:\\r\\n?|\\n)?)*/i,\n      inside: {\n        keyword: /^REM/i\n      }\n    },\n    directive: {\n      pattern:\n        /#(?:Const|Else|ElseIf|End|ExternalChecksum|ExternalSource|If|Region)(?:\\b_[ \\t]*(?:\\r\\n?|\\n)|.)+/i,\n      alias: 'property',\n      greedy: true\n    },\n    string: {\n      pattern: /\\$?[\"“”](?:[\"“”]{2}|[^\"“”])*[\"“”]C?/i,\n      greedy: true\n    },\n    date: {\n      pattern:\n        /#[ \\t]*(?:\\d+([/-])\\d+\\1\\d+(?:[ \\t]+(?:\\d+[ \\t]*(?:AM|PM)|\\d+:\\d+(?::\\d+)?(?:[ \\t]*(?:AM|PM))?))?|\\d+[ \\t]*(?:AM|PM)|\\d+:\\d+(?::\\d+)?(?:[ \\t]*(?:AM|PM))?)[ \\t]*#/i,\n      alias: 'number'\n    },\n    number:\n      /(?:(?:\\b\\d+(?:\\.\\d+)?|\\.\\d+)(?:E[+-]?\\d+)?|&[HO][\\dA-F]+)(?:[FRD]|U?[ILS])?/i,\n    boolean: /\\b(?:False|Nothing|True)\\b/i,\n    keyword:\n      /\\b(?:AddHandler|AddressOf|Alias|And(?:Also)?|As|Boolean|ByRef|Byte|ByVal|Call|Case|Catch|C(?:Bool|Byte|Char|Date|Dbl|Dec|Int|Lng|Obj|SByte|Short|Sng|Str|Type|UInt|ULng|UShort)|Char|Class|Const|Continue|Currency|Date|Decimal|Declare|Default|Delegate|Dim|DirectCast|Do|Double|Each|Else(?:If)?|End(?:If)?|Enum|Erase|Error|Event|Exit|Finally|For|Friend|Function|Get(?:Type|XMLNamespace)?|Global|GoSub|GoTo|Handles|If|Implements|Imports|In|Inherits|Integer|Interface|Is|IsNot|Let|Lib|Like|Long|Loop|Me|Mod|Module|Must(?:Inherit|Override)|My(?:Base|Class)|Namespace|Narrowing|New|Next|Not(?:Inheritable|Overridable)?|Object|Of|On|Operator|Option(?:al)?|Or(?:Else)?|Out|Overloads|Overridable|Overrides|ParamArray|Partial|Private|Property|Protected|Public|RaiseEvent|ReadOnly|ReDim|RemoveHandler|Resume|Return|SByte|Select|Set|Shadows|Shared|short|Single|Static|Step|Stop|String|Structure|Sub|SyncLock|Then|Throw|To|Try|TryCast|Type|TypeOf|U(?:Integer|Long|Short)|Until|Using|Variant|Wend|When|While|Widening|With(?:Events)?|WriteOnly|Xor)\\b/i,\n    operator: /[+\\-*/\\\\^<=>&#@$%!]|\\b_(?=[ \\t]*[\\r\\n])/,\n    punctuation: /[{}().,:?]/\n  }\n  Prism.languages.vb = Prism.languages['visual-basic']\n  Prism.languages.vba = Prism.languages['visual-basic']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/visual-basic.js?");

/***/ })

}]);