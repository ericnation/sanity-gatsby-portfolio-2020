import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
} from 'react-icons/fa';
import { graphql, useStaticQuery } from 'gatsby';

import styles from './contact.module.css';

const Contact = () => {
  const { sanityContact } = useStaticQuery(graphql`
    query ContactQuery {
      sanityContact {
        twitter
        title
        subHeader
        state
        phone
        linkedin
        instagram
        id
        github
        facebook
        email
        city
      }
    }
  `);

  const {
    twitter,
    title,
    subHeader,
    state,
    phone,
    linkedin,
    instagram,
    id,
    github,
    facebook,
    email,
    city,
  } = sanityContact;
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => { console.log(data) };
  return (
    <section>
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

          <div className={styles.gridRow}>
            <div className="col-sm-7 fadeLeft">
              <h5 className={styles.smallHeader}>
                <span>Send me a message</span>
              </h5>

              <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="form-horizontal">
                <div id="message-input">
                  <input type="text" name="name" id="name" value="" placeholder="Name" size="22" tabindex="1" aria-required="true" className="requiredField name input-name label-better" />
                  <input type="text" name="email" id="email" value="" placeholder="Email" size="22" tabindex="2" aria-required="true" className="requiredField email input-email label-better" />
                </div>
                <div id="message-textarea">
                  <textarea name="message" id="message" cols="39" rows="6" tabindex="4" className="requiredField label-better" placeholder="Message..."></textarea>
                </div>
                <input name="Send" type="submit" id="Send" tabindex="5" value="Send message" className="btn-submit btn" />
              </form>
            </div>

            <div className="col-sm-5 fadeRight resp-no-gap">
              <h5 className={styles.smallHeader}>
                <span>Location</span>
              </h5>

              <div className="row bottom-gap">
                <div className="col-sm-12">
                  <h6 className={styles.accentColor}>{state}</h6>
                  {city}
                </div>
              </div>

              <h5 className={styles.smallHeader}>
                <span>Connect</span>
              </h5>

              <div className={styles.socialIcons}>
                <a href={github} target="_blank"><FaGithub /></a>
                <a href={linkedin} target="_blank"><FaLinkedinIn /></a>
                <a href={instagram} target="_blank"><FaInstagram /></a>
                <a href={facebook} target="_blank"><FaFacebookF /></a>
                <a href={twitter} target="_blank"><FaTwitter /></a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
