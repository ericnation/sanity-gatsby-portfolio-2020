import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import { DiCode, DiWordpress, DiReact, DiJavascript1 } from "react-icons/di";
import { MdComputer, MdCheck } from "react-icons/md";

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

  const {
    toolsHeader,
    title,
    subHeader,
    skillsHeader,
    skills,
    services,
    tools,
  } = sanityServices;

  return (
    <section id="services">
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h1>
              <span>{title}</span>
            </h1>
            <div className={styles.headerDesc}>
              <span>{subHeader}</span>
            </div>
          </div>
          <div className={classNames(styles.gridRow3, styles.bottomGap)}>
            {services.map((service) => {
              return (
                <div className={styles.col4}>
                  <div className={styles.service}>
                    <div className={styles.serviceIcon}>
                      {'DiCode' === service.deviconName && <DiCode />}
                      {'DiWordpress' === service.deviconName && <DiWordpress />}
                      {'MdComputer' === service.deviconName && <MdComputer />}
                      {'DiReact' === service.deviconName && <DiReact />}
                      {'DiJavascript1' === service.deviconName && <DiJavascript1 />}
                    </div>
                    <div className={styles.serviceHeader}>
                      {service.title}
                    </div>
                    <div className={styles.serviceDesc}>
                        {service.serviceSpecialties.map((speciality) => `${speciality}, `)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.gridRow2}>
            <div className={styles.col6}>
              <h5 className={styles.smallHeader}>
                <span>{skillsHeader}</span>
              </h5>
              {skills.map((skill) => {
                return (
                  <div className={styles.progress}>
                    <progress
                      className={styles.progressBar}
                      min="0"
                      max="100"
                      value={skill.strengthLevel}
                    />
                    <span className={styles.progressText}>
                      {skill.skills.map((skill) => `${skill} - `)}
                      {skill.strengthLevel}%
                    </span>
                  </div>
                );
              })}
            </div>
            <div className={styles.col6}>
              <h5 className={styles.smallHeader}>
                <span>{toolsHeader}</span>
              </h5>
              <ul className="list-unstyled">
                {tools.map((tool) => {
                  return (
                    <li><MdCheck className={styles.checkicon} /> {tool.tools}</li>
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
