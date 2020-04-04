import React from 'react';
import styles from './footer.module.css';
import Logo from '../logo';

const Footer = () => {
  const date = new Date();
  return (
    <footer className={styles.footer}>
      <div className={styles.backToTop}>
        <button type="button" className={styles.btn}>Back to top</button>
      </div>
      <Logo color="white" />
      <span className={styles.copyright}>
        &copy; Copyright {date.getFullYear()} - Eric Nation. All rights reserved.
      </span>
    </footer>
  );
};

export default Footer;
