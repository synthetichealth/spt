"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_cssExtras"],{

/***/ "./node_modules/refractor/lang/css-extras.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/css-extras.js ***!
  \***************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = cssExtras\ncssExtras.displayName = 'cssExtras'\ncssExtras.aliases = []\nfunction cssExtras(Prism) {\n  ;(function (Prism) {\n    var string = /(\"|')(?:\\\\(?:\\r\\n|[\\s\\S])|(?!\\1)[^\\\\\\r\\n])*\\1/\n    var selectorInside\n    Prism.languages.css.selector = {\n      pattern: Prism.languages.css.selector.pattern,\n      lookbehind: true,\n      inside: (selectorInside = {\n        'pseudo-element':\n          /:(?:after|before|first-letter|first-line|selection)|::[-\\w]+/,\n        'pseudo-class': /:[-\\w]+/,\n        class: /\\.[-\\w]+/,\n        id: /#[-\\w]+/,\n        attribute: {\n          pattern: RegExp('\\\\[(?:[^[\\\\]\"\\']|' + string.source + ')*\\\\]'),\n          greedy: true,\n          inside: {\n            punctuation: /^\\[|\\]$/,\n            'case-sensitivity': {\n              pattern: /(\\s)[si]$/i,\n              lookbehind: true,\n              alias: 'keyword'\n            },\n            namespace: {\n              pattern: /^(\\s*)(?:(?!\\s)[-*\\w\\xA0-\\uFFFF])*\\|(?!=)/,\n              lookbehind: true,\n              inside: {\n                punctuation: /\\|$/\n              }\n            },\n            'attr-name': {\n              pattern: /^(\\s*)(?:(?!\\s)[-\\w\\xA0-\\uFFFF])+/,\n              lookbehind: true\n            },\n            'attr-value': [\n              string,\n              {\n                pattern: /(=\\s*)(?:(?!\\s)[-\\w\\xA0-\\uFFFF])+(?=\\s*$)/,\n                lookbehind: true\n              }\n            ],\n            operator: /[|~*^$]?=/\n          }\n        },\n        'n-th': [\n          {\n            pattern: /(\\(\\s*)[+-]?\\d*[\\dn](?:\\s*[+-]\\s*\\d+)?(?=\\s*\\))/,\n            lookbehind: true,\n            inside: {\n              number: /[\\dn]+/,\n              operator: /[+-]/\n            }\n          },\n          {\n            pattern: /(\\(\\s*)(?:even|odd)(?=\\s*\\))/i,\n            lookbehind: true\n          }\n        ],\n        combinator: />|\\+|~|\\|\\|/,\n        // the `tag` token has been existed and removed.\n        // because we can't find a perfect tokenize to match it.\n        // if you want to add it, please read https://github.com/PrismJS/prism/pull/2373 first.\n        punctuation: /[(),]/\n      })\n    }\n    Prism.languages.css['atrule'].inside['selector-function-argument'].inside =\n      selectorInside\n    Prism.languages.insertBefore('css', 'property', {\n      variable: {\n        pattern:\n          /(^|[^-\\w\\xA0-\\uFFFF])--(?!\\s)[-_a-z\\xA0-\\uFFFF](?:(?!\\s)[-\\w\\xA0-\\uFFFF])*/i,\n        lookbehind: true\n      }\n    })\n    var unit = {\n      pattern: /(\\b\\d+)(?:%|[a-z]+(?![\\w-]))/,\n      lookbehind: true\n    } // 123 -123 .123 -.123 12.3 -12.3\n    var number = {\n      pattern: /(^|[^\\w.-])-?(?:\\d+(?:\\.\\d+)?|\\.\\d+)/,\n      lookbehind: true\n    }\n    Prism.languages.insertBefore('css', 'function', {\n      operator: {\n        pattern: /(\\s)[+\\-*\\/](?=\\s)/,\n        lookbehind: true\n      },\n      // CAREFUL!\n      // Previewers and Inline color use hexcode and color.\n      hexcode: {\n        pattern: /\\B#[\\da-f]{3,8}\\b/i,\n        alias: 'color'\n      },\n      color: [\n        {\n          pattern:\n            /(^|[^\\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\\w-])/i,\n          lookbehind: true\n        },\n        {\n          pattern:\n            /\\b(?:hsl|rgb)\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*\\)\\B|\\b(?:hsl|rgb)a\\(\\s*\\d{1,3}\\s*,\\s*\\d{1,3}%?\\s*,\\s*\\d{1,3}%?\\s*,\\s*(?:0|0?\\.\\d+|1)\\s*\\)\\B/i,\n          inside: {\n            unit: unit,\n            number: number,\n            function: /[\\w-]+(?=\\()/,\n            punctuation: /[(),]/\n          }\n        }\n      ],\n      // it's important that there is no boundary assertion after the hex digits\n      entity: /\\\\[\\da-f]{1,8}/i,\n      unit: unit,\n      number: number\n    })\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/css-extras.js?");

/***/ })

}]);