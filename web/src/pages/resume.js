import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import classNames from 'classnames';
import { MdLink, MdCheck } from 'react-icons/md';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import BackgroundImage from 'gatsby-background-image';
import { buildImageObj } from '../lib/helpers';
import imageUrlFor from '../lib/image-url';
import BlockText from '../components/block-text';
import SEO from '../components/seo';
import LayoutContainer from '../containers/layout-container';
import Logo from '../components/logo';

import styles from '../styles/resume.module.css';

const Resume = () => {
  const { sanitySiteSettings, sanityResume } = useStaticQuery(graphql`
    query ResumeQuery {
      sanitySiteSettings {
        title
        description
        keywords
        author {
          name
          email
          homebase
          phone
        }
      }
      sanityResume {
        education {
          degreeType
          graduationDate(formatString: "MMMM YYYY")
          schoolName
        }
        personalityType
        headerImage {
          alt
          asset {
            url
            size
            id
            _id
            assetId
            fluid(maxWidth: 2000, sizes: "2000") {
              base64
              aspectRatio
              src
              srcWebp
              sizes
            }
          }
        }
        pdfResume {
          asset {
            url
            originalFilename
            id
            _id
            assetId
          }
        }
        profile
        title
        updateData(formatString: "MMMM YYYY")
        workExperience {
          jobs {
            startDate(formatString: "MMMM YYYY")
            jobTitle
            _rawJobBullets
            endDate(formatString: "MMMM YYYY")
            companyWebsite
            companyName
            id
          }
        }
        subHeaderImage {
          alt
          asset {
            url
            _id
            id
            assetId
          }
        }
        technicalSkills {
          tools
          softSkills
          professionalSkills
        }
      }
    }
  `);

  const {
    education,
    headerImage,
    personalityType,
    pdfResume,
    profile,
    title,
    updateData,
    workExperience: { jobs },
    subHeaderImage,
    technicalSkills: { tools, softSkills, professionalSkills },
  } = sanityResume;

  const {
    description,
    keywords,
    author: { name, email, homebase, phone },
  } = sanitySiteSettings;
  const subHeaderImagePrepped = imageUrlFor(buildImageObj(subHeaderImage))
    .height(492)
    .width(2000)
    .url();
  return (
    <LayoutContainer>
      <SEO
        image={headerImage}
        title={`Resume for Eric Nation - Software Developer`}
        description={description}
        keywords={keywords}
      />
      <main className={styles.pageWrap}>
        {headerImage && headerImage.asset && (
          <BackgroundImage className={styles.pageHeader} fluid={headerImage.asset.fluid}>
            <div className={styles.container}>
              <div className={styles.pageNav}>
                <Link className={styles.btnBackHome} to="/">
                  <FaLongArrowAltLeft /> Home
                </Link>
              </div>
              <div className={styles.pageLogo}>
                <Link to="/">
                  <Logo color="black" width={65} />
                </Link>
              </div>
              <div className={classNames(styles.pageTitle, styles.sectionHeader)}>
                <h1>
                  <span>{title}</span>
                </h1>
                <div className={styles.headerDesc}>
                  <span>Last updated {updateData}</span>
                  <br />
                  <div className={styles.resumeWrap}>
                    <a href={pdfResume.asset.url} target="_blank" className={styles.resumeLink}>
                      PDF Resume
                    </a>
                    <MdLink className={styles.linkIcon} />
                  </div>
                </div>
              </div>
            </div>
          </BackgroundImage>
        )}
        <section
          className={styles.pageContent}
          style={{ backgroundImage: `url(${subHeaderImagePrepped})` }}
        >
          <section className={styles.section}>
            <div className={styles.container}>
              <div className={styles.sectionHeaderResume}>
                <h2>{name}</h2>
                <div className={styles.headerDescResume}>
                  <span>
                    {email} &middot; {phone}
                  </span>
                  <span>{homebase}</span>
                  <span>Personality Type: {personalityType}</span>
                </div>
              </div>
              <div className={styles.resumeRow}>
                <h3>Profile</h3>
                <div className={styles.resumeContent}>
                  <p>{profile}</p>
                </div>
              </div>

              <div className={styles.resumeRow}>
                <h3>Work Experience</h3>
                <div className={styles.resumeContent}>
                  {jobs.map((job) => {
                    return (
                      <div className={styles.jobRow} key={job.companyName}>
                        <h4>
                          <a href={job.companyWebsite} target="_blank">
                            {job.companyName}
                          </a>
                          <span className={styles.subTitle}>
                            {job.jobTitle}
                            &nbsp;&nbsp; |&nbsp; {job.startDate} - {job.endDate || 'Current'}
                          </span>
                        </h4>
                        {job._rawJobBullets && <BlockText blocks={job._rawJobBullets} />}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className={styles.resumeRow}>
                <h3>Education</h3>
                <div className={styles.resumeContent}>
                  <h4>
                    {education.schoolName}
                    <span className={styles.subTitle}>
                      {education.degreeType} &nbsp;|&nbsp;
                      {education.graduationDate}
                    </span>
                  </h4>
                </div>
              </div>

              <div className={styles.resumeRow}>
                <h3>Technical Skills</h3>
                <div className={classNames(styles.resumeContent, styles.noBorder)}>
                  <div className={styles.skillsRow}>
                    <div className={styles.col4}>
                      <h4>Professional Skillset</h4>
                      <ul>
                        {professionalSkills.map((skill) => (
                          <li key={skill}>
                            <MdCheck /> {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.col4}>
                      <h4>Soft Skills</h4>
                      <ul>
                        {softSkills.map((skill) => (
                          <li key={skill}>
                            <MdCheck /> {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={styles.col4}>
                      <h4>Tools</h4>
                      <ul>
                        {tools.map((tool) => (
                          <li key={tool}>
                            <MdCheck /> {tool}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    </LayoutContainer>
  );
};

export default Resume;
