import React from 'react';
import Footer from '../footer';

import '../../styles/layout.css';
import styles from './layout.module.css';

const Layout = ({
  children,
}) => (
  <>
    <div className={styles.content}>{children}</div>
    <Footer />
  </>
);

export default Layout;
