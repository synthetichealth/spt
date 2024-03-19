"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_peoplecode"],{

/***/ "./node_modules/refractor/lang/peoplecode.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/peoplecode.js ***!
  \***************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = peoplecode\npeoplecode.displayName = 'peoplecode'\npeoplecode.aliases = ['pcode']\nfunction peoplecode(Prism) {\n  Prism.languages.peoplecode = {\n    comment: RegExp(\n      [\n        // C-style multiline comments\n        /\\/\\*[\\s\\S]*?\\*\\//.source, // REM comments\n        /\\bREM[^;]*;/.source, // Nested <* *> comments\n        /<\\*(?:[^<*]|\\*(?!>)|<(?!\\*)|<\\*(?:(?!\\*>)[\\s\\S])*\\*>)*\\*>/.source, // /+ +/ comments\n        /\\/\\+[\\s\\S]*?\\+\\//.source\n      ].join('|')\n    ),\n    string: {\n      pattern: /'(?:''|[^'\\r\\n])*'(?!')|\"(?:\"\"|[^\"\\r\\n])*\"(?!\")/,\n      greedy: true\n    },\n    variable: /%\\w+/,\n    'function-definition': {\n      pattern: /((?:^|[^\\w-])(?:function|method)\\s+)\\w+/i,\n      lookbehind: true,\n      alias: 'function'\n    },\n    'class-name': {\n      pattern:\n        /((?:^|[^-\\w])(?:as|catch|class|component|create|extends|global|implements|instance|local|of|property|returns)\\s+)\\w+(?::\\w+)*/i,\n      lookbehind: true,\n      inside: {\n        punctuation: /:/\n      }\n    },\n    keyword:\n      /\\b(?:abstract|alias|as|catch|class|component|constant|create|declare|else|end-(?:class|evaluate|for|function|get|if|method|set|try|while)|evaluate|extends|for|function|get|global|if|implements|import|instance|library|local|method|null|of|out|peopleCode|private|program|property|protected|readonly|ref|repeat|returns?|set|step|then|throw|to|try|until|value|when(?:-other)?|while)\\b/i,\n    'operator-keyword': {\n      pattern: /\\b(?:and|not|or)\\b/i,\n      alias: 'operator'\n    },\n    function: /[_a-z]\\w*(?=\\s*\\()/i,\n    boolean: /\\b(?:false|true)\\b/i,\n    number: /\\b\\d+(?:\\.\\d+)?\\b/,\n    operator: /<>|[<>]=?|!=|\\*\\*|[-+*/|=@]/,\n    punctuation: /[:.;,()[\\]]/\n  }\n  Prism.languages.pcode = Prism.languages.peoplecode\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/peoplecode.js?");

/***/ })

}]);