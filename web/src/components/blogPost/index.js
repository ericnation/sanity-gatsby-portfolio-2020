import { format, distanceInWords, differenceInDays } from 'date-fns';
import React, { useState, useEffect } from 'react';
import Img from 'gatsby-image';
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin } from 'react-icons/fa';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';
import PortableText from '../portableText';

import styles from './blogPost.module.css';

const BlogPost = (props) => {
  const { _rawBody, _rawExcerpt, author, categories, title, mainImage, publishedAt } = props;
  const [currentUrl, setCurrentUrl] = useState('');
  useEffect(() => {
    if (window && typeof window !== `undefined`) {
      setCurrentUrl(encodeURIComponent(window.location.href));
    }
  });
  const triggerSocialWindow = (url) => {
    const left = (screen.width - 570) / 2;
    const top = (screen.height - 570) / 2;
    const params = `menubar=no,toolbar=no,status=no,width=570,height=570,top=${top},left=${left}`;
    if (window) {
      window.open(url, 'NewWindow', params);
    }
  };

  const shareToFaceBook = () => {
    const url = `https://www.facebook.com/sharer.php?u=${currentUrl}`;
    triggerSocialWindow(url);
  };

  const shareToTwitter = () => {
    const excerpt = _rawExcerpt[0].children[0].text || title;
    const url = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${excerpt}`;
    triggerSocialWindow(url);
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`;
    triggerSocialWindow(url);
  };

  const shareToWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${currentUrl}`;
    triggerSocialWindow(url);
  };

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
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.mainContent}>
            <div className={styles.excerpt}>
              {_rawExcerpt && <PortableText blocks={_rawExcerpt} />}
            </div>
            <div className={styles.postContent}>
              {_rawBody && <PortableText blocks={_rawBody} />}
            </div>
            <div className={styles.metaWrap}>
              {author && author.name && (
                <div className={styles.autorWrap}>
                  {author.image.asset && (
                    <Img fixed={author.image.asset.fixed} alt={author.image.asset.alt} />
                  )}

                  <span className={styles.authorNameWrap}>
                    <span className={styles.written}>written by</span>
                    <span className={styles.name}>{author.name}</span>
                    <span className={styles.publishedDate}>
                      {format(new Date(publishedAt), 'MMMM Do, YYYY')}
                    </span>
                  </span>
                </div>
              )}
              <div className={styles.sharingWrap}>
                <span className={styles.shareTitle}>Share</span>
                <ul className={styles.socialList}>
                  <li onClick={shareToFaceBook}>
                    <FaFacebook className={styles.facebook} />
                  </li>
                  <li onClick={shareToTwitter}>
                    <FaTwitter className={styles.twitter} />
                  </li>
                  <li onClick={shareToWhatsApp}>
                    <FaWhatsapp className={styles.whatsapp} />
                  </li>
                  <li onClick={shareToLinkedIn}>
                    <FaLinkedin className={styles.linkedin} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <aside className={styles.metaContent}>
            {categories && (
              <div className={styles.categories}>
                <h2 className={styles.smallHeader}>
                  <span>Categories</span>
                </h2>
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
    </div>
  );
};

export default BlogPost;
