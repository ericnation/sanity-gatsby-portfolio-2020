import React from 'react';
import Logo from '../logo';

import styles from './projectHeader.module.css';
import { Link } from 'gatsby';

const ProjectHeader = () => {
  return (
    <header className={styles.wrap}>
      <Link to={'/'}>
        <Logo className={styles.logo} height={100} color="white" />
      </Link>
    </header>
  );
};

export default ProjectHeader;
