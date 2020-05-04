import React, { useState } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import Slide from 'react-reveal/Slide';
import classNames from 'classnames';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
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
  const [viewPortEntered, setViewPortEntered] = useState(false);

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
                <Slide left>
                  <Img fluid={image.asset.fluid} alt={image.alt} className={styles.profilePic} />
                </Slide>
              )}
            </div>
            <div className={styles.col2}>
              <Slide right>
                {_rawBio && <BlockText blocks={_rawBio} />}
                <div className={styles.totalCountries}>
                  <div>Countries traveled</div>
                  <VisibilitySensor
                    delayedCall
                    active={!viewPortEntered}
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setViewPortEntered(true);
                      }
                    }}
                  >
                    <CountUp
                      decimals={1}
                      start={viewPortEntered ? null : 0}
                      end={totalCount}
                      duration={3}
                      formattingFn={(num) => Math.round(num)}
                    >
                      {({ countUpRef }) => {
                        return <span className={styles.count} ref={countUpRef} />;
                      }}
                    </CountUp>
                  </VisibilitySensor>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
