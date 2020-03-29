/* eslint-disable no-unused-vars */
import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';
import BlockText from '../block-text';
import GraphQLErrorList from '../graphql-error-list';

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
    title,
    hobbies,
    profile: { _rawBio, image },
  } = sanityAbout;

  return (
    <section id='aboutus'>
      <section className={classNames('section', styles.aboutText)}>
        <div className={classNames('container', styles.firstSection)}>
          <div className={styles.sectionHeader}>
            <h1>
              <span>{title}</span>
            </h1>
            {(hobbies && hobbies.length) && (
              <div className={styles.headerDesc}>
                <span>
                  {hobbies.map((hobby) => `${hobby} `)}
                </span>
              </div>
            )}
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              {image && image.asset && (
                <img
                  src={imageUrlFor(buildImageObj(image))
                    .url()}
                  alt={image.alt}
                  className={styles.profilePic}
                />
              )}
            </div>
            <div className={styles.col}>
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
