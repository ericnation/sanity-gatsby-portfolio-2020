import React from 'react';
import Logo from '../logo';
import styles from './page-loader.module.css';

const PageLoader = () => (
  <div className={styles.pageLoader}>
    <Logo color='black' />
    <div className={styles.loader}>
      <div className={styles.ball} />
      <div className={styles.ball1} />
    </div>
  </div>
);

export default PageLoader;
