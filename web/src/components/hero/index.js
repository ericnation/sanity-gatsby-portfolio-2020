import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
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

  const { specialties, slides } = sanityCarousel;

  const { headerVideo } = sanitySiteSettings;

  let globalWindow = null;
  useEffect(() => {
    globalWindow = window;
  });

  const scrollDown = () => {
    globalWindow.scrollTo({ top: globalWindow.innerHeight, behavior: 'smooth' });
  };

  return (
    <YoutubeBackground videoId={headerVideo} className={styles.fullScreen}>
      <div className={styles.homeContent}>
        <div className={styles.logoHome}>
          <Logo color="black" />
        </div>

        <div className={styles.homeText}>
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
          <div className={styles.smallText}>
            {specialties.map((specialty, index) => (index ? ' - ' : '') + specialty)}
          </div>
        </div>
        <div className={styles.homeMore}>
          <button type="button" onClick={() => scrollDown()} className={styles.btn}>
            More
          </button>
        </div>
      </div>
    </YoutubeBackground>
  );
};

export default Hero;
