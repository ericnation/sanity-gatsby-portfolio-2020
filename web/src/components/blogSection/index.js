import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import Fade from 'react-reveal/Fade';
import classNames from 'classnames';
import Img from 'gatsby-image';
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture,
} from '../../lib/helpers';
import BlockText from '../block-text';
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
            mainImage {
              alt
              asset {
                url
                assetId
                _id
                fluid(maxWidth: 400) {
                  base64
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                }
              }
              hotspot {
                height
                width
                x
                y
              }
              crop {
                top
                right
                left
                bottom
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

  const postNodes = allSanityPost.edges.length
    ? mapEdgesToNodes(allSanityPost)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : [];

  const recentPosts = postNodes.slice(0, 3);
  return (
    <section id="blog" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2>
            <span>Blog</span>
          </h2>
          <div className={styles.headerDesc}>
            <span>
              Some stories about web dev, travels, and other random things I feel like writing
              about.
            </span>
          </div>
        </div>
        <div
          className={classNames(styles.blogGrid, {
            [styles.col1]: recentPosts.length === 1,
            [styles.col2]: recentPosts.length === 2,
          })}
        >
          {recentPosts.map((post) => {
            return (
              <Fade bottom>
                <div className={styles.postItem} key={post.id}>
                  <Link to={`/blog/${post.slug.current}`} className={styles.postImage}>
                    {post.mainImage && (
                      <Img fluid={post.mainImage.asset.fluid} alt={post.mainImage.alt || ''} />
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
