"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_t4Vb"],{

/***/ "./node_modules/refractor/lang/basic.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/basic.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = basic\nbasic.displayName = 'basic'\nbasic.aliases = []\nfunction basic(Prism) {\n  Prism.languages.basic = {\n    comment: {\n      pattern: /(?:!|REM\\b).+/i,\n      inside: {\n        keyword: /^REM/i\n      }\n    },\n    string: {\n      pattern: /\"(?:\"\"|[!#$%&'()*,\\/:;<=>?^\\w +\\-.])*\"/,\n      greedy: true\n    },\n    number: /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:E[+-]?\\d+)?/i,\n    keyword:\n      /\\b(?:AS|BEEP|BLOAD|BSAVE|CALL(?: ABSOLUTE)?|CASE|CHAIN|CHDIR|CLEAR|CLOSE|CLS|COM|COMMON|CONST|DATA|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DIM|DO|DOUBLE|ELSE|ELSEIF|END|ENVIRON|ERASE|ERROR|EXIT|FIELD|FILES|FOR|FUNCTION|GET|GOSUB|GOTO|IF|INPUT|INTEGER|IOCTL|KEY|KILL|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|MKDIR|NAME|NEXT|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPTION BASE|OUT|POKE|PUT|READ|REDIM|REM|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SELECT CASE|SHARED|SHELL|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|SUB|SWAP|SYSTEM|THEN|TIMER|TO|TROFF|TRON|TYPE|UNLOCK|UNTIL|USING|VIEW PRINT|WAIT|WEND|WHILE|WRITE)(?:\\$|\\b)/i,\n    function:\n      /\\b(?:ABS|ACCESS|ACOS|ANGLE|AREA|ARITHMETIC|ARRAY|ASIN|ASK|AT|ATN|BASE|BEGIN|BREAK|CAUSE|CEIL|CHR|CLIP|COLLATE|COLOR|CON|COS|COSH|COT|CSC|DATE|DATUM|DEBUG|DECIMAL|DEF|DEG|DEGREES|DELETE|DET|DEVICE|DISPLAY|DOT|ELAPSED|EPS|ERASABLE|EXLINE|EXP|EXTERNAL|EXTYPE|FILETYPE|FIXED|FP|GO|GRAPH|HANDLER|IDN|IMAGE|IN|INT|INTERNAL|IP|IS|KEYED|LBOUND|LCASE|LEFT|LEN|LENGTH|LET|LINE|LINES|LOG|LOG10|LOG2|LTRIM|MARGIN|MAT|MAX|MAXNUM|MID|MIN|MISSING|MOD|NATIVE|NUL|NUMERIC|OF|OPTION|ORD|ORGANIZATION|OUTIN|OUTPUT|PI|POINT|POINTER|POINTS|POS|PRINT|PROGRAM|PROMPT|RAD|RADIANS|RANDOMIZE|RECORD|RECSIZE|RECTYPE|RELATIVE|REMAINDER|REPEAT|REST|RETRY|REWRITE|RIGHT|RND|ROUND|RTRIM|SAME|SEC|SELECT|SEQUENTIAL|SET|SETTER|SGN|SIN|SINH|SIZE|SKIP|SQR|STANDARD|STATUS|STR|STREAM|STYLE|TAB|TAN|TANH|TEMPLATE|TEXT|THERE|TIME|TIMEOUT|TRACE|TRANSFORM|TRUNCATE|UBOUND|UCASE|USE|VAL|VARIABLE|VIEWPORT|WHEN|WINDOW|WITH|ZER|ZONEWIDTH)(?:\\$|\\b)/i,\n    operator: /<[=>]?|>=?|[+\\-*\\/^=&]|\\b(?:AND|EQV|IMP|NOT|OR|XOR)\\b/i,\n    punctuation: /[,;:()]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/basic.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/t4-templating.js":
/*!******************************************************!*\
  !*** ./node_modules/refractor/lang/t4-templating.js ***!
  \******************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = t4Templating\nt4Templating.displayName = 't4Templating'\nt4Templating.aliases = []\nfunction t4Templating(Prism) {\n  ;(function (Prism) {\n    function createBlock(prefix, inside, contentAlias) {\n      return {\n        pattern: RegExp('<#' + prefix + '[\\\\s\\\\S]*?#>'),\n        alias: 'block',\n        inside: {\n          delimiter: {\n            pattern: RegExp('^<#' + prefix + '|#>$'),\n            alias: 'important'\n          },\n          content: {\n            pattern: /[\\s\\S]+/,\n            inside: inside,\n            alias: contentAlias\n          }\n        }\n      }\n    }\n    function createT4(insideLang) {\n      var grammar = Prism.languages[insideLang]\n      var className = 'language-' + insideLang\n      return {\n        block: {\n          pattern: /<#[\\s\\S]+?#>/,\n          inside: {\n            directive: createBlock('@', {\n              'attr-value': {\n                pattern: /=(?:(\"|')(?:\\\\[\\s\\S]|(?!\\1)[^\\\\])*\\1|[^\\s'\">=]+)/,\n                inside: {\n                  punctuation: /^=|^[\"']|[\"']$/\n                }\n              },\n              keyword: /\\b\\w+(?=\\s)/,\n              'attr-name': /\\b\\w+/\n            }),\n            expression: createBlock('=', grammar, className),\n            'class-feature': createBlock('\\\\+', grammar, className),\n            standard: createBlock('', grammar, className)\n          }\n        }\n      }\n    }\n    Prism.languages['t4-templating'] = Object.defineProperty({}, 'createT4', {\n      value: createT4\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/t4-templating.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/t4-vb.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/t4-vb.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorT4Templating = __webpack_require__(/*! ./t4-templating.js */ \"./node_modules/refractor/lang/t4-templating.js\")\nvar refractorVbnet = __webpack_require__(/*! ./vbnet.js */ \"./node_modules/refractor/lang/vbnet.js\")\nmodule.exports = t4Vb\nt4Vb.displayName = 't4Vb'\nt4Vb.aliases = []\nfunction t4Vb(Prism) {\n  Prism.register(refractorT4Templating)\n  Prism.register(refractorVbnet)\n  Prism.languages['t4-vb'] = Prism.languages['t4-templating'].createT4('vbnet')\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/t4-vb.js?");

/***/ }),

/***/ "./node_modules/refractor/lang/vbnet.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/vbnet.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\nvar refractorBasic = __webpack_require__(/*! ./basic.js */ \"./node_modules/refractor/lang/basic.js\")\nmodule.exports = vbnet\nvbnet.displayName = 'vbnet'\nvbnet.aliases = []\nfunction vbnet(Prism) {\n  Prism.register(refractorBasic)\n  Prism.languages.vbnet = Prism.languages.extend('basic', {\n    comment: [\n      {\n        pattern: /(?:!|REM\\b).+/i,\n        inside: {\n          keyword: /^REM/i\n        }\n      },\n      {\n        pattern: /(^|[^\\\\:])'.*/,\n        lookbehind: true,\n        greedy: true\n      }\n    ],\n    string: {\n      pattern: /(^|[^\"])\"(?:\"\"|[^\"])*\"(?!\")/,\n      lookbehind: true,\n      greedy: true\n    },\n    keyword:\n      /(?:\\b(?:ADDHANDLER|ADDRESSOF|ALIAS|AND|ANDALSO|AS|BEEP|BLOAD|BOOLEAN|BSAVE|BYREF|BYTE|BYVAL|CALL(?: ABSOLUTE)?|CASE|CATCH|CBOOL|CBYTE|CCHAR|CDATE|CDBL|CDEC|CHAIN|CHAR|CHDIR|CINT|CLASS|CLEAR|CLNG|CLOSE|CLS|COBJ|COM|COMMON|CONST|CONTINUE|CSBYTE|CSHORT|CSNG|CSTR|CTYPE|CUINT|CULNG|CUSHORT|DATA|DATE|DECIMAL|DECLARE|DEF(?: FN| SEG|DBL|INT|LNG|SNG|STR)|DEFAULT|DELEGATE|DIM|DIRECTCAST|DO|DOUBLE|ELSE|ELSEIF|END|ENUM|ENVIRON|ERASE|ERROR|EVENT|EXIT|FALSE|FIELD|FILES|FINALLY|FOR(?: EACH)?|FRIEND|FUNCTION|GET|GETTYPE|GETXMLNAMESPACE|GLOBAL|GOSUB|GOTO|HANDLES|IF|IMPLEMENTS|IMPORTS|IN|INHERITS|INPUT|INTEGER|INTERFACE|IOCTL|IS|ISNOT|KEY|KILL|LET|LIB|LIKE|LINE INPUT|LOCATE|LOCK|LONG|LOOP|LSET|ME|MKDIR|MOD|MODULE|MUSTINHERIT|MUSTOVERRIDE|MYBASE|MYCLASS|NAME|NAMESPACE|NARROWING|NEW|NEXT|NOT|NOTHING|NOTINHERITABLE|NOTOVERRIDABLE|OBJECT|OF|OFF|ON(?: COM| ERROR| KEY| TIMER)?|OPEN|OPERATOR|OPTION(?: BASE)?|OPTIONAL|OR|ORELSE|OUT|OVERLOADS|OVERRIDABLE|OVERRIDES|PARAMARRAY|PARTIAL|POKE|PRIVATE|PROPERTY|PROTECTED|PUBLIC|PUT|RAISEEVENT|READ|READONLY|REDIM|REM|REMOVEHANDLER|RESTORE|RESUME|RETURN|RMDIR|RSET|RUN|SBYTE|SELECT(?: CASE)?|SET|SHADOWS|SHARED|SHELL|SHORT|SINGLE|SLEEP|STATIC|STEP|STOP|STRING|STRUCTURE|SUB|SWAP|SYNCLOCK|SYSTEM|THEN|THROW|TIMER|TO|TROFF|TRON|TRUE|TRY|TRYCAST|TYPE|TYPEOF|UINTEGER|ULONG|UNLOCK|UNTIL|USHORT|USING|VIEW PRINT|WAIT|WEND|WHEN|WHILE|WIDENING|WITH|WITHEVENTS|WRITE|WRITEONLY|XOR)|\\B(?:#CONST|#ELSE|#ELSEIF|#END|#IF))(?:\\$|\\b)/i,\n    punctuation: /[,;:(){}]/\n  })\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/vbnet.js?");

/***/ })

}]);