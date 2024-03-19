"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_fortran"],{

/***/ "./node_modules/refractor/lang/fortran.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/fortran.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = fortran\nfortran.displayName = 'fortran'\nfortran.aliases = []\nfunction fortran(Prism) {\n  Prism.languages.fortran = {\n    'quoted-number': {\n      pattern: /[BOZ](['\"])[A-F0-9]+\\1/i,\n      alias: 'number'\n    },\n    string: {\n      pattern:\n        /(?:\\b\\w+_)?(['\"])(?:\\1\\1|&(?:\\r\\n?|\\n)(?:[ \\t]*!.*(?:\\r\\n?|\\n)|(?![ \\t]*!))|(?!\\1).)*(?:\\1|&)/,\n      inside: {\n        comment: {\n          pattern: /(&(?:\\r\\n?|\\n)\\s*)!.*/,\n          lookbehind: true\n        }\n      }\n    },\n    comment: {\n      pattern: /!.*/,\n      greedy: true\n    },\n    boolean: /\\.(?:FALSE|TRUE)\\.(?:_\\w+)?/i,\n    number: /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:[ED][+-]?\\d+)?(?:_\\w+)?/i,\n    keyword: [\n      // Types\n      /\\b(?:CHARACTER|COMPLEX|DOUBLE ?PRECISION|INTEGER|LOGICAL|REAL)\\b/i, // END statements\n      /\\b(?:END ?)?(?:BLOCK ?DATA|DO|FILE|FORALL|FUNCTION|IF|INTERFACE|MODULE(?! PROCEDURE)|PROGRAM|SELECT|SUBROUTINE|TYPE|WHERE)\\b/i, // Statements\n      /\\b(?:ALLOCATABLE|ALLOCATE|BACKSPACE|CALL|CASE|CLOSE|COMMON|CONTAINS|CONTINUE|CYCLE|DATA|DEALLOCATE|DIMENSION|DO|END|EQUIVALENCE|EXIT|EXTERNAL|FORMAT|GO ?TO|IMPLICIT(?: NONE)?|INQUIRE|INTENT|INTRINSIC|MODULE PROCEDURE|NAMELIST|NULLIFY|OPEN|OPTIONAL|PARAMETER|POINTER|PRINT|PRIVATE|PUBLIC|READ|RETURN|REWIND|SAVE|SELECT|STOP|TARGET|WHILE|WRITE)\\b/i, // Others\n      /\\b(?:ASSIGNMENT|DEFAULT|ELEMENTAL|ELSE|ELSEIF|ELSEWHERE|ENTRY|IN|INCLUDE|INOUT|KIND|NULL|ONLY|OPERATOR|OUT|PURE|RECURSIVE|RESULT|SEQUENCE|STAT|THEN|USE)\\b/i\n    ],\n    operator: [\n      /\\*\\*|\\/\\/|=>|[=\\/]=|[<>]=?|::|[+\\-*=%]|\\.[A-Z]+\\./i,\n      {\n        // Use lookbehind to prevent confusion with (/ /)\n        pattern: /(^|(?!\\().)\\/(?!\\))/,\n        lookbehind: true\n      }\n    ],\n    punctuation: /\\(\\/|\\/\\)|[(),;:&]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/fortran.js?");

/***/ })

}]);