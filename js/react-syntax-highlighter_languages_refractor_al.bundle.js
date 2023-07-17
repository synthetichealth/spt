"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_al"],{

/***/ "./node_modules/refractor/lang/al.js":
/*!*******************************************!*\
  !*** ./node_modules/refractor/lang/al.js ***!
  \*******************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = al\nal.displayName = 'al'\nal.aliases = []\nfunction al(Prism) {\n  // based on https://github.com/microsoft/AL/blob/master/grammar/alsyntax.tmlanguage\n  Prism.languages.al = {\n    comment: /\\/\\/.*|\\/\\*[\\s\\S]*?\\*\\//,\n    string: {\n      pattern: /'(?:''|[^'\\r\\n])*'(?!')|\"(?:\"\"|[^\"\\r\\n])*\"(?!\")/,\n      greedy: true\n    },\n    function: {\n      pattern:\n        /(\\b(?:event|procedure|trigger)\\s+|(?:^|[^.])\\.\\s*)[a-z_]\\w*(?=\\s*\\()/i,\n      lookbehind: true\n    },\n    keyword: [\n      // keywords\n      /\\b(?:array|asserterror|begin|break|case|do|downto|else|end|event|exit|for|foreach|function|if|implements|in|indataset|interface|internal|local|of|procedure|program|protected|repeat|runonclient|securityfiltering|suppressdispose|temporary|then|to|trigger|until|var|while|with|withevents)\\b/i, // objects and metadata that are used like keywords\n      /\\b(?:action|actions|addafter|addbefore|addfirst|addlast|area|assembly|chartpart|codeunit|column|controladdin|cuegroup|customizes|dataitem|dataset|dotnet|elements|enum|enumextension|extends|field|fieldattribute|fieldelement|fieldgroup|fieldgroups|fields|filter|fixed|grid|group|key|keys|label|labels|layout|modify|moveafter|movebefore|movefirst|movelast|page|pagecustomization|pageextension|part|profile|query|repeater|report|requestpage|schema|separator|systempart|table|tableelement|tableextension|textattribute|textelement|type|usercontrol|value|xmlport)\\b/i\n    ],\n    number:\n      /\\b(?:0x[\\da-f]+|(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:e[+-]?\\d+)?)(?:F|LL?|U(?:LL?)?)?\\b/i,\n    boolean: /\\b(?:false|true)\\b/i,\n    variable: /\\b(?:Curr(?:FieldNo|Page|Report)|x?Rec|RequestOptionsPage)\\b/,\n    'class-name':\n      /\\b(?:automation|biginteger|bigtext|blob|boolean|byte|char|clienttype|code|completiontriggererrorlevel|connectiontype|database|dataclassification|datascope|date|dateformula|datetime|decimal|defaultlayout|dialog|dictionary|dotnetassembly|dotnettypedeclaration|duration|errorinfo|errortype|executioncontext|executionmode|fieldclass|fieldref|fieldtype|file|filterpagebuilder|guid|httpclient|httpcontent|httpheaders|httprequestmessage|httpresponsemessage|instream|integer|joker|jsonarray|jsonobject|jsontoken|jsonvalue|keyref|list|moduledependencyinfo|moduleinfo|none|notification|notificationscope|objecttype|option|outstream|pageresult|record|recordid|recordref|reportformat|securityfilter|sessionsettings|tableconnectiontype|tablefilter|testaction|testfield|testfilterfield|testpage|testpermissions|testrequestpage|text|textbuilder|textconst|textencoding|time|transactionmodel|transactiontype|variant|verbosity|version|view|views|webserviceactioncontext|webserviceactionresultcode|xmlattribute|xmlattributecollection|xmlcdata|xmlcomment|xmldeclaration|xmldocument|xmldocumenttype|xmlelement|xmlnamespacemanager|xmlnametable|xmlnode|xmlnodelist|xmlprocessinginstruction|xmlreadoptions|xmltext|xmlwriteoptions)\\b/i,\n    operator: /\\.\\.|:[=:]|[-+*/]=?|<>|[<>]=?|=|\\b(?:and|div|mod|not|or|xor)\\b/i,\n    punctuation: /[()\\[\\]{}:.;,]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/al.js?");

/***/ })

}]);