"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_splunkSpl"],{

/***/ "./node_modules/refractor/lang/splunk-spl.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/splunk-spl.js ***!
  \***************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = splunkSpl\nsplunkSpl.displayName = 'splunkSpl'\nsplunkSpl.aliases = []\nfunction splunkSpl(Prism) {\n  Prism.languages['splunk-spl'] = {\n    comment: /`comment\\(\"(?:\\\\.|[^\\\\\"])*\"\\)`/,\n    string: {\n      pattern: /\"(?:\\\\.|[^\\\\\"])*\"/,\n      greedy: true\n    },\n    // https://docs.splunk.com/Documentation/Splunk/7.3.0/SearchReference/ListOfSearchCommands\n    keyword:\n      /\\b(?:abstract|accum|addcoltotals|addinfo|addtotals|analyzefields|anomalies|anomalousvalue|anomalydetection|append|appendcols|appendcsv|appendlookup|appendpipe|arules|associate|audit|autoregress|bin|bucket|bucketdir|chart|cluster|cofilter|collect|concurrency|contingency|convert|correlate|datamodel|dbinspect|dedup|delete|delta|diff|erex|eval|eventcount|eventstats|extract|fieldformat|fields|fieldsummary|filldown|fillnull|findtypes|folderize|foreach|format|from|gauge|gentimes|geom|geomfilter|geostats|head|highlight|history|iconify|input|inputcsv|inputlookup|iplocation|join|kmeans|kv|kvform|loadjob|localize|localop|lookup|makecontinuous|makemv|makeresults|map|mcollect|metadata|metasearch|meventcollect|mstats|multikv|multisearch|mvcombine|mvexpand|nomv|outlier|outputcsv|outputlookup|outputtext|overlap|pivot|predict|rangemap|rare|regex|relevancy|reltime|rename|replace|rest|return|reverse|rex|rtorder|run|savedsearch|script|scrub|search|searchtxn|selfjoin|sendemail|set|setfields|sichart|sirare|sistats|sitimechart|sitop|sort|spath|stats|strcat|streamstats|table|tags|tail|timechart|timewrap|top|transaction|transpose|trendline|tscollect|tstats|typeahead|typelearner|typer|union|uniq|untable|where|x11|xmlkv|xmlunescape|xpath|xyseries)\\b/i,\n    'operator-word': {\n      pattern: /\\b(?:and|as|by|not|or|xor)\\b/i,\n      alias: 'operator'\n    },\n    function: /\\b\\w+(?=\\s*\\()/,\n    property: /\\b\\w+(?=\\s*=(?!=))/,\n    date: {\n      // MM/DD/YYYY(:HH:MM:SS)?\n      pattern: /\\b\\d{1,2}\\/\\d{1,2}\\/\\d{1,4}(?:(?::\\d{1,2}){3})?\\b/,\n      alias: 'number'\n    },\n    number: /\\b\\d+(?:\\.\\d+)?\\b/,\n    boolean: /\\b(?:f|false|t|true)\\b/i,\n    operator: /[<>=]=?|[-+*/%|]/,\n    punctuation: /[()[\\],]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/splunk-spl.js?");

/***/ })

}]);