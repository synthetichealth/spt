"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_latex"],{

/***/ "./node_modules/refractor/lang/latex.js":
/*!**********************************************!*\
  !*** ./node_modules/refractor/lang/latex.js ***!
  \**********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = latex\nlatex.displayName = 'latex'\nlatex.aliases = ['tex', 'context']\nfunction latex(Prism) {\n  ;(function (Prism) {\n    var funcPattern = /\\\\(?:[^a-z()[\\]]|[a-z*]+)/i\n    var insideEqu = {\n      'equation-command': {\n        pattern: funcPattern,\n        alias: 'regex'\n      }\n    }\n    Prism.languages.latex = {\n      comment: /%.*/,\n      // the verbatim environment prints whitespace to the document\n      cdata: {\n        pattern:\n          /(\\\\begin\\{((?:lstlisting|verbatim)\\*?)\\})[\\s\\S]*?(?=\\\\end\\{\\2\\})/,\n        lookbehind: true\n      },\n      /*\n       * equations can be between $$ $$ or $ $ or \\( \\) or \\[ \\]\n       * (all are multiline)\n       */\n      equation: [\n        {\n          pattern:\n            /\\$\\$(?:\\\\[\\s\\S]|[^\\\\$])+\\$\\$|\\$(?:\\\\[\\s\\S]|[^\\\\$])+\\$|\\\\\\([\\s\\S]*?\\\\\\)|\\\\\\[[\\s\\S]*?\\\\\\]/,\n          inside: insideEqu,\n          alias: 'string'\n        },\n        {\n          pattern:\n            /(\\\\begin\\{((?:align|eqnarray|equation|gather|math|multline)\\*?)\\})[\\s\\S]*?(?=\\\\end\\{\\2\\})/,\n          lookbehind: true,\n          inside: insideEqu,\n          alias: 'string'\n        }\n      ],\n      /*\n       * arguments which are keywords or references are highlighted\n       * as keywords\n       */\n      keyword: {\n        pattern:\n          /(\\\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\\[[^\\]]+\\])?\\{)[^}]+(?=\\})/,\n        lookbehind: true\n      },\n      url: {\n        pattern: /(\\\\url\\{)[^}]+(?=\\})/,\n        lookbehind: true\n      },\n      /*\n       * section or chapter headlines are highlighted as bold so that\n       * they stand out more\n       */\n      headline: {\n        pattern:\n          /(\\\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\\*?(?:\\[[^\\]]+\\])?\\{)[^}]+(?=\\})/,\n        lookbehind: true,\n        alias: 'class-name'\n      },\n      function: {\n        pattern: funcPattern,\n        alias: 'selector'\n      },\n      punctuation: /[[\\]{}&]/\n    }\n    Prism.languages.tex = Prism.languages.latex\n    Prism.languages.context = Prism.languages.latex\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/latex.js?");

/***/ })

}]);