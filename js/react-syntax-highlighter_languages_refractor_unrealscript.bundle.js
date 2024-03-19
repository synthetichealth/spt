"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_unrealscript"],{

/***/ "./node_modules/refractor/lang/unrealscript.js":
/*!*****************************************************!*\
  !*** ./node_modules/refractor/lang/unrealscript.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = unrealscript\nunrealscript.displayName = 'unrealscript'\nunrealscript.aliases = ['uc', 'uscript']\nfunction unrealscript(Prism) {\n  Prism.languages.unrealscript = {\n    comment: /\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\//,\n    string: {\n      pattern: /([\"'])(?:\\\\(?:\\r\\n|[\\s\\S])|(?!\\1)[^\\\\\\r\\n])*\\1/,\n      greedy: true\n    },\n    category: {\n      pattern:\n        /(\\b(?:(?:autoexpand|hide|show)categories|var)\\s*\\()[^()]+(?=\\))/,\n      lookbehind: true,\n      greedy: true,\n      alias: 'property'\n    },\n    metadata: {\n      pattern: /(\\w\\s*)<\\s*\\w+\\s*=[^<>|=\\r\\n]+(?:\\|\\s*\\w+\\s*=[^<>|=\\r\\n]+)*>/,\n      lookbehind: true,\n      greedy: true,\n      inside: {\n        property: /\\b\\w+(?=\\s*=)/,\n        operator: /=/,\n        punctuation: /[<>|]/\n      }\n    },\n    macro: {\n      pattern: /`\\w+/,\n      alias: 'property'\n    },\n    'class-name': {\n      pattern:\n        /(\\b(?:class|enum|extends|interface|state(?:\\(\\))?|struct|within)\\s+)\\w+/,\n      lookbehind: true\n    },\n    keyword:\n      /\\b(?:abstract|actor|array|auto|autoexpandcategories|bool|break|byte|case|class|classgroup|client|coerce|collapsecategories|config|const|continue|default|defaultproperties|delegate|dependson|deprecated|do|dontcollapsecategories|editconst|editinlinenew|else|enum|event|exec|export|extends|final|float|for|forcescriptorder|foreach|function|goto|guid|hidecategories|hidedropdown|if|ignores|implements|inherits|input|int|interface|iterator|latent|local|material|name|native|nativereplication|noexport|nontransient|noteditinlinenew|notplaceable|operator|optional|out|pawn|perobjectconfig|perobjectlocalized|placeable|postoperator|preoperator|private|protected|reliable|replication|return|server|showcategories|simulated|singular|state|static|string|struct|structdefault|structdefaultproperties|switch|texture|transient|travel|unreliable|until|var|vector|while|within)\\b/,\n    function: /\\b[a-z_]\\w*(?=\\s*\\()/i,\n    boolean: /\\b(?:false|true)\\b/,\n    number: /\\b0x[\\da-f]+\\b|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:e[+-]?\\d+)?/i,\n    // https://docs.unrealengine.com/udk/Three/UnrealScriptExpressions.html\n    operator:\n      />>|<<|--|\\+\\+|\\*\\*|[-+*/~!=<>$@]=?|&&?|\\|\\|?|\\^\\^?|[?:%]|\\b(?:ClockwiseFrom|Cross|Dot)\\b/,\n    punctuation: /[()[\\]{};,.]/\n  }\n  Prism.languages.uc = Prism.languages.uscript = Prism.languages.unrealscript\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/unrealscript.js?");

/***/ })

}]);