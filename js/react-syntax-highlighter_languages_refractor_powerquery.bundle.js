"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_powerquery"],{

/***/ "./node_modules/refractor/lang/powerquery.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/powerquery.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = powerquery\npowerquery.displayName = 'powerquery'\npowerquery.aliases = []\nfunction powerquery(Prism) {\n  // https://docs.microsoft.com/en-us/powerquery-m/power-query-m-language-specification\n  Prism.languages.powerquery = {\n    comment: {\n      pattern: /(^|[^\\\\])(?:\\/\\*[\\s\\S]*?\\*\\/|\\/\\/.*)/,\n      lookbehind: true,\n      greedy: true\n    },\n    'quoted-identifier': {\n      pattern: /#\"(?:[^\"\\r\\n]|\"\")*\"(?!\")/,\n      greedy: true\n    },\n    string: {\n      pattern: /(?:#!)?\"(?:[^\"\\r\\n]|\"\")*\"(?!\")/,\n      greedy: true\n    },\n    constant: [\n      /\\bDay\\.(?:Friday|Monday|Saturday|Sunday|Thursday|Tuesday|Wednesday)\\b/,\n      /\\bTraceLevel\\.(?:Critical|Error|Information|Verbose|Warning)\\b/,\n      /\\bOccurrence\\.(?:All|First|Last)\\b/,\n      /\\bOrder\\.(?:Ascending|Descending)\\b/,\n      /\\bRoundingMode\\.(?:AwayFromZero|Down|ToEven|TowardZero|Up)\\b/,\n      /\\bMissingField\\.(?:Error|Ignore|UseNull)\\b/,\n      /\\bQuoteStyle\\.(?:Csv|None)\\b/,\n      /\\bJoinKind\\.(?:FullOuter|Inner|LeftAnti|LeftOuter|RightAnti|RightOuter)\\b/,\n      /\\bGroupKind\\.(?:Global|Local)\\b/,\n      /\\bExtraValues\\.(?:Error|Ignore|List)\\b/,\n      /\\bJoinAlgorithm\\.(?:Dynamic|LeftHash|LeftIndex|PairwiseHash|RightHash|RightIndex|SortMerge)\\b/,\n      /\\bJoinSide\\.(?:Left|Right)\\b/,\n      /\\bPrecision\\.(?:Decimal|Double)\\b/,\n      /\\bRelativePosition\\.From(?:End|Start)\\b/,\n      /\\bTextEncoding\\.(?:Ascii|BigEndianUnicode|Unicode|Utf16|Utf8|Windows)\\b/,\n      /\\b(?:Any|Binary|Date|DateTime|DateTimeZone|Duration|Function|Int16|Int32|Int64|Int8|List|Logical|None|Number|Record|Table|Text|Time)\\.Type\\b/,\n      /\\bnull\\b/\n    ],\n    boolean: /\\b(?:false|true)\\b/,\n    keyword:\n      /\\b(?:and|as|each|else|error|if|in|is|let|meta|not|nullable|optional|or|otherwise|section|shared|then|try|type)\\b|#(?:binary|date|datetime|datetimezone|duration|infinity|nan|sections|shared|table|time)\\b/,\n    function: {\n      pattern: /(^|[^#\\w.])[a-z_][\\w.]*(?=\\s*\\()/i,\n      lookbehind: true\n    },\n    'data-type': {\n      pattern:\n        /\\b(?:any|anynonnull|binary|date|datetime|datetimezone|duration|function|list|logical|none|number|record|table|text|time)\\b/,\n      alias: 'class-name'\n    },\n    number: {\n      pattern:\n        /\\b0x[\\da-f]+\\b|(?:[+-]?(?:\\b\\d+\\.)?\\b\\d+|[+-]\\.\\d+|(^|[^.])\\B\\.\\d+)(?:e[+-]?\\d+)?\\b/i,\n      lookbehind: true\n    },\n    operator: /[-+*\\/&?@^]|<(?:=>?|>)?|>=?|=>?|\\.\\.\\.?/,\n    punctuation: /[,;\\[\\](){}]/\n  }\n  Prism.languages.pq = Prism.languages['powerquery']\n  Prism.languages.mscript = Prism.languages['powerquery']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/powerquery.js?");

/***/ })

}]);