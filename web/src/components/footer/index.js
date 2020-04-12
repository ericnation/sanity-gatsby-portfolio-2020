import React from 'react';
import { MdExpandLess } from 'react-icons/md';
import styles from './footer.module.css';
import Logo from '../logo';

const Footer = () => {
  const date = new Date();
  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.backToTop}>
        <button type="button" className={styles.btn} onClick={() => backToTop()}>
          Back to top
          <MdExpandLess className={styles.btnIcon} />
        </button>
      </div>
      <Logo color="white" />
      <span className={styles.copyright}>
        &copy; Copyright {date.getFullYear()} - Eric Nation. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
