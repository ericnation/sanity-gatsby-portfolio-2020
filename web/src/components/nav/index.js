import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
import Scrollspy from 'react-scrollspy';
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
  let globalWindow = null;
  useEffect(() => {
    globalWindow = window;
  });

  const goToSection = (value, section) => {
    value.preventDefault();
    const sectionId = document.getElementById(section);
    const sectionTop = sectionId.offsetTop;
    globalWindow.scrollTo({ top: sectionTop, behavior: 'smooth' });
  };

  const { navItems } = sanityNavMenu;

  const sectionIds = [];
  navItems.forEach((item) => sectionIds.push(item.slug.current));

  return (
    <div id="navbar" className={styles.navBar}>
      <div className={styles.container}>
        <div className={styles.navLogo}>
          <Link to="/">ERIC NATION</Link>
        </div>
        <nav className={styles.mainNav}>
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
                        // setIsActive(value.target.id === `navItem_${index}`);
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
      </div>
    </div>
  );
};

export default Nav;
