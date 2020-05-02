import React, { useEffect } from 'react';
import { MdExpandLess } from 'react-icons/md';
import styles from './footer.module.css';
import Logo from '../logo';

const Footer = () => {
  let globalWindow = null;
  useEffect(() => {
    globalWindow = window;
  });
  const date = new Date();
  const backToTop = () => {
    globalWindow.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.backToTop}>
        <button type="button" className={styles.btn} onClick={() => backToTop()}>
          Back to top
          <MdExpandLess className={styles.btnIcon} />
        </button>
      </div>
      <Logo color="white" width={63} />
      <span className={styles.madeWith}>
        Built with{' '}
        <a href="https://sanity.io" target="_blank">
          Sanity.io
        </a>{' '}
        and{' '}
        <a href="https://gatsbyjs.org" target="_blank">
          Gatsby
        </a>
      </span>
      <span className={styles.copyright}>
        &copy; Copyright {date.getFullYear()} - Eric Nation. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
