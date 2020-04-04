import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Link } from 'gatsby';
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

  const {
    navItems,
  } = sanityNavMenu;

  return (
    <div id="navbar" className={styles.navBar}>
      <div className={styles.container}>
        <div className={styles.navLogo}><Link to="/">ERIC NATION</Link></div>
        <nav className={styles.mainNav}>
          <ul className={styles.navList}>
            {(navItems && navItems.length) && (
              navItems.map((navItem, index) => {
                if (navItem.title === 'Home' ||
                    navItem.title === 'Blog' ||
                    navItem.title === 'Resume'
                  ) {
                  return (
                    <li className={styles.navListItem} key={navItem.slug.current}>
                      <Link
                        to={navItem.slug.current || '/'}
                        id={`navItem_${index}`}
                        activeClassName={styles.active}
                        >
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
                        console.log(value.target.id);
                        setIsActive(value.target.id === `navItem_${index}`);
                      }}
                      >
                      {navItem.title}
                    </a>
                  </li>
                );
              })
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
