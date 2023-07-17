"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_solidity"],{

/***/ "./node_modules/refractor/lang/solidity.js":
/*!*************************************************!*\
  !*** ./node_modules/refractor/lang/solidity.js ***!
  \*************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = solidity\nsolidity.displayName = 'solidity'\nsolidity.aliases = ['sol']\nfunction solidity(Prism) {\n  Prism.languages.solidity = Prism.languages.extend('clike', {\n    'class-name': {\n      pattern:\n        /(\\b(?:contract|enum|interface|library|new|struct|using)\\s+)(?!\\d)[\\w$]+/,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:_|anonymous|as|assembly|assert|break|calldata|case|constant|constructor|continue|contract|default|delete|do|else|emit|enum|event|external|for|from|function|if|import|indexed|inherited|interface|internal|is|let|library|mapping|memory|modifier|new|payable|pragma|private|public|pure|require|returns?|revert|selfdestruct|solidity|storage|struct|suicide|switch|this|throw|using|var|view|while)\\b/,\n    operator: /=>|->|:=|=:|\\*\\*|\\+\\+|--|\\|\\||&&|<<=?|>>=?|[-+*/%^&|<>!=]=?|[~?]/\n  })\n  Prism.languages.insertBefore('solidity', 'keyword', {\n    builtin:\n      /\\b(?:address|bool|byte|u?int(?:8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?|string|bytes(?:[1-9]|[12]\\d|3[0-2])?)\\b/\n  })\n  Prism.languages.insertBefore('solidity', 'number', {\n    version: {\n      pattern: /([<>]=?|\\^)\\d+\\.\\d+\\.\\d+\\b/,\n      lookbehind: true,\n      alias: 'number'\n    }\n  })\n  Prism.languages.sol = Prism.languages.solidity\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/solidity.js?");

/***/ })

}]);