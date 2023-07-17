import React from 'react';
import { CopyBlock } from "react-code-blocks";
/* Docs for react-code-blocks resource: https://github.com/rajinwonderland/react-code-blocks/tree/master */

export function BashCodeBlock({code, lineNumbers=false, singleLine=false}) {

  const codeTheme = {
    lineNumberColor: `#665973`,
    lineNumberBgColor: `#30343d`,
    backgroundColor: `#30343d`,
    /* unfortunately all the cool syntax highlighting is overwritten by app.css */
    textColor: `#92d9ff`,
    substringColor: `#bf8ef1`,
    keywordColor: `#df769b`,
    attributeColor: `#e69533`,
    selectorAttributeColor: `#ccbfd9`,
    docTagColor: `#e66533`,
    nameColor: `#ccbfd9`,
    builtInColor: `#e66533`,
    literalColor: `#ccbfd9`,
    bulletColor: `#ccbfd9`,
    codeColor: `#30343d`,
    additionColor: `#a3be8c`,
    regexpColor: `#7f659a`,
    symbolColor: `#ccbfd9`,
    variableColor: `#e4b781`,
    templateVariableColor: `#bf8ef1`,
    linkColor: `#bf8ef1`,
    selectorClassColor: `#d67e5c`,
    typeColor: `#d67e5c`,
    stringColor: `#49e9a6`,
    selectorIdColor: `#d67e5c`,
    quoteColor: `#665973`,
    templateTagColor: `#e66533`,
    deletionColor: `#bf616a`,
    titleColor: `#d67e5c`,
    sectionColor: `#e4b781`,
    commentColor: `#7f659a`,
    metaKeywordColor: `#7f659a`,
    metaColor: `#7f659a`,
    functionColor: `#49ace9`,
    numberColor: `#6258e5`,
  }

  return(<CopyBlock text={code.trim()} showLineNumbers={false} theme={codeTheme} codeBlock />);
}
