"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_uorazor"],{

/***/ "./node_modules/refractor/lang/uorazor.js":
/*!************************************************!*\
  !*** ./node_modules/refractor/lang/uorazor.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = uorazor\nuorazor.displayName = 'uorazor'\nuorazor.aliases = []\nfunction uorazor(Prism) {\n  Prism.languages.uorazor = {\n    'comment-hash': {\n      pattern: /#.*/,\n      alias: 'comment',\n      greedy: true\n    },\n    'comment-slash': {\n      pattern: /\\/\\/.*/,\n      alias: 'comment',\n      greedy: true\n    },\n    string: {\n      pattern: /(\"|')(?:\\\\.|(?!\\1)[^\\\\\\r\\n])*\\1/,\n      inside: {\n        punctuation: /^['\"]|['\"]$/\n      },\n      greedy: true\n    },\n    'source-layers': {\n      pattern:\n        /\\b(?:arms|backpack|blue|bracelet|cancel|clear|cloak|criminal|earrings|enemy|facialhair|friend|friendly|gloves|gray|grey|ground|hair|head|innerlegs|innertorso|innocent|lefthand|middletorso|murderer|neck|nonfriendly|onehandedsecondary|outerlegs|outertorso|pants|red|righthand|ring|self|shirt|shoes|talisman|waist)\\b/i,\n      alias: 'function'\n    },\n    'source-commands': {\n      pattern:\n        /\\b(?:alliance|attack|cast|clearall|clearignore|clearjournal|clearlist|clearsysmsg|createlist|createtimer|dclick|dclicktype|dclickvar|dress|dressconfig|drop|droprelloc|emote|getlabel|guild|gumpclose|gumpresponse|hotkey|ignore|lasttarget|lift|lifttype|menu|menuresponse|msg|org|organize|organizer|overhead|pause|poplist|potion|promptresponse|pushlist|removelist|removetimer|rename|restock|say|scav|scavenger|script|setability|setlasttarget|setskill|settimer|setvar|sysmsg|target|targetloc|targetrelloc|targettype|undress|unignore|unsetvar|useobject|useonce|useskill|usetype|virtue|wait|waitforgump|waitformenu|waitforprompt|waitforstat|waitforsysmsg|waitfortarget|walk|wfsysmsg|wft|whisper|yell)\\b/,\n      alias: 'function'\n    },\n    'tag-name': {\n      pattern: /(^\\{%-?\\s*)\\w+/,\n      lookbehind: true,\n      alias: 'keyword'\n    },\n    delimiter: {\n      pattern: /^\\{[{%]-?|-?[%}]\\}$/,\n      alias: 'punctuation'\n    },\n    function:\n      /\\b(?:atlist|close|closest|count|counter|counttype|dead|dex|diffhits|diffmana|diffstam|diffweight|find|findbuff|finddebuff|findlayer|findtype|findtypelist|followers|gumpexists|hidden|hits|hp|hue|human|humanoid|ingump|inlist|insysmessage|insysmsg|int|invul|lhandempty|list|listexists|mana|maxhits|maxhp|maxmana|maxstam|maxweight|monster|mounted|name|next|noto|paralyzed|poisoned|position|prev|previous|queued|rand|random|rhandempty|skill|stam|str|targetexists|timer|timerexists|varexist|warmode|weight)\\b/,\n    keyword:\n      /\\b(?:and|as|break|continue|else|elseif|endfor|endif|endwhile|for|if|loop|not|or|replay|stop|while)\\b/,\n    boolean: /\\b(?:false|null|true)\\b/,\n    number: /\\b0x[\\dA-Fa-f]+|(?:\\b\\d+(?:\\.\\d*)?|\\B\\.\\d+)(?:[Ee][-+]?\\d+)?/,\n    operator: [\n      {\n        pattern:\n          /(\\s)(?:and|b-and|b-or|b-xor|ends with|in|is|matches|not|or|same as|starts with)(?=\\s)/,\n        lookbehind: true\n      },\n      /[=<>]=?|!=|\\*\\*?|\\/\\/?|\\?:?|[-+~%|]/\n    ],\n    punctuation: /[()\\[\\]{}:.,]/\n  }\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/uorazor.js?");

/***/ })

}]);