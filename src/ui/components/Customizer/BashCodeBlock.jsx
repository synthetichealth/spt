import React from 'react';
import { CopyBlock, noctisViola } from "react-code-blocks";

export function BashCodeBlock({code, lineNumbers=false, singleLine=false}) {
  if( singleLine ) {
    return(<CopyBlock text={code.trim()} language="bash" showLineNumbers={lineNumbers} startingLineNumber={1} theme={noctisViola} codeBlock />);
  }
  else {
    return(<CopyBlock text={code.trim()} language="bash" showLineNumbers={lineNumbers} startingLineNumber={1} theme={noctisViola} />);
  }
}
