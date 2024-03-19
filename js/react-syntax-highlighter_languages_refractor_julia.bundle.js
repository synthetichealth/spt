"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_julia"],{

/***/ "./node_modules/refractor/lang/julia.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/julia.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = julia\njulia.displayName = 'julia'\njulia.aliases = []\nfunction julia(Prism) {\n  Prism.languages.julia = {\n    comment: {\n      // support one level of nested comments\n      // https://github.com/JuliaLang/julia/pull/6128\n      pattern:\n        /(^|[^\\\\])(?:#=(?:[^#=]|=(?!#)|#(?!=)|#=(?:[^#=]|=(?!#)|#(?!=))*=#)*=#|#.*)/,\n      lookbehind: true\n    },\n    regex: {\n      // https://docs.julialang.org/en/v1/manual/strings/#Regular-Expressions-1\n      pattern: /r\"(?:\\\\.|[^\"\\\\\\r\\n])*\"[imsx]{0,4}/,\n      greedy: true\n    },\n    string: {\n      // https://docs.julialang.org/en/v1/manual/strings/#String-Basics-1\n      // https://docs.julialang.org/en/v1/manual/strings/#non-standard-string-literals-1\n      // https://docs.julialang.org/en/v1/manual/running-external-programs/#Running-External-Programs-1\n      pattern:\n        /\"\"\"[\\s\\S]+?\"\"\"|(?:\\b\\w+)?\"(?:\\\\.|[^\"\\\\\\r\\n])*\"|`(?:[^\\\\`\\r\\n]|\\\\.)*`/,\n      greedy: true\n    },\n    char: {\n      // https://docs.julialang.org/en/v1/manual/strings/#man-characters-1\n      pattern: /(^|[^\\w'])'(?:\\\\[^\\r\\n][^'\\r\\n]*|[^\\\\\\r\\n])'/,\n      lookbehind: true,\n      greedy: true\n    },\n    keyword:\n      /\\b(?:abstract|baremodule|begin|bitstype|break|catch|ccall|const|continue|do|else|elseif|end|export|finally|for|function|global|if|immutable|import|importall|in|let|local|macro|module|print|println|quote|return|struct|try|type|typealias|using|while)\\b/,\n    boolean: /\\b(?:false|true)\\b/,\n    number:\n      /(?:\\b(?=\\d)|\\B(?=\\.))(?:0[box])?(?:[\\da-f]+(?:_[\\da-f]+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[efp][+-]?\\d+(?:_\\d+)*)?j?/i,\n    // https://docs.julialang.org/en/v1/manual/mathematical-operations/\n    // https://docs.julialang.org/en/v1/manual/mathematical-operations/#Operator-Precedence-and-Associativity-1\n    operator:\n      /&&|\\|\\||[-+*^%÷⊻&$\\\\]=?|\\/[\\/=]?|!=?=?|\\|[=>]?|<(?:<=?|[=:|])?|>(?:=|>>?=?)?|==?=?|[~≠≤≥'√∛]/,\n    punctuation: /::?|[{}[\\]();,.?]/,\n    // https://docs.julialang.org/en/v1/base/numbers/#Base.im\n    constant: /\\b(?:(?:Inf|NaN)(?:16|32|64)?|im|pi)\\b|[πℯ]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/julia.js?");

/***/ })

}]);