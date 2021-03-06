import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import Fade from 'react-reveal/Fade';
import Slide from 'react-reveal/Slide';
import { DiCode, DiWordpress, DiReact, DiJavascript1 } from 'react-icons/di';
import { MdComputer, MdCheck } from 'react-icons/md';

import styles from './services.module.css';

const Services = () => {
  const { sanityServices } = useStaticQuery(graphql`
    query ServicesSectionQuery {
      sanityServices {
        toolsHeader
        title
        subHeader
        skillsHeader
        skills {
          skills
          strengthLevel
        }
        services {
          deviconName
          serviceSpecialties
          title
        }
        id
        tools {
          tools
        }
      }
    }
  `);

  const { toolsHeader, title, subHeader, skillsHeader, skills, services, tools } = sanityServices;

  return (
    <section id="services">
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            {title && (
              <h2>
                <span>{title}</span>
              </h2>
            )}
            {subHeader && (
              <div className={styles.headerDesc}>
                <span>{subHeader}</span>
              </div>
            )}
          </header>
          <div className={classNames(styles.gridRow3, styles.bottomGap)}>
            {services &&
              services.length &&
              services.map((service) => {
                return (
                  <Fade bottom key={service.title}>
                    <div className={styles.col4}>
                      <div className={styles.service}>
                        <div className={styles.serviceIcon}>
                          {'DiCode' === service.deviconName && <DiCode />}
                          {'DiWordpress' === service.deviconName && <DiWordpress />}
                          {'MdComputer' === service.deviconName && <MdComputer />}
                          {'DiReact' === service.deviconName && <DiReact />}
                          {'DiJavascript1' === service.deviconName && <DiJavascript1 />}
                        </div>
                        <div className={styles.serviceHeader}>{service.title}</div>
                        <div className={styles.serviceDesc}>
                          {service.serviceSpecialties.map((specialty, index) => (
                            <span key={specialty}>{(index ? ', ' : '') + specialty}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Fade>
                );
              })}
          </div>
          <div className={styles.gridRow2}>
            <div className={styles.col6}>
              <h3 className={styles.smallHeader}>
                <span>{skillsHeader}</span>
              </h3>
              {skills &&
                skills.length &&
                skills.map((skill, i) => {
                  return (
                    <div className={styles.progress} key={`skill_${i}`}>
                      <progress
                        className={styles.progressBar}
                        min="0"
                        max="100"
                        value={skill.strengthLevel}
                      />
                      <span className={styles.progressText}>
                        {skill.skills &&
                          skill.skills.length &&
                          skill.skills.map((skillb, index) => {
                            return <span key={skillb}>{(index ? ', ' : '') + skillb}</span>;
                          })}
                        &nbsp;- {skill.strengthLevel}%
                      </span>
                    </div>
                  );
                })}
            </div>
            <div className={styles.col6}>
              <h3 className={styles.smallHeader}>
                <span>{toolsHeader}</span>
              </h3>
              <ul className="list-unstyled">
                {tools &&
                  tools.length &&
                  tools.map((tool) => {
                    return (
                      <li key={tools.tools}>
                        <MdCheck className={styles.checkicon} /> {tool.tools}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Services;
