"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_applescript"],{

/***/ "./node_modules/refractor/lang/applescript.js":
/*!****************************************************!*\
  !*** ./node_modules/refractor/lang/applescript.js ***!
  \****************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = applescript\napplescript.displayName = 'applescript'\napplescript.aliases = []\nfunction applescript(Prism) {\n  Prism.languages.applescript = {\n    comment: [\n      // Allow one level of nesting\n      /\\(\\*(?:\\(\\*(?:[^*]|\\*(?!\\)))*\\*\\)|(?!\\(\\*)[\\s\\S])*?\\*\\)/,\n      /--.+/,\n      /#.+/\n    ],\n    string: /\"(?:\\\\.|[^\"\\\\\\r\\n])*\"/,\n    number: /(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e-?\\d+)?\\b/i,\n    operator: [\n      /[&=≠≤≥*+\\-\\/÷^]|[<>]=?/,\n      /\\b(?:(?:begin|end|start)s? with|(?:contains?|(?:does not|doesn't) contain)|(?:is|isn't|is not) (?:contained by|in)|(?:(?:is|isn't|is not) )?(?:greater|less) than(?: or equal)?(?: to)?|(?:comes|(?:does not|doesn't) come) (?:after|before)|(?:is|isn't|is not) equal(?: to)?|(?:(?:does not|doesn't) equal|equal to|equals|is not|isn't)|(?:a )?(?:ref(?: to)?|reference to)|(?:and|as|div|mod|not|or))\\b/\n    ],\n    keyword:\n      /\\b(?:about|above|after|against|apart from|around|aside from|at|back|before|beginning|behind|below|beneath|beside|between|but|by|considering|continue|copy|does|eighth|else|end|equal|error|every|exit|false|fifth|first|for|fourth|from|front|get|given|global|if|ignoring|in|instead of|into|is|it|its|last|local|me|middle|my|ninth|of|on|onto|out of|over|prop|property|put|repeat|return|returning|second|set|seventh|since|sixth|some|tell|tenth|that|the|then|third|through|thru|timeout|times|to|transaction|true|try|until|where|while|whose|with|without)\\b/,\n    'class-name':\n      /\\b(?:POSIX file|RGB color|alias|application|boolean|centimeters|centimetres|class|constant|cubic centimeters|cubic centimetres|cubic feet|cubic inches|cubic meters|cubic metres|cubic yards|date|degrees Celsius|degrees Fahrenheit|degrees Kelvin|feet|file|gallons|grams|inches|integer|kilograms|kilometers|kilometres|list|liters|litres|meters|metres|miles|number|ounces|pounds|quarts|real|record|reference|script|square feet|square kilometers|square kilometres|square meters|square metres|square miles|square yards|text|yards)\\b/,\n    punctuation: /[{}():,¬«»《》]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/applescript.js?");

/***/ })

}]);