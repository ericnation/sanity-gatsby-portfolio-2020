import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './code.module.css';

const Code = ({ node }) => {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <div className={styles.code}>
      <SyntaxHighlighter showLineNumbers style={xonokai} language={language || 'javascript'}>
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
