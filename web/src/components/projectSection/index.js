import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../../lib/helpers';
import styles from './project-section.module.css';

const ProjectSection = () => {
  // Get data for all projects.
  const { allSanityProject, allSanityCategory } = useStaticQuery(graphql`
    query ProjectQuery {
      allSanityCategory(sort: { fields: title, order: ASC }) {
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
            youtubeId
            videoPoster {
              alt
              asset {
                _id
                url
                title
                assetId
                fluid(maxWidth: 720) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
            }
            _rawBackground
            _rawProcess
            categories {
              title
            }
            clientName
            employerName
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
            video {
              asset {
                url
                title
                mimeType
                assetId
              }
            }
            slug {
              current
            }
            relatedProjects {
              slug {
                current
              }
              title
            }
          }
        }
      }
    }
  `);
  let categories = allSanityCategory.edges.length ? mapEdgesToNodes(allSanityCategory) : [];
  categories.unshift({ title: 'All' }, { title: 'Recent' });
  categories.forEach((category) => {
    if (category.title === 'Recent') {
      return (category.isActive = true);
    }
    return (category.isActive = false);
  });
  const projectNodes = allSanityProject.edges.length
    ? mapEdgesToNodes(allSanityProject).filter(filterOutDocsWithoutSlugs)
    : [];

  const filterProjectsByCategory = (category) => {
    console.log(category);
    categories.forEach((cat) => {
      if (cat.title === category.title) {
        return (cat.isActive = true);
      }
      cat.isActive = false;
    });
    console.log(categories);
    const filteredNodes = projectNodes.filter((project) =>
      project.categories.includes(category, 0),
    );
    console.log(filteredNodes);
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
          {categories &&
            categories.map((category, i) => {
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

      <div className={styles.portfolioGrid}>
        {projectNodes &&
          projectNodes.map((project, i) => {
            return (
              <div className={styles.portfolioItem} key={`${project.slug.current}_${i}`}>
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
            );
          })}
      </div>
    </section>
  );
};

export default ProjectSection;
