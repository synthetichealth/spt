"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_uri"],{

/***/ "./node_modules/refractor/lang/uri.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/uri.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = uri\nuri.displayName = 'uri'\nuri.aliases = ['url']\nfunction uri(Prism) {\n  // https://tools.ietf.org/html/rfc3986#appendix-A\n  Prism.languages.uri = {\n    scheme: {\n      pattern: /^[a-z][a-z0-9+.-]*:/im,\n      greedy: true,\n      inside: {\n        'scheme-delimiter': /:$/\n      }\n    },\n    fragment: {\n      pattern: /#[\\w\\-.~!$&'()*+,;=%:@/?]*/,\n      inside: {\n        'fragment-delimiter': /^#/\n      }\n    },\n    query: {\n      pattern: /\\?[\\w\\-.~!$&'()*+,;=%:@/?]*/,\n      inside: {\n        'query-delimiter': {\n          pattern: /^\\?/,\n          greedy: true\n        },\n        'pair-delimiter': /[&;]/,\n        pair: {\n          pattern: /^[^=][\\s\\S]*/,\n          inside: {\n            key: /^[^=]+/,\n            value: {\n              pattern: /(^=)[\\s\\S]+/,\n              lookbehind: true\n            }\n          }\n        }\n      }\n    },\n    authority: {\n      pattern: RegExp(\n        /^\\/\\//.source + // [ userinfo \"@\" ]\n          /(?:[\\w\\-.~!$&'()*+,;=%:]*@)?/.source + // host\n          ('(?:' + // IP-literal\n            /\\[(?:[0-9a-fA-F:.]{2,48}|v[0-9a-fA-F]+\\.[\\w\\-.~!$&'()*+,;=]+)\\]/\n              .source +\n            '|' + // IPv4address or registered name\n            /[\\w\\-.~!$&'()*+,;=%]*/.source +\n            ')') + // [ \":\" port ]\n          /(?::\\d*)?/.source,\n        'm'\n      ),\n      inside: {\n        'authority-delimiter': /^\\/\\//,\n        'user-info-segment': {\n          pattern: /^[\\w\\-.~!$&'()*+,;=%:]*@/,\n          inside: {\n            'user-info-delimiter': /@$/,\n            'user-info': /^[\\w\\-.~!$&'()*+,;=%:]+/\n          }\n        },\n        'port-segment': {\n          pattern: /:\\d*$/,\n          inside: {\n            'port-delimiter': /^:/,\n            port: /^\\d+/\n          }\n        },\n        host: {\n          pattern: /[\\s\\S]+/,\n          inside: {\n            'ip-literal': {\n              pattern: /^\\[[\\s\\S]+\\]$/,\n              inside: {\n                'ip-literal-delimiter': /^\\[|\\]$/,\n                'ipv-future': /^v[\\s\\S]+/,\n                'ipv6-address': /^[\\s\\S]+/\n              }\n            },\n            'ipv4-address':\n              /^(?:(?:[03-9]\\d?|[12]\\d{0,2})\\.){3}(?:[03-9]\\d?|[12]\\d{0,2})$/\n          }\n        }\n      }\n    },\n    path: {\n      pattern: /^[\\w\\-.~!$&'()*+,;=%:@/]+/m,\n      inside: {\n        'path-separator': /\\//\n      }\n    }\n  }\n  Prism.languages.url = Prism.languages.uri\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/uri.js?");

/***/ })

}]);