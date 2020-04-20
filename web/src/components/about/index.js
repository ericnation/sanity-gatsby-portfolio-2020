import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import classNames from 'classnames';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';
import BlockText from '../block-text';

import styles from './about.module.css';

const About = () => {
  const { sanityAbout, allSanityCountries } = useStaticQuery(graphql`
    query AboutSectionQuery {
      allSanityCountries {
        totalCount
      }
      sanityAbout {
        aboutSectionImage {
          alt
          asset {
            _id
            url
            assetId
          }
        }
        aboutSectionImageColor {
          alt

          asset {
            _id
            url
            assetId
          }
        }
        hobbies
        profile {
          _rawBio
          name
          image {
            alt
            asset {
              assetId
              _id
              url
              fluid(maxWidth: 630) {
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
        }
        id
        title
      }
    }
  `);

  const {
    aboutSectionImage,
    aboutSectionImageColor,
    title,
    hobbies,
    profile: { _rawBio, image },
  } = sanityAbout;

  const { totalCount } = allSanityCountries;

  const colorImage = imageUrlFor(buildImageObj(aboutSectionImageColor))
    .height(465)
    .width(2000)
    .url();
  return (
    <section id="about">
      <section
        className={classNames(styles.section, styles.aboutText)}
        style={{
          backgroundImage: `url(${colorImage})`,
        }}
      >
        <div className={classNames(styles.container, styles.firstSection)}>
          <div className={styles.sectionHeader}>
            <h2>
              <span>{title}</span>
            </h2>
            {hobbies && (
              <div className={styles.headerDesc}>
                <span>{hobbies.length && hobbies.map((hobby) => `${hobby} `)}</span>
              </div>
            )}
          </div>
          <div className={styles.gridRow}>
            <div className={styles.col1}>
              {image && image.asset && (
                <Img fluid={image.asset.fluid} alt={image.alt} className={styles.profilePic} />
              )}
            </div>
            <div className={styles.col2}>
              {_rawBio && <BlockText blocks={_rawBio} />}
              <div className={styles.totalCountries}>
                <div>Countries traveled</div>
                <span className={styles.count}>{totalCount}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
