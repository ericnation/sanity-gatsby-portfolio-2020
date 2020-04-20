import React from 'react';
import { Link } from 'gatsby';
import BlockContent from '../block-content';
import Container from '../container';

import styles from './project.module.css';

const Project = (props) => {
  const {
    youtubeId,
    videoPoster,
    _rawBackground,
    _rawProcess,
    categories,
    clientName,
    employerName,
    launchDate,
    projectName,
    projectTags,
    projectUrl,
    video,
    title,
    relatedProjects,
  } = props;
  return (
    <article className={styles.root}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <h1 className={styles.title}>{title}</h1>
            {_rawBackground && <BlockContent blocks={_rawBackground || []} />}
            {_rawProcess && <BlockContent blocks={_rawProcess || []} />}
          </div>
          <aside className={styles.metaContent}>
            {categories && categories.length > 0 && (
              <div className={styles.categories}>
                <h3 className={styles.categoriesHeadline}>Categories</h3>
                <ul>
                  {categories.map((category) => (
                    <li key={category.id}>{category.title}</li>
                  ))}
                </ul>
              </div>
            )}
            {relatedProjects && relatedProjects.length > 0 && (
              <div className={styles.relatedProjects}>
                <h3 className={styles.relatedProjectsHeadline}>Related projects</h3>
                <ul>
                  {relatedProjects.map((project) => (
                    <li key={`related_${project._id}`}>
                      {project.slug ? (
                        <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}

export default Project;
