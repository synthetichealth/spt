"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_n4js"],{

/***/ "./node_modules/refractor/lang/n4js.js":
/*!*********************************************!*\
  !*** ./node_modules/refractor/lang/n4js.js ***!
  \*********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = n4js\nn4js.displayName = 'n4js'\nn4js.aliases = ['n4jsd']\nfunction n4js(Prism) {\n  Prism.languages.n4js = Prism.languages.extend('javascript', {\n    // Keywords from N4JS language spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html\n    keyword:\n      /\\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\\b/\n  })\n  Prism.languages.insertBefore('n4js', 'constant', {\n    // Annotations in N4JS spec: https://numberfour.github.io/n4js/spec/N4JSSpec.html#_annotations\n    annotation: {\n      pattern: /@+\\w+/,\n      alias: 'operator'\n    }\n  })\n  Prism.languages.n4jsd = Prism.languages.n4js\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/n4js.js?");

/***/ })

}]);