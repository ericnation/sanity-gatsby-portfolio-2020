import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import { MdMenu } from 'react-icons/md';
import Scrollspy from 'react-scrollspy';
import MobileNav from '../mobileNav';
import { useBreakpoint } from '../../lib/helpers';
import styles from './nav.module.css';

const Nav = () => {
  const { sanityNavMenu } = useStaticQuery(graphql`
    query NavMenuQuery {
      sanityNavMenu {
        title
        navItems {
          title
          slug {
            current
          }
        }
        id
      }
    }
  `);

  const [isActive, setIsActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisibleMobileNav, setDisplayMobileNav] = useState(false);
  // Breakpoints
  const isSmMin = useBreakpoint('smMdMin');
  let globalWindow = null;
  useEffect(() => {
    if (typeof window !== `undefined`) {
      globalWindow = window;
    }
    if (!isSmMin) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  const toggleMobileMenu = () => {
    const isMenuVisible = !isVisibleMobileNav;
    setDisplayMobileNav(isMenuVisible);
  };

  const goToSection = (value, section) => {
    value.preventDefault();
    const sectionId = document.getElementById(section);
    if (sectionId) {
      const sectionTop = sectionId.offsetTop;
      globalWindow.scrollTo({ top: sectionTop, behavior: 'smooth' });
    }
  };

  const { navItems } = sanityNavMenu;

  const sectionIds = [];
  navItems.forEach((item) => sectionIds.push(item.slug.current));

  return (
    <nav id="navbar" className={styles.navBar}>
      <div className={styles.container}>
        <div className={styles.navLogo}>
          <Link to="/">ERIC NATION</Link>
        </div>
        {isMobile && (
          <>
            <div className={styles.mobileMenu}>
              <MdMenu onClick={toggleMobileMenu} />
            </div>
            <MobileNav
              isVisible={isVisibleMobileNav}
              sectionIds={sectionIds}
              navItems={navItems}
              mobileGoToSection={goToSection}
              closeMenu={toggleMobileMenu}
            />
          </>
        )}
        {!isMobile && (
          <nav id="mobileNav" title="mobile nav" className={styles.mainNav}>
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
                          goToSection(value, navItem.slug.current);
                        }}
                      >
                        {navItem.title}
                      </a>
                    </li>
                  );
                })}
            </Scrollspy>
          </nav>
        )}
      </div>
    </nav>
  );
};

export default Nav;
