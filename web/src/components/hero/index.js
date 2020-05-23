import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import Logo from '../logo';
import styles from './hero.module.css';
import { useBreakpoint, buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';

const Hero = () => {
  const { sanitySiteSettings, sanityCarousel } = useStaticQuery(graphql`
    query HeaderQuery {
      sanitySiteSettings {
        heroVideo {
          asset {
            url
            assetId
            _id
            mimeType
          }
        }
        heroImage {
          alt
          asset {
            url
            fluid {
              base64
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              sizes
            }
            _id
            _rev
            assetId
          }
        }
      }
      sanityCarousel(title: { eq: "Header Carousel" }) {
        specialties
        slides {
          bigText
          smallItalicText
        }
      }
    }
  `);
  const [isMobile, setIsMobile] = useState(false);
  const issmMin = useBreakpoint('smMin');

  const { heroVideo, heroImage } = sanitySiteSettings;
  const { specialties, slides } = sanityCarousel;
  const heroImageUrl = imageUrlFor(buildImageObj(heroImage)).url();

  let globalWindow = null;
  useEffect(() => {
    const video = document.getElementById('heroVideoId');
    if (video) {
      video.play();
    }
    if (typeof window !== `undefined`) {
      globalWindow = window;
    }

    if (!issmMin) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  });

  const scrollDown = () => {
    globalWindow.scrollTo({ top: globalWindow.innerHeight, behavior: 'smooth' });
  };

  return (
    <header className={styles.fullScreen} id="home">
      {heroVideo && (
        <video autoPlay muted loop id="heroVideoId" className={styles.videoWrap}>
          <source src={heroVideo.asset.url} type={heroVideo.asset.mimeType} />
        </video>
      )}
      {heroImage && heroImage.asset && (
        <div className={styles.imgWrap} style={{ backgroundImage: `url(${heroImageUrl})` }} />
      )}
      <div className={styles.homeContent}>
        <div className={styles.logoHome}>
          <Logo color={isMobile ? 'black' : 'white'} width={90} />
        </div>

        <div className={styles.homeText}>
          {slides && slides.length && (
            <CarouselProvider isPlaying infinite isIntrinsicHeight totalSlides={slides.length}>
              <Slider>
                {slides.map((slide, i) => {
                  return (
                    <Slide index={i} key={`slide_${i}`}>
                      <span className={styles.textHeader}>{slide.smallItalicText}</span>
                      <span className={styles.bigText}>{slide.bigText}</span>
                    </Slide>
                  );
                })}
              </Slider>
            </CarouselProvider>
          )}
          <h1 className={styles.screenReaderText}>
            Portfolio and Blog of Eric Nation, Software Developer
          </h1>
          {specialties && specialties.length && (
            <div className={styles.smallText}>
              {specialties.map((specialty, index) => (index ? ' - ' : '') + specialty)}
            </div>
          )}
        </div>
        <div className={styles.homeMore}>
          <button type="button" onClick={() => scrollDown()} className={styles.btn}>
            More
          </button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
