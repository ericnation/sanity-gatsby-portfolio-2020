import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MdClose } from 'react-icons/md';
import { Link } from 'gatsby';
import Scrollspy from 'react-scrollspy';

import styles from './mobile-nav.module.css';
import Logo from '../logo';

const MobileNav = ({ isVisible, navItems, mobileGoToSection, sectionIds, closeMenu }) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div
      className={classNames(styles.wrap, {
        [styles.isVisible]: isVisible,
      })}
    >
      <span className={styles.closeBtn} onClick={closeMenu}>
        <MdClose />
      </span>
      <div className={styles.logo}>
        <Logo color="white" width={60} />
      </div>
      <Scrollspy
        items={sectionIds}
        currentClassName={styles.active}
        componentTag="ul"
        className={styles.navList}
      >
        {navItems &&
          navItems.length &&
          navItems.map((navItem, index) => {
            if (navItem.title === 'Resume') {
              return (
                <li className={styles.navListItem} key={navItem.slug.current}>
                  <Link to={`/${navItem.slug.current || '/'}`} id={`navItem_${index}`}>
                    {navItem.title}
                  </Link>
                </li>
              );
            }
            return (
              <li className={styles.navListItem} key={navItem.slug.current}>
                <a
                  href={`#${navItem.slug.current}`}
                  id={`navItem_${index}`}
                  className={isActive ? styles.active : ''}
                  onClick={(value) => {
                    mobileGoToSection(value, navItem.slug.current);
                  }}
                >
                  {navItem.title}
                </a>
              </li>
            );
          })}
      </Scrollspy>
    </div>
  );
};

MobileNav.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.shape({
        current: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
  mobileGoToSection: PropTypes.func.isRequired,
  sectionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  closeMenu: PropTypes.func.isRequired,
};

export default MobileNav;
