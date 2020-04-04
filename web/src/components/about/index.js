import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';
import BlockText from '../block-text';

import styles from './about.module.css';

const About = () => {
  const { sanityAbout } = useStaticQuery(graphql`
    query AboutSectionQuery {
      sanityAbout {
        aboutSectionImage {
          alt
          caption
          hotspot {
            height
            width
            x
            y
          }
          _key
          _type
          asset {
            id
            _id
            url
            assetId
            _type
          }
          crop {
            bottom
            left
            right
            top
          }
        }
        aboutSectionImageColor {
          alt
          caption
          hotspot {
            height
            width
            x
            y
          }
          _key
          _type
          asset {
            id
            _id
            url
            assetId
            _type
          }
          crop {
            bottom
            left
            right
            top
          }
        }
        hobbies
        profile {
          _rawBio
          name
          image {
            _key
            _type
            caption
            alt
            hotspot {
              height
              width
              x
              y
            }
            crop {
              bottom
              left
              right
              top
            }
            asset {
              assetId
              _id
              url
              id
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

  const colorImage = imageUrlFor(buildImageObj(aboutSectionImageColor)).height(465).width(2000).url();
  return (
    <section id='about'>
      <section
        className={classNames(styles.section, styles.aboutText)}
        style={{
          backgroundImage: `url(${colorImage})`,
        }}
      >
        <div className={classNames(styles.container, styles.firstSection)}>
          <div className={styles.sectionHeader}>
            <h1>
              <span>{title}</span>
            </h1>
            {hobbies && (
              <div className={styles.headerDesc}>
                <span>
                  {hobbies.length && hobbies.map((hobby) => `${hobby} `)}
                </span>
              </div>
            )}
          </div>
          <div className={styles.gridRow}>
            <div className={styles.col1}>
              {image && image.asset && (
                <img
                  src={imageUrlFor(buildImageObj(image))
                    .url()}
                  alt={image.alt}
                  className={styles.profilePic}
                />
              )}
            </div>
            <div className={styles.col2}>
              {_rawBio && (
                <BlockText blocks={_rawBio} />
              )}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
