import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from './code.module.css';

const Code = ({ node }) => {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <div className={styles.code}>
      <SyntaxHighlighter language={language || 'text'}>{code}</SyntaxHighlighter>
    </div>
  );
};

export default Code;
