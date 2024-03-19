"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_bsl"],{

/***/ "./node_modules/refractor/lang/bsl.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/bsl.js ***!
  \********************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = bsl\nbsl.displayName = 'bsl'\nbsl.aliases = []\nfunction bsl(Prism) {\n  /* eslint-disable no-misleading-character-class */\n  // 1C:Enterprise\n  // https://github.com/Diversus23/\n  //\n  Prism.languages.bsl = {\n    comment: /\\/\\/.*/,\n    string: [\n      // Строки\n      // Strings\n      {\n        pattern: /\"(?:[^\"]|\"\")*\"(?!\")/,\n        greedy: true\n      }, // Дата и время\n      // Date & time\n      {\n        pattern: /'(?:[^'\\r\\n\\\\]|\\\\.)*'/\n      }\n    ],\n    keyword: [\n      {\n        // RU\n        pattern:\n          /(^|[^\\w\\u0400-\\u0484\\u0487-\\u052f\\u1d2b\\u1d78\\u2de0-\\u2dff\\ua640-\\ua69f\\ufe2e\\ufe2f])(?:пока|для|новый|прервать|попытка|исключение|вызватьисключение|иначе|конецпопытки|неопределено|функция|перем|возврат|конецфункции|если|иначеесли|процедура|конецпроцедуры|тогда|знач|экспорт|конецесли|из|каждого|истина|ложь|по|цикл|конеццикла|выполнить)(?![\\w\\u0400-\\u0484\\u0487-\\u052f\\u1d2b\\u1d78\\u2de0-\\u2dff\\ua640-\\ua69f\\ufe2e\\ufe2f])/i,\n        lookbehind: true\n      },\n      {\n        // EN\n        pattern:\n          /\\b(?:break|do|each|else|elseif|enddo|endfunction|endif|endprocedure|endtry|except|execute|export|false|for|function|if|in|new|null|procedure|raise|return|then|to|true|try|undefined|val|var|while)\\b/i\n      }\n    ],\n    number: {\n      pattern:\n        /(^(?=\\d)|[^\\w\\u0400-\\u0484\\u0487-\\u052f\\u1d2b\\u1d78\\u2de0-\\u2dff\\ua640-\\ua69f\\ufe2e\\ufe2f])(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:E[+-]?\\d+)?/i,\n      lookbehind: true\n    },\n    operator: [\n      /[<>+\\-*/]=?|[%=]/, // RU\n      {\n        pattern:\n          /(^|[^\\w\\u0400-\\u0484\\u0487-\\u052f\\u1d2b\\u1d78\\u2de0-\\u2dff\\ua640-\\ua69f\\ufe2e\\ufe2f])(?:и|или|не)(?![\\w\\u0400-\\u0484\\u0487-\\u052f\\u1d2b\\u1d78\\u2de0-\\u2dff\\ua640-\\ua69f\\ufe2e\\ufe2f])/i,\n        lookbehind: true\n      }, // EN\n      {\n        pattern: /\\b(?:and|not|or)\\b/i\n      }\n    ],\n    punctuation: /\\(\\.|\\.\\)|[()\\[\\]:;,.]/,\n    directive: [\n      // Теги препроцессора вида &Клиент, &Сервер, ...\n      // Preprocessor tags of the type &Client, &Server, ...\n      {\n        pattern: /^([ \\t]*)&.*/m,\n        lookbehind: true,\n        greedy: true,\n        alias: 'important'\n      }, // Инструкции препроцессора вида:\n      // #Если Сервер Тогда\n      // ...\n      // #КонецЕсли\n      // Preprocessor instructions of the form:\n      // #If Server Then\n      // ...\n      // #EndIf\n      {\n        pattern: /^([ \\t]*)#.*/gm,\n        lookbehind: true,\n        greedy: true,\n        alias: 'important'\n      }\n    ]\n  }\n  Prism.languages.oscript = Prism.languages['bsl']\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/bsl.js?");

/***/ })

}]);