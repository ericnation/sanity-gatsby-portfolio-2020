import { Link } from 'gatsby';
import React from 'react';
import { cn, buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import BlockText from '../block-text';

import styles from './project-preview.module.css';
import { responsiveTitle3 } from './typography.module.css';

function ProjectPreview(props) {
  const {
    title,
    slug: { current },
    mainImage,
    mainImage: {
      asset,
      alt,
    },
    _rawExcerpt,
  } = props;
  return (
    <Link className={styles.root} to={`/project/${current}`}>
      <div className={styles.leadMediaThumb}>
        {mainImage && asset && (
          <img
            src={imageUrlFor(buildImageObj(mainImage))
              .width(600)
              .height(Math.floor((9 / 16) * 600))
              .url()}
            alt={alt}
          />
        )}
      </div>
      <h3 className={cn(responsiveTitle3, styles.title)}>{title}</h3>
      {_rawExcerpt && (
        <div className={styles.excerpt}>
          <BlockText blocks={_rawExcerpt} />
        </div>
      )}
    </Link>
  );
}

export default ProjectPreview;
