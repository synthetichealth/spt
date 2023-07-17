"use strict";
/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunkspt"] = self["webpackChunkspt"] || []).push([["react-syntax-highlighter_languages_refractor_sas"],{

/***/ "./node_modules/refractor/lang/sas.js":
/*!********************************************!*\
  !*** ./node_modules/refractor/lang/sas.js ***!
  \********************************************/
/***/ (function(module) {

eval("\n\nmodule.exports = sas\nsas.displayName = 'sas'\nsas.aliases = []\nfunction sas(Prism) {\n  ;(function (Prism) {\n    var stringPattern = /(?:\"(?:\"\"|[^\"])*\"(?!\")|'(?:''|[^'])*'(?!'))/.source\n    var number = /\\b(?:\\d[\\da-f]*x|\\d+(?:\\.\\d+)?(?:e[+-]?\\d+)?)\\b/i\n    var numericConstant = {\n      pattern: RegExp(stringPattern + '[bx]'),\n      alias: 'number'\n    }\n    var macroVariable = {\n      pattern: /&[a-z_]\\w*/i\n    }\n    var macroKeyword = {\n      pattern:\n        /((?:^|\\s|=|\\())%(?:ABORT|BY|CMS|COPY|DISPLAY|DO|ELSE|END|EVAL|GLOBAL|GO|GOTO|IF|INC|INCLUDE|INDEX|INPUT|KTRIM|LENGTH|LET|LIST|LOCAL|PUT|QKTRIM|QSCAN|QSUBSTR|QSYSFUNC|QUPCASE|RETURN|RUN|SCAN|SUBSTR|SUPERQ|SYMDEL|SYMEXIST|SYMGLOBL|SYMLOCAL|SYSCALL|SYSEVALF|SYSEXEC|SYSFUNC|SYSGET|SYSRPUT|THEN|TO|TSO|UNQUOTE|UNTIL|UPCASE|WHILE|WINDOW)\\b/i,\n      lookbehind: true,\n      alias: 'keyword'\n    }\n    var step = {\n      pattern: /(^|\\s)(?:proc\\s+\\w+|data(?!=)|quit|run)\\b/i,\n      alias: 'keyword',\n      lookbehind: true\n    }\n    var comment = [\n      /\\/\\*[\\s\\S]*?\\*\\//,\n      {\n        pattern: /(^[ \\t]*|;\\s*)\\*[^;]*;/m,\n        lookbehind: true\n      }\n    ]\n    var string = {\n      pattern: RegExp(stringPattern),\n      greedy: true\n    }\n    var punctuation = /[$%@.(){}\\[\\];,\\\\]/\n    var func = {\n      pattern: /%?\\b\\w+(?=\\()/,\n      alias: 'keyword'\n    }\n    var args = {\n      function: func,\n      'arg-value': {\n        pattern: /(=\\s*)[A-Z\\.]+/i,\n        lookbehind: true\n      },\n      operator: /=/,\n      'macro-variable': macroVariable,\n      arg: {\n        pattern: /[A-Z]+/i,\n        alias: 'keyword'\n      },\n      number: number,\n      'numeric-constant': numericConstant,\n      punctuation: punctuation,\n      string: string\n    }\n    var format = {\n      pattern: /\\b(?:format|put)\\b=?[\\w'$.]+/i,\n      inside: {\n        keyword: /^(?:format|put)(?==)/i,\n        equals: /=/,\n        format: {\n          pattern: /(?:\\w|\\$\\d)+\\.\\d?/,\n          alias: 'number'\n        }\n      }\n    }\n    var altformat = {\n      pattern: /\\b(?:format|put)\\s+[\\w']+(?:\\s+[$.\\w]+)+(?=;)/i,\n      inside: {\n        keyword: /^(?:format|put)/i,\n        format: {\n          pattern: /[\\w$]+\\.\\d?/,\n          alias: 'number'\n        }\n      }\n    }\n    var globalStatements = {\n      pattern:\n        /((?:^|\\s)=?)(?:catname|checkpoint execute_always|dm|endsas|filename|footnote|%include|libname|%list|lock|missing|options|page|resetline|%run|sasfile|skip|sysecho|title\\d?)\\b/i,\n      lookbehind: true,\n      alias: 'keyword'\n    }\n    var submitStatement = {\n      pattern: /(^|\\s)(?:submit(?:\\s+(?:load|norun|parseonly))?|endsubmit)\\b/i,\n      lookbehind: true,\n      alias: 'keyword'\n    }\n    var actionSets =\n      /aStore|accessControl|aggregation|audio|autotune|bayesianNetClassifier|bioMedImage|boolRule|builtins|cardinality|cdm|clustering|conditionalRandomFields|configuration|copula|countreg|dataDiscovery|dataPreprocess|dataSciencePilot|dataStep|decisionTree|deduplication|deepLearn|deepNeural|deepRnn|ds2|ecm|entityRes|espCluster|explainModel|factmac|fastKnn|fcmpact|fedSql|freqTab|gVarCluster|gam|gleam|graphSemiSupLearn|hiddenMarkovModel|hyperGroup|ica|image|iml|kernalPca|langModel|ldaTopic|loadStreams|mbc|mixed|mlTools|modelPublishing|network|neuralNet|nmf|nonParametricBayes|nonlinear|optNetwork|optimization|panel|pca|percentile|phreg|pls|qkb|qlim|quantreg|recommend|regression|reinforcementLearn|robustPca|ruleMining|sampling|sandwich|sccasl|search(?:Analytics)?|sentimentAnalysis|sequence|session(?:Prop)?|severity|simSystem|simple|smartData|sparkEmbeddedProcess|sparseML|spatialreg|spc|stabilityMonitoring|svDataDescription|svm|table|text(?:Filters|Frequency|Mining|Parse|Rule(?:Develop|Score)|Topic|Util)|timeData|transpose|tsInfo|tsReconcile|uniTimeSeries|varReduce/\n        .source\n    var casActions = {\n      pattern: RegExp(\n        /(^|\\s)(?:action\\s+)?(?:<act>)\\.[a-z]+\\b[^;]+/.source.replace(\n          /<act>/g,\n          function () {\n            return actionSets\n          }\n        ),\n        'i'\n      ),\n      lookbehind: true,\n      inside: {\n        keyword: RegExp(\n          /(?:<act>)\\.[a-z]+\\b/.source.replace(/<act>/g, function () {\n            return actionSets\n          }),\n          'i'\n        ),\n        action: {\n          pattern: /(?:action)/i,\n          alias: 'keyword'\n        },\n        comment: comment,\n        function: func,\n        'arg-value': args['arg-value'],\n        operator: args.operator,\n        argument: args.arg,\n        number: number,\n        'numeric-constant': numericConstant,\n        punctuation: punctuation,\n        string: string\n      }\n    }\n    var keywords = {\n      pattern:\n        /((?:^|\\s)=?)(?:after|analysis|and|array|barchart|barwidth|begingraph|by|call|cas|cbarline|cfill|class(?:lev)?|close|column|computed?|contains|continue|data(?==)|define|delete|describe|document|do\\s+over|do|dol|drop|dul|else|end(?:comp|source)?|entryTitle|eval(?:uate)?|exec(?:ute)?|exit|file(?:name)?|fill(?:attrs)?|flist|fnc|function(?:list)?|global|goto|group(?:by)?|headline|headskip|histogram|if|infile|keep|keylabel|keyword|label|layout|leave|legendlabel|length|libname|loadactionset|merge|midpoints|_?null_|name|noobs|nowd|ods|options|or|otherwise|out(?:put)?|over(?:lay)?|plot|print|put|raise|ranexp|rannor|rbreak|retain|return|select|session|sessref|set|source|statgraph|sum|summarize|table|temp|terminate|then\\s+do|then|title\\d?|to|var|when|where|xaxisopts|y2axisopts|yaxisopts)\\b/i,\n      lookbehind: true\n    }\n    Prism.languages.sas = {\n      datalines: {\n        pattern: /^([ \\t]*)(?:cards|(?:data)?lines);[\\s\\S]+?^[ \\t]*;/im,\n        lookbehind: true,\n        alias: 'string',\n        inside: {\n          keyword: {\n            pattern: /^(?:cards|(?:data)?lines)/i\n          },\n          punctuation: /;/\n        }\n      },\n      'proc-sql': {\n        pattern:\n          /(^proc\\s+(?:fed)?sql(?:\\s+[\\w|=]+)?;)[\\s\\S]+?(?=^(?:proc\\s+\\w+|data|quit|run);|(?![\\s\\S]))/im,\n        lookbehind: true,\n        inside: {\n          sql: {\n            pattern: RegExp(\n              /^[ \\t]*(?:select|alter\\s+table|(?:create|describe|drop)\\s+(?:index|table(?:\\s+constraints)?|view)|create\\s+unique\\s+index|insert\\s+into|update)(?:<str>|[^;\"'])+;/.source.replace(\n                /<str>/g,\n                function () {\n                  return stringPattern\n                }\n              ),\n              'im'\n            ),\n            alias: 'language-sql',\n            inside: Prism.languages.sql\n          },\n          'global-statements': globalStatements,\n          'sql-statements': {\n            pattern:\n              /(^|\\s)(?:disconnect\\s+from|begin|commit|exec(?:ute)?|reset|rollback|validate)\\b/i,\n            lookbehind: true,\n            alias: 'keyword'\n          },\n          number: number,\n          'numeric-constant': numericConstant,\n          punctuation: punctuation,\n          string: string\n        }\n      },\n      'proc-groovy': {\n        pattern:\n          /(^proc\\s+groovy(?:\\s+[\\w|=]+)?;)[\\s\\S]+?(?=^(?:proc\\s+\\w+|data|quit|run);|(?![\\s\\S]))/im,\n        lookbehind: true,\n        inside: {\n          comment: comment,\n          groovy: {\n            pattern: RegExp(\n              /(^[ \\t]*submit(?:\\s+(?:load|norun|parseonly))?)(?:<str>|[^\"'])+?(?=endsubmit;)/.source.replace(\n                /<str>/g,\n                function () {\n                  return stringPattern\n                }\n              ),\n              'im'\n            ),\n            lookbehind: true,\n            alias: 'language-groovy',\n            inside: Prism.languages.groovy\n          },\n          keyword: keywords,\n          'submit-statement': submitStatement,\n          'global-statements': globalStatements,\n          number: number,\n          'numeric-constant': numericConstant,\n          punctuation: punctuation,\n          string: string\n        }\n      },\n      'proc-lua': {\n        pattern:\n          /(^proc\\s+lua(?:\\s+[\\w|=]+)?;)[\\s\\S]+?(?=^(?:proc\\s+\\w+|data|quit|run);|(?![\\s\\S]))/im,\n        lookbehind: true,\n        inside: {\n          comment: comment,\n          lua: {\n            pattern: RegExp(\n              /(^[ \\t]*submit(?:\\s+(?:load|norun|parseonly))?)(?:<str>|[^\"'])+?(?=endsubmit;)/.source.replace(\n                /<str>/g,\n                function () {\n                  return stringPattern\n                }\n              ),\n              'im'\n            ),\n            lookbehind: true,\n            alias: 'language-lua',\n            inside: Prism.languages.lua\n          },\n          keyword: keywords,\n          'submit-statement': submitStatement,\n          'global-statements': globalStatements,\n          number: number,\n          'numeric-constant': numericConstant,\n          punctuation: punctuation,\n          string: string\n        }\n      },\n      'proc-cas': {\n        pattern:\n          /(^proc\\s+cas(?:\\s+[\\w|=]+)?;)[\\s\\S]+?(?=^(?:proc\\s+\\w+|quit|data);|(?![\\s\\S]))/im,\n        lookbehind: true,\n        inside: {\n          comment: comment,\n          'statement-var': {\n            pattern: /((?:^|\\s)=?)saveresult\\s[^;]+/im,\n            lookbehind: true,\n            inside: {\n              statement: {\n                pattern: /^saveresult\\s+\\S+/i,\n                inside: {\n                  keyword: /^(?:saveresult)/i\n                }\n              },\n              rest: args\n            }\n          },\n          'cas-actions': casActions,\n          statement: {\n            pattern:\n              /((?:^|\\s)=?)(?:default|(?:un)?set|on|output|upload)[^;]+/im,\n            lookbehind: true,\n            inside: args\n          },\n          step: step,\n          keyword: keywords,\n          function: func,\n          format: format,\n          altformat: altformat,\n          'global-statements': globalStatements,\n          number: number,\n          'numeric-constant': numericConstant,\n          punctuation: punctuation,\n          string: string\n        }\n      },\n      'proc-args': {\n        pattern: RegExp(\n          /(^proc\\s+\\w+\\s+)(?!\\s)(?:[^;\"']|<str>)+;/.source.replace(\n            /<str>/g,\n            function () {\n              return stringPattern\n            }\n          ),\n          'im'\n        ),\n        lookbehind: true,\n        inside: args\n      },\n      /*Special keywords within macros*/\n      'macro-keyword': macroKeyword,\n      'macro-variable': macroVariable,\n      'macro-string-functions': {\n        pattern:\n          /((?:^|\\s|=))%(?:BQUOTE|NRBQUOTE|NRQUOTE|NRSTR|QUOTE|STR)\\(.*?(?:[^%]\\))/i,\n        lookbehind: true,\n        inside: {\n          function: {\n            pattern: /%(?:BQUOTE|NRBQUOTE|NRQUOTE|NRSTR|QUOTE|STR)/i,\n            alias: 'keyword'\n          },\n          'macro-keyword': macroKeyword,\n          'macro-variable': macroVariable,\n          'escaped-char': {\n            pattern: /%['\"()<>=¬^~;,#]/\n          },\n          punctuation: punctuation\n        }\n      },\n      'macro-declaration': {\n        pattern: /^%macro[^;]+(?=;)/im,\n        inside: {\n          keyword: /%macro/i\n        }\n      },\n      'macro-end': {\n        pattern: /^%mend[^;]+(?=;)/im,\n        inside: {\n          keyword: /%mend/i\n        }\n      },\n      /*%_zscore(headcir, _lhc, _mhc, _shc, headcz, headcpct, _Fheadcz); */\n      macro: {\n        pattern: /%_\\w+(?=\\()/,\n        alias: 'keyword'\n      },\n      input: {\n        pattern: /\\binput\\s[-\\w\\s/*.$&]+;/i,\n        inside: {\n          input: {\n            alias: 'keyword',\n            pattern: /^input/i\n          },\n          comment: comment,\n          number: number,\n          'numeric-constant': numericConstant\n        }\n      },\n      'options-args': {\n        pattern: /(^options)[-'\"|/\\\\<>*+=:()\\w\\s]*(?=;)/im,\n        lookbehind: true,\n        inside: args\n      },\n      'cas-actions': casActions,\n      comment: comment,\n      function: func,\n      format: format,\n      altformat: altformat,\n      'numeric-constant': numericConstant,\n      datetime: {\n        // '1jan2013'd, '9:25:19pm't, '18jan2003:9:27:05am'dt\n        pattern: RegExp(stringPattern + '(?:dt?|t)'),\n        alias: 'number'\n      },\n      string: string,\n      step: step,\n      keyword: keywords,\n      // In SAS Studio syntax highlighting, these operators are styled like keywords\n      'operator-keyword': {\n        pattern: /\\b(?:eq|ge|gt|in|le|lt|ne|not)\\b/i,\n        alias: 'operator'\n      },\n      // Decimal (1.2e23), hexadecimal (0c1x)\n      number: number,\n      operator: /\\*\\*?|\\|\\|?|!!?|¦¦?|<[>=]?|>[<=]?|[-+\\/=&]|[~¬^]=?/,\n      punctuation: punctuation\n    }\n  })(Prism)\n}\n\n\n//# sourceURL=webpack://spt/./node_modules/refractor/lang/sas.js?");

/***/ })

}]);