import React, { useState, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Zoom from 'react-reveal/Zoom';
import Img from 'gatsby-image';
import classNames from 'classnames';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../../lib/helpers';
import styles from './project-section.module.css';

const ProjectSection = () => {
  // Get data for all projects.
  const { allSanityProject, allSanityCategory } = useStaticQuery(graphql`
    query ProjectQuery {
      allSanityCategory(sort: { fields: title, order: ASC }, filter: { useFilter: { in: true } }) {
        edges {
          node {
            title
          }
        }
      }
      allSanityProject(sort: { fields: [launchDate], order: DESC }) {
        totalCount
        edges {
          node {
            categories {
              title
              useFilter
            }
            launchDate(formatString: "MMMM YYYY")
            projectName
            projectTags
            projectThumbnail {
              alt
              asset {
                assetId
                _id
                fluid(maxWidth: 500) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
                url
              }
            }
            projectUrl
            title
            slug {
              current
            }
          }
        }
      }
    }
  `);
  let categories = allSanityCategory.edges.length ? mapEdgesToNodes(allSanityCategory) : [];
  categories.unshift({ title: 'All' }, { title: 'Recent' });
  categories.forEach((category) => {
    // Set the state and make Recent active by default.
    if (category.title === 'Recent') {
      return (category.isActive = true);
    }
    return (category.isActive = false);
  });
  const projectNodes = allSanityProject.edges.length
    ? mapEdgesToNodes(allSanityProject).filter(filterOutDocsWithoutSlugs)
    : [];
  const [isClient, setClient] = useState(false);
  const [categoriesCopy, setCatagories] = useState([]);
  const [projectsCopy, setProjectsCopy] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const key = isClient ? 'client' : 'server';
  // Make deep copy of projectNodes.
  const projectNodesCopy = JSON.parse(JSON.stringify(projectNodes));
  const catCopy = JSON.parse(JSON.stringify(categories));
  // Projects are already sorted from newest to oldest.
  // Grab the first 5 for most recent.
  let recentProjects = projectNodesCopy.slice(0, 5);
  useEffect(() => {
    setClient(true);
    setCatagories(catCopy);
    setProjectsCopy(projectNodesCopy);
    setFilteredProjects(recentProjects);
  }, []);
  if (!isClient) return null;

  const filterProjectsByCategory = (category) => {
    categoriesCopy.forEach((cat) => {
      cat.isActive = false;
      if (cat.title == category.title) {
        return (cat.isActive = true);
      }
    });
    setCatagories([...categoriesCopy]);
    if (category.title === 'Recent') {
      return setFilteredProjects(recentProjects);
    }
    if (category.title === 'All') {
      return setFilteredProjects(projectsCopy);
    }
    const filtered = projectsCopy.filter((project) =>
      project.categories.some((cat) => cat.title === category.title),
    );
    return setFilteredProjects(filtered);
  };

  return (
    <section id="work" className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>
          <span>Work</span>
        </h2>
        <div className={styles.headerDesc}>
          <span>Projects</span>
        </div>
      </div>
      <div className={styles.portfolioFilter}>
        <ul className={styles.filters}>
          <li>Filter projects:</li>
          {categoriesCopy &&
            categoriesCopy.length &&
            categoriesCopy.map((category, i) => {
              return (
                <li key={`${category}_${i}`}>
                  <button
                    type="button"
                    className={classNames(styles.textBtn, {
                      [styles.active]: category.isActive,
                    })}
                    onClick={() => filterProjectsByCategory(category)}
                  >
                    {category.title}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>

      <div className={styles.portfolioGrid} key={key}>
        {filteredProjects &&
          filteredProjects.map((project, i) => {
            return (
              <Zoom key={project.title}>
                <div className={styles.portfolioItem}>
                  <Link to={`/project/${project.slug.current}`}>
                    <div className={styles.overlay}>
                      <h4>{project.title}</h4>
                      <span className={styles.categoryText}>
                        {project.categories.map(
                          (category, index) => (index ? ', ' : '') + category.title,
                        )}
                      </span>
                    </div>
                    {project.projectThumbnail && project.projectThumbnail.asset && (
                      <Img
                        fluid={project.projectThumbnail.asset.fluid}
                        alt={project.projectThumbnail.alt}
                        className={styles.previewImg}
                      />
                    )}
                  </Link>
                </div>
              </Zoom>
            );
          })}
      </div>
    </section>
  );
};

export default ProjectSection;
