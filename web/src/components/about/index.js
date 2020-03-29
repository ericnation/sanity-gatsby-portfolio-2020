import React from 'react';
import classNames from 'classnames';
import { cn, buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';
import BlockText from '../block-text';

import styles from './about.module.css';

const About = (props) => {
  return (
    <section id='aboutus'>
      <section className={classNames('section', styles.aboutText)}>
        <div className={classNames('container', styles.firstSection)}>
          <div className='section-header'>
            <h1>
              <span>About Me</span>
            </h1>
            <div className='header-desc'>
              <span>
                Software Developer &middot;
                World Traveler &middot; Motorcycle Rider &middot; Skateboarder
              </span>
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.col}>
              <img
                src='img/profile_2020.jpg'
                alt='Eric Nation - Profile'
                className={styles.imgCircle}
              />
            </div>
            <div className={styles.col}>
              <p>
                <strong>HELLO</strong>, my name is Eric Nation, and I’m a Software Developer originally based out of Phoenix, Arizona.
              For the past 3.5 years I've been working remotely and I have mastered being apart of remote teams. I
              have 8 years of professional web development experience specializing in UI architecture and Javascript technologies.
              </p>
              <p>I have in depth experience with Angular, React, Wordpress, and building component libraries. I also have experience
                and am well versed in full stack Javascript technologies such as Nodejs, Express, and Firebase. I have a passion for
                designing and developing web applications and I'm always hungry to learn more, improve, and advance my skill set.
              </p>
              <p>Other than designing and developing web applications, I enjoy skateboarding, fitness, surfing, riding motorcycles,
                traveling, the outdoors, music, and a bunch of other awesome stuff!
              </p>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default About;
