import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import classNames from 'classnames';
import ReactPlayer from 'react-player';
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
  DotGroup,
} from 'pure-react-carousel';
import { GoPlay } from 'react-icons/go';
import { MdPauseCircleOutline } from 'react-icons/md';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import BlockContent from '../block-content';
import Container from '../container';
import { useBreakpoint } from '../../lib/helpers';

import styles from './project.module.css';

const Project = (props) => {
  const {
    youtubeId,
    videoPoster,
    _rawBackground,
    _rawProcess,
    carousel,
    categories,
    clientName,
    employerName,
    launchDate,
    projectName,
    projectTags,
    projectUrl,
    video,
    title,
    relatedProjects,
    pagination,
  } = props;
  const { slides } = carousel || [];
  const [videoState, setVideoState] = useState({});
  const [isTablet, setIsTablet] = useState(false);
  // Breakpoints
  const isMdMin = useBreakpoint('mdMin');

  useEffect(() => {
    if (document !== undefined) {
      setVideoState({
        playing: false,
        paused: true,
        videoDemo: document.getElementById('demoVideo'),
      });
    }
    if (!isMdMin) {
      setIsTablet(true);
    } else {
      setIsTablet(false);
    }
  }, []);

  const playVideo = () => {
    if (!videoState.videoDemo) return false;
    if (videoState.playing) {
      videoState.videoDemo.pause();
      setVideoState({
        playing: false,
        paused: true,
        videoDemo: videoState.videoDemo,
      });
    } else {
      videoState.videoDemo.play();
      setVideoState({
        playing: true,
        paused: false,
        videoDemo: videoState.videoDemo,
      });
    }
  };

  return (
    <div className={styles.wrap}>
      <Container>
        <div className={styles.projectTitle}>
          <h1>{title}</h1>
        </div>

        {(youtubeId || video) && (
          <div className={styles.videoWrap}>
            <div className={styles.browserWindow}>
              <div className={styles.browserHeader}>
                <ul className={styles.headerBtns}>
                  <li>
                    <span className={classNames(styles.browserHeaderCircle, styles.red)}></span>
                  </li>
                  <li>
                    <span className={classNames(styles.browserHeaderCircle, styles.yellow)}></span>
                  </li>
                  <li>
                    <span className={classNames(styles.browserHeaderCircle, styles.green)}></span>
                  </li>
                </ul>
                {videoState.playing && !youtubeId && (
                  <MdPauseCircleOutline className={styles.pauseBtn} onClick={playVideo} />
                )}
              </div>
              {videoState.paused && !youtubeId && (
                <GoPlay className={styles.playBtn} onClick={playVideo} />
              )}
              {youtubeId && (
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${youtubeId}`}
                  width="100%"
                  style={{ position: 'relative', top: '30px' }}
                />
              )}
              {video && video.asset.url && (
                <video
                  id="demoVideo"
                  className={styles.portfolioVideo}
                  title={title}
                  width="720"
                  height="auto"
                  preload="none"
                  poster={videoPoster.asset.url}
                >
                  <source src={video.asset.url} type={video.asset.mimeType} />
                </video>
              )}
            </div>
          </div>
        )}
        {slides && slides.length && (
          <div className={styles.carouselWrap}>
            <CarouselProvider
              isPlaying
              infinite
              naturalSlideWidth={1300}
              naturalSlideHeight={isTablet ? 900 : 700}
              totalSlides={slides.length}
            >
              <div className={styles.sliderWrap}>
                <Slider>
                  {slides.map((slide, i) => {
                    return (
                      <Slide index={i} key={`slide_${i}`}>
                        {slide.image && (
                          <img
                          
                            className={styles.slideImg}
                            src={slide.image.asset.url}
                            alt={slide.image.alt}
                          />
                        )}
                      </Slide>
                    );
                  })}
                </Slider>
                <ButtonBack className={styles.buttonBack}>
                  <FaChevronLeft className={styles.navArrow} />
                </ButtonBack>
                <ButtonNext className={styles.buttonNext}>
                  <FaChevronRight className={styles.navArrow} />
                </ButtonNext>
              </div>
              <DotGroup className={styles.dotGroup} />
            </CarouselProvider>
          </div>
        )}

        <div className={styles.grid}>
          <div className={styles.projectMeta}>
            <h3 className={styles.smallHeader}>
              <span>Project info</span>
            </h3>
            <div className={styles.projectInfo}>
              {clientName && (
                <span>
                  <small>Client:</small>
                  {clientName}
                </span>
              )}
              {employerName && (
                <span>
                  <small>Employer:</small>
                  {employerName}
                </span>
              )}
              {launchDate && (
                <span>
                  <small>Date:</small> {launchDate}
                </span>
              )}
              <br />
              <ul className={styles.tags}>
                {categories &&
                  categories.length > 0 &&
                  categories.map((category) => (
                    <li key={category.title}>
                      <a href="#">{category.title}</a>
                    </li>
                  ))}
              </ul>
            </div>
            <br />
            {projectUrl && (
              <a href={projectUrl} className={styles.btn} target="_blank">
                Launch Project
              </a>
            )}
            {relatedProjects && relatedProjects.length > 0 && isMdMin && (
              <div className={styles.relatedProjects}>
                <h4 className={styles.smallHeader}>
                  <span>Related Projects</span>
                </h4>
                <ul>
                  {relatedProjects.map((project) => (
                    <li key={`related_${project._id}`}>
                      {project.slug ? (
                        <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                      ) : (
                        <span>{project.title}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className={styles.metaContent}>
            <h2 className={styles.smallHeader}>
              <span>Background</span>
            </h2>
            {_rawBackground && (
              <div className={styles.blockContent}>
                <BlockContent blocks={_rawBackground || []} />
              </div>
            )}
            <h2 className={styles.smallHeader}>
              <span>Process and Solution</span>
            </h2>
            {_rawProcess && (
              <div className={styles.blockContent}>
                <BlockContent blocks={_rawProcess || []} />
              </div>
            )}
            {pagination && pagination.length && (
              <div className={styles.btnWrap}>
                {pagination.map((page, index) => {
                  if (page) {
                    return (
                      <Link
                        className={styles.linkBtn}
                        to={`/project/${page?.slug.current}`}
                        style={{ marginRight: 0 === index ? '25px' : 0 }}
                      >
                        {index === 0 && page && (
                          <>
                            <FaLongArrowAltLeft
                              style={{ marginRight: '10px' }}
                              className={styles.pageIcon}
                            />
                            <span className={styles.btnText}>Previous</span>
                          </>
                        )}
                        {index === 1 && page && (
                          <>
                            <span className={styles.btnText}>Next</span>
                            <FaLongArrowAltRight
                              style={{ marginLeft: '10px' }}
                              className={styles.pageIcon}
                            />
                          </>
                        )}
                      </Link>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
            )}
          </div>
          {relatedProjects && relatedProjects.length > 0 && !isMdMin && (
            <div className={styles.relatedProjects}>
              <h5 className={styles.smallHeader}>
                <span>Related Projects</span>
              </h5>
              <ul>
                {relatedProjects.map((project) => (
                  <li key={`related_${project._id}`}>
                    {project.slug ? (
                      <Link to={`/project/${project.slug.current}`}>{project.title}</Link>
                    ) : (
                      <span>{project.title}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Project;
