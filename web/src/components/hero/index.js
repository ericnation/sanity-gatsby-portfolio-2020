import React, { useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import Logo from '../logo';
import styles from './hero.module.css';

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

  const { heroVideo } = sanitySiteSettings;
  const { specialties, slides } = sanityCarousel;

  let globalWindow = null;
  useEffect(() => {
    const video = document.getElementById('heroVideoId');
    if (video) {
      video.play();
    }
    if (typeof window !== `undefined`) {
      globalWindow = window;
    }
  });

  const scrollDown = () => {
    globalWindow.scrollTo({ top: globalWindow.innerHeight, behavior: 'smooth' });
  };

  return (
    <div className={styles.fullScreen} id="home">
      {heroVideo && (
        <video autoPlay muted loop id="heroVideoId" className={styles.videoWrap}>
          <source src={heroVideo.asset.url} type={heroVideo.asset.mimeType} />
        </video>
      )}
      <div className={styles.homeContent}>
        <div className={styles.logoHome}>
          <Logo color="white" />
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
    </div>
  );
};

export default Hero;
