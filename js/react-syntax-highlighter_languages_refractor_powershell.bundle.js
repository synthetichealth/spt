"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_powershell"],{

/***/ "./node_modules/refractor/lang/powershell.js":
/*!***************************************************!*\
  !*** ./node_modules/refractor/lang/powershell.js ***!
  \***************************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = powershell\npowershell.displayName = 'powershell'\npowershell.aliases = []\nfunction powershell(Prism) {\n  ;(function (Prism) {\n    var powershell = (Prism.languages.powershell = {\n      comment: [\n        {\n          pattern: /(^|[^`])<#[\\s\\S]*?#>/,\n          lookbehind: true\n        },\n        {\n          pattern: /(^|[^`])#.*/,\n          lookbehind: true\n        }\n      ],\n      string: [\n        {\n          pattern: /\"(?:`[\\s\\S]|[^`\"])*\"/,\n          greedy: true,\n          inside: null // see below\n        },\n        {\n          pattern: /'(?:[^']|'')*'/,\n          greedy: true\n        }\n      ],\n      // Matches name spaces as well as casts, attribute decorators. Force starting with letter to avoid matching array indices\n      // Supports two levels of nested brackets (e.g. `[OutputType([System.Collections.Generic.List[int]])]`)\n      namespace: /\\[[a-z](?:\\[(?:\\[[^\\]]*\\]|[^\\[\\]])*\\]|[^\\[\\]])*\\]/i,\n      boolean: /\\$(?:false|true)\\b/i,\n      variable: /\\$\\w+\\b/,\n      // Cmdlets and aliases. Aliases should come last, otherwise \"write\" gets preferred over \"write-host\" for example\n      // Get-Command | ?{ $_.ModuleName -match \"Microsoft.PowerShell.(Util|Core|Management)\" }\n      // Get-Alias | ?{ $_.ReferencedCommand.Module.Name -match \"Microsoft.PowerShell.(Util|Core|Management)\" }\n      function: [\n        /\\b(?:Add|Approve|Assert|Backup|Block|Checkpoint|Clear|Close|Compare|Complete|Compress|Confirm|Connect|Convert|ConvertFrom|ConvertTo|Copy|Debug|Deny|Disable|Disconnect|Dismount|Edit|Enable|Enter|Exit|Expand|Export|Find|ForEach|Format|Get|Grant|Group|Hide|Import|Initialize|Install|Invoke|Join|Limit|Lock|Measure|Merge|Move|New|Open|Optimize|Out|Ping|Pop|Protect|Publish|Push|Read|Receive|Redo|Register|Remove|Rename|Repair|Request|Reset|Resize|Resolve|Restart|Restore|Resume|Revoke|Save|Search|Select|Send|Set|Show|Skip|Sort|Split|Start|Step|Stop|Submit|Suspend|Switch|Sync|Tee|Test|Trace|Unblock|Undo|Uninstall|Unlock|Unprotect|Unpublish|Unregister|Update|Use|Wait|Watch|Where|Write)-[a-z]+\\b/i,\n        /\\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\\b/i\n      ],\n      // per http://technet.microsoft.com/en-us/library/hh847744.aspx\n      keyword:\n        /\\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\\b/i,\n      operator: {\n        pattern:\n          /(^|\\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\\b|-[-=]?|\\+[+=]?|[*\\/%]=?)/i,\n        lookbehind: true\n      },\n      punctuation: /[|{}[\\];(),.]/\n    }) // Variable interpolation inside strings, and nested expressions\n    powershell.string[0].inside = {\n      function: {\n        // Allow for one level of nesting\n        pattern: /(^|[^`])\\$\\((?:\\$\\([^\\r\\n()]*\\)|(?!\\$\\()[^\\r\\n)])*\\)/,\n        lookbehind: true,\n        inside: powershell\n      },\n      boolean: powershell.boolean,\n      variable: powershell.variable\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/powershell.js?");

/***/ })

}]);