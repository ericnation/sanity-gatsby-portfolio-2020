import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import YoutubeBackground from 'react-youtube-background';
import Logo from '../logo';

import styles from './hero.module.css';

const Hero = () => {
  const { sanitySiteSettings, sanityCarousel } = useStaticQuery(graphql`
    query HeaderQuery {
      sanitySiteSettings {
        headerVideo
      }
      sanityCarousel {
        specialties
        slides {
          bigText
          smallItalicText
        }
      }
    }
  `);

  const {
    specialties,
    slides,
  } = sanityCarousel;

  const {
    headerVideo,
  } = sanitySiteSettings;

  return (
    <YoutubeBackground
      videoId={headerVideo}
      aspectRatio={'16:15'}
      className={styles.fullScreen}
    >
      <div className={styles.homeContent}>
        <div className={styles.logoHome}>
          <Logo color="black" />
        </div>

        <div className={styles.homeText}>
          <ul className="slides">
            <CarouselProvider
              naturalSlideWidth={100}
              naturalSlideHeight={125}
              totalSlides={slides.length}
            >
              <Slider>
                {slides.map((slide, i) => {
                  return (
                    <Slide index={i}>
                      <span className={styles.textHeader}>{slide.smallItalicText}</span>
                      <span className={styles.bigText}>{slide.bigText}</span>
                    </Slide>
                  )
                })}
              </Slider>
            </CarouselProvider>
          </ul>

          <div className={styles.smallText}>
            {specialties.map((specialty, index) => (index ? ' - ' : '') + specialty)}
          </div>
        </div>
        <div className={styles.homeMore}>
          <a href="#about" className={styles.btn}>More</a>
        </div>
      </div>
    </YoutubeBackground>
  );
};

export default Hero;
