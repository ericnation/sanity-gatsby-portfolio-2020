import React, { useState, useEffect } from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import { getFluidGatsbyImage, getFixedGatsbyImage } from 'gatsby-source-sanity';
import Fade from 'react-reveal/Fade';
import classNames from 'classnames';
import Img from 'gatsby-image';
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../../lib/helpers';
import clientConfig from '../../../client-config';
import BlockText from '../block-text';
import { useBreakpoint } from '../../lib/helpers';
import styles from './blogSection.module.css';

const BlogSection = (props) => {
  const { allSanityPost } = useStaticQuery(graphql`
    query BlogPostsQuery {
      allSanityPost(filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
            thumbnailImage {
              alt
              asset {
                url
                _rev
                assetId
                _id
                fixed(width: 400) {
                  ...GatsbySanityImageFixed_withWebp
                }
                fluid(maxWidth: 700, maxHeight: 600) {
                  ...GatsbySanityImageFluid_withWebp
                }
              }
            }
            categories {
              title
              id
            }
            _rawExcerpt(resolveReferences: { maxDepth: 10 })
            title
          }
        }
      }
    }
  `);

  const [isMobile, setIsMobile] = useState(false);
  // Breakpoints
  const isSmMin = useBreakpoint('smMin');

  useEffect(() => {
    if (!isSmMin) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, []);

  const postNodes = allSanityPost.edges.length
    ? mapEdgesToNodes(allSanityPost)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const recentPosts = postNodes.slice(0, 3);
  return (
    <section id="blog" className={styles.section}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <h2>
            <span>Blog</span>
          </h2>
          <div className={styles.headerDesc}>
            <span>
              Some stories about web dev, travels, and other random things I feel like writing
              about.
            </span>
          </div>
        </header>
        <div
          className={classNames(styles.blogGrid, {
            [styles.col1]: recentPosts.length === 1,
            [styles.col2]: recentPosts.length === 2,
          })}
        >
          {recentPosts.map((post) => {
            return (
              <Fade bottom key={post.id}>
                <div className={styles.postItem}>
                  <Link to={`/blog/${post.slug.current}`} className={styles.postImage}>
                    {post.thumbnailImage && (
                      <>
                        {isMobile && (
                          <Img
                            fluid={post.thumbnailImage.asset.fluid}
                            alt={post.thumbnailImage.alt || ''}
                          />
                        )}
                        {!isMobile && (
                          <Img
                            fixed={post.thumbnailImage.asset.fixed}
                            alt={post.thumbnailImage.alt || ''}
                          />
                        )}
                      </>
                    )}
                  </Link>
                  <Link className={styles.postTitle} to={`/blog/${post.slug.current}`}>
                    {post.title}
                  </Link>
                  <div className={styles.postExcerpt}>
                    {post._rawExcerpt && <BlockText blocks={post._rawExcerpt} />}
                  </div>
                </div>
              </Fade>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
