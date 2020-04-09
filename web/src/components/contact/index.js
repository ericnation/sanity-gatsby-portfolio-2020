import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
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
  const REQUIRED_FORM_MESSAGE = 'This field is required.';
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
  const {
    register,
    handleSubmit,
    formState,
    watch,
    errors
  } = useForm();
  const onSubmit = (formData) => {
    console.log(formData)
  };

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

              <form
                id="contact-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className={styles.formGroup}>
                  <label htmlFor="nameInput">
                    <input
                      type="text"
                      name="nameInput"
                      ref={register({
                        required: true,
                        pattern: /^[a-z ,.'-]+$/i,
                      })}
                      aria-invalid={errors.nameInput ? 'true' : 'false'}
                      aria-describedby="error-nameInput-required error-nameInput-pattern"
                      id="nameInput"
                      placeholder="Name"
                      tabindex="1"
                      aria-required="true"
                      className={classNames(styles.formInput, {
                        [styles.inputError]: errors.nameInput,
                      })}
                    />
                  </label>
                  <span
                    role="alert"
                    id="error-nameInput-required"
                    className={styles.errorMessage}
                    style={{
                      display: errors.nameInput &&
                      'required' === errors.nameInput.type ?
                        'block' : 'none',
                    }}
                  >
                    {REQUIRED_FORM_MESSAGE}
                  </span>
                  <span
                    role="alert"
                    id="error-nameInput-pattern"
                    className={styles.errorMessage}
                    style={{
                      display: errors.nameInput && 'pattern' === errors.nameInput.type ?
                        'block' : 'none',
                    }}
                  >
                    Field must only contain letters
                  </span>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="emailInput">
                    <input
                      type="text"
                      name="emailInput"
                      id="emailInput"
                      ref={register({
                        required: true,
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                      placeholder="Email"
                      tabindex="2"
                      aria-invalid={errors.emailInput ? 'true' : 'false'}
                      aria-describedby="error-emailInput-required error-emailInput-pattern"
                      aria-required="true"
                      className={classNames(styles.formInput, {
                        [styles.inputError]: errors.emailInput,
                      })}
                    />
                  </label>
                  <span
                    role="alert"
                    id="error-emailInput-required"
                    className={styles.errorMessage}
                    style={{
                      display: errors.emailInput &&
                      'required' === errors.emailInput.type ?
                        'block' : 'none',
                    }}
                  >
                    {REQUIRED_FORM_MESSAGE}
                  </span>
                  <span
                    role="alert"
                    id="error-emailInput-pattern"
                    className={styles.errorMessage}
                    style={{
                      display: errors.emailInput &&
                        'pattern' === errors.emailInput.type ?
                        'block' : 'none',
                    }}
                  >
                    Invalid email format
                  </span>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phoneInput">
                    <input
                      type="text"
                      name="phoneInput"
                      id="phoneInput"
                      ref={register}
                      placeholder="Phone"
                      tabindex="2"
                      aria-required="true"
                      className={styles.formInput}
                    />
                  </label>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="messageInput">
                    <textarea
                      name="messageInput"
                      id="messageInput"
                      ref={register}
                      cols="39"
                      rows="6"
                      tabindex="4"
                      className={styles.textarea}
                      placeholder="Message...">
                    </textarea>
                  </label>
                </div>
                <input
                  type="submit"
                  id="submitBtn"
                  tabindex="5"
                  value="Send message"
                  className={classNames(styles.btn, styles.contactBtn)}
                />
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
