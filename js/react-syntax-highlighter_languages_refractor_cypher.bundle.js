"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_cypher"],{

/***/ "./node_modules/refractor/lang/cypher.js":
/*!***********************************************!*\
  !*** ./node_modules/refractor/lang/cypher.js ***!
  \***********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = cypher\ncypher.displayName = 'cypher'\ncypher.aliases = []\nfunction cypher(Prism) {\n  Prism.languages.cypher = {\n    // https://neo4j.com/docs/cypher-manual/current/syntax/comments/\n    comment: /\\/\\/.*/,\n    string: {\n      pattern: /\"(?:[^\"\\\\\\r\\n]|\\\\.)*\"|'(?:[^'\\\\\\r\\n]|\\\\.)*'/,\n      greedy: true\n    },\n    'class-name': {\n      pattern: /(:\\s*)(?:\\w+|`(?:[^`\\\\\\r\\n])*`)(?=\\s*[{):])/,\n      lookbehind: true,\n      greedy: true\n    },\n    relationship: {\n      pattern:\n        /(-\\[\\s*(?:\\w+\\s*|`(?:[^`\\\\\\r\\n])*`\\s*)?:\\s*|\\|\\s*:\\s*)(?:\\w+|`(?:[^`\\\\\\r\\n])*`)/,\n      lookbehind: true,\n      greedy: true,\n      alias: 'property'\n    },\n    identifier: {\n      pattern: /`(?:[^`\\\\\\r\\n])*`/,\n      greedy: true\n    },\n    variable: /\\$\\w+/,\n    // https://neo4j.com/docs/cypher-manual/current/syntax/reserved/\n    keyword:\n      /\\b(?:ADD|ALL|AND|AS|ASC|ASCENDING|ASSERT|BY|CALL|CASE|COMMIT|CONSTRAINT|CONTAINS|CREATE|CSV|DELETE|DESC|DESCENDING|DETACH|DISTINCT|DO|DROP|ELSE|END|ENDS|EXISTS|FOR|FOREACH|IN|INDEX|IS|JOIN|KEY|LIMIT|LOAD|MANDATORY|MATCH|MERGE|NODE|NOT|OF|ON|OPTIONAL|OR|ORDER(?=\\s+BY)|PERIODIC|REMOVE|REQUIRE|RETURN|SCALAR|SCAN|SET|SKIP|START|STARTS|THEN|UNION|UNIQUE|UNWIND|USING|WHEN|WHERE|WITH|XOR|YIELD)\\b/i,\n    function: /\\b\\w+\\b(?=\\s*\\()/,\n    boolean: /\\b(?:false|null|true)\\b/i,\n    number: /\\b(?:0x[\\da-fA-F]+|\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?)\\b/,\n    // https://neo4j.com/docs/cypher-manual/current/syntax/operators/\n    operator: /:|<--?|--?>?|<>|=~?|[<>]=?|[+*/%^|]|\\.\\.\\.?/,\n    punctuation: /[()[\\]{},;.]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/cypher.js?");

/***/ })

}]);