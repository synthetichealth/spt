import React, { useState } from 'react';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

const codeBlockStyle = {
  backgroundColor: '#30343d',
  borderRadius: 4,
  color: '#ecf8ff',
  fontFamily:
    'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  fontSize: '1.05rem',
  margin: 0,
  overflowX: 'auto',
  padding: '1rem 3rem 1rem 1rem',
  whiteSpace: 'pre-wrap',
};

const wrapperStyle = {
  position: 'relative',
  textAlign: 'left',
};

const copyButtonStyle = {
  color: '#ecf8ff',
  position: 'absolute',
  right: 4,
  top: 4,
};

export function BashCodeBlock({ code }) {
  const text = code.trim();
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div style={wrapperStyle}>
      <Tooltip title={copied ? 'Copied' : 'Copy'}>
        <IconButton aria-label="copy code" size="small" onClick={copyCode} style={copyButtonStyle}>
          {copied ? <DoneIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
      <pre style={codeBlockStyle}>
        <code>{text}</code>
      </pre>
    </div>
  );
}
