import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';
import PortableText from '../portableText';

import styles from './blogPost.module.css';

const BlogPost = (props) => {
  const { _rawBody, _rawExcerpt, author, categories, title, mainImage, publishedAt } = props;
  const featuredImg = imageUrlFor(buildImageObj(mainImage)).url();
  return (
    <div className={styles.wrap}>
      {mainImage && mainImage.asset && (
        <div className={styles.hero} style={{ backgroundImage: `url(${featuredImg})` }}>
          <div className={styles.heroContent}>
            <h1 className={styles.title}>{title}</h1>
            <br />
            {publishedAt && (
              <div className={styles.publishedAt}>
                {differenceInDays(new Date(publishedAt), new Date()) > 3
                  ? distanceInWords(new Date(publishedAt), new Date())
                  : format(new Date(publishedAt), 'MMMM Do, YYYY')}
              </div>
            )}
          </div>
        </div>
      )}
      <div className={styles.grid}>
        <div className={styles.mainContent}>
          <div className={styles.excerpt}>
            {_rawExcerpt && <PortableText blocks={_rawExcerpt} />}
          </div>

          {_rawBody && <PortableText blocks={_rawBody} />}
        </div>
        <aside className={styles.metaContent}>
          {categories && (
            <div className={styles.categories}>
              <h3 className={styles.categoriesHeadline}>Categories</h3>
              <ul>
                {categories.map((category) => (
                  <li key={category._id}>{category.title}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BlogPost;
