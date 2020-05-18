import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import classNames from 'classnames';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import { graphql, useStaticQuery } from 'gatsby';
// Styles.
import styles from './contact.module.css';

const Contact = () => {
  const { sanityContact, allSanityCountries } = useStaticQuery(graphql`
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
        youtube
        email
        city
      }
      allSanityCountries(filter: { currentLocation: { eq: true } }) {
        nodes {
          currentLocation
          countryName
        }
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
    youtube,
    id,
    github,
    facebook,
    email,
    city,
  } = sanityContact;

  const { nodes } = allSanityCountries;
  const { register, handleSubmit, reset, errors } = useForm({
    // By setting validateCriteriaMode to 'all'
    // all validation errors for single field will display at once
    validateCriteriaMode: 'all',
  });

  const [formState, setFormState] = useState({
    submitting: false,
    submitted: false,
  });

  const onSubmit = (formData) => {
    console.log(formData);
    setFormState({
      submitting: true,
      submitted: false,
    });
    fetch('/.netlify/functions/sendMail', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then((response) => {
        console.log('frontend response', response);
        setFormState({
          submitting: false,
          submitted: true,
        });
        reset();
      })
      .catch((error) => {
        console.log('frontend error', error);
        setFormState({
          submitting: false,
          submitted: true,
        });
      });
  };

  return (
    <section id="contact">
      <section className={styles.section}>
        <div className={styles.container}>
          <header className={styles.sectionHeader}>
            <h2>
              <span>{title}</span>
            </h2>
            <div className={styles.headerDesc}>
              <span>{subHeader}</span>
            </div>
          </header>

          <div className={styles.gridRow}>
            <div className={styles.col6}>
              <h3 className={styles.smallHeader}>
                <span>Send me a message</span>
              </h3>

              <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formGroup}>
                  <label htmlFor="nameInput">
                    <span className={styles.screenReaderText}>Enter Name</span>
                    <input
                      type="text"
                      name="nameInput"
                      title="nameInput"
                      ref={register({
                        required: true,
                        pattern: /^[a-z ,.'-]+$/i,
                      })}
                      aria-invalid={errors.nameInput ? 'true' : 'false'}
                      aria-describedby="error-nameInput-required error-nameInput-pattern"
                      id="nameInput"
                      placeholder="Name *"
                      tabIndex="0"
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
                      display:
                        errors.nameInput && 'required' === errors.nameInput.type ? 'block' : 'none',
                    }}
                  >
                    {REQUIRED_FORM_MESSAGE}
                  </span>
                  <span
                    role="alert"
                    id="error-nameInput-pattern"
                    className={styles.errorMessage}
                    style={{
                      display:
                        errors.nameInput && 'pattern' === errors.nameInput.type ? 'block' : 'none',
                    }}
                  >
                    Field must only contain letters
                  </span>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="emailInput">
                    <span className={styles.screenReaderText}>Enter Email</span>
                    <input
                      type="text"
                      title="emailInput"
                      name="emailInput"
                      id="emailInput"
                      ref={register({
                        required: true,
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                      placeholder="Email *"
                      tabIndex="0"
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
                      display:
                        errors.emailInput && 'required' === errors.emailInput.type
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {REQUIRED_FORM_MESSAGE}
                  </span>
                  <span
                    role="alert"
                    id="error-emailInput-pattern"
                    className={styles.errorMessage}
                    style={{
                      display:
                        errors.emailInput && 'pattern' === errors.emailInput.type
                          ? 'block'
                          : 'none',
                    }}
                  >
                    Invalid email format
                  </span>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phoneInput">
                    <span className={styles.screenReaderText}>Enter phone number</span>
                    <input
                      type="text"
                      title="phoneInput"
                      name="phoneInput"
                      id="phoneInput"
                      ref={register({
                        pattern: /^(\(?\+?[0-9]*\)?)?[0-9_\- \(\)]*$/,
                      })}
                      placeholder="Phone"
                      aria-invalid={errors.phoneInput ? 'true' : 'false'}
                      aria-describedby="error-phoneInput-pattern"
                      tabIndex="0"
                      aria-required="true"
                      className={styles.formInput}
                    />
                  </label>
                  <span
                    role="alert"
                    id="error-phoneInput-pattern"
                    className={styles.errorMessage}
                    style={{
                      display:
                        errors.phoneInput && 'pattern' === errors.phoneInput.type
                          ? 'block'
                          : 'none',
                    }}
                  >
                    Invalid phone number format
                  </span>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="messageInput">
                    <span className={styles.screenReaderText}>Write message</span>
                    <textarea
                      name="messageInput"
                      title="messageInput"
                      id="messageInput"
                      ref={register({
                        required: true,
                      })}
                      cols="39"
                      rows="6"
                      tabIndex="0"
                      className={classNames(styles.textarea, {
                        [styles.inputError]: errors.messageInput,
                      })}
                      placeholder="Message * ..."
                    ></textarea>
                  </label>
                  <span
                    role="alert"
                    id="error-messageInput-required"
                    className={styles.errorMessage}
                    style={{
                      display:
                        errors.messageInput && 'required' === errors.messageInput.type
                          ? 'block'
                          : 'none',
                    }}
                  >
                    {REQUIRED_FORM_MESSAGE}
                  </span>
                </div>
                <input
                  type="submit"
                  id="submitBtn"
                  tabIndex="0"
                  value={formState.submitting ? 'Sending ...' : 'Send Messsage'}
                  className={classNames(styles.btn, styles.contactBtn)}
                />
              </form>
            </div>

            <div className={styles.col6}>
              <h3 className={styles.smallHeader}>
                <span>Location</span>
              </h3>

              <div className={styles.bottomGap}>
                <p>
                  Home base is Phoenix, <span className={styles.accentColor}>{state}</span> 🌵USA
                </p>
                <p>
                  However, I'm usually living abroad nomading around some of my favorite countries
                  which include Costa Rica, Mexico, Portugal, Netherlands, and Spain.
                </p>
                {nodes[0].currentLocation && (
                  <p>
                    Current Location: &nbsp;
                    <span className={styles.accentColor}>{nodes[0].countryName}</span>
                  </p>
                )}
              </div>

              <h3 className={styles.smallHeader}>
                <span>Connect</span>
              </h3>

              <div className={styles.socialIcons}>
                {github && (
                  <a href={github} className={styles.github} target="_blank">
                    <span className={styles.screenReaderText}>Github Icon Link</span>
                    <FaGithub />
                  </a>
                )}
                {linkedin && (
                  <a href={linkedin} className={styles.linkedin} target="_blank">
                    <span className={styles.screenReaderText}>LinkedIn Icon Link</span>
                    <FaLinkedinIn />
                  </a>
                )}
                {instagram && (
                  <a href={instagram} className={styles.instagram} target="_blank">
                    <span className={styles.screenReaderText}>Instagram Icon Link</span>
                    <FaInstagram />
                  </a>
                )}
                {youtube && (
                  <a href={youtube} className={styles.youtube} target="_blank">
                    <span className={styles.screenReaderText}>Youtube Icon Link</span>
                    <FaYoutube />
                  </a>
                )}
                {facebook && (
                  <a href={facebook} className={styles.facebook} target="_blank">
                    <span className={styles.screenReaderText}>Facebook Icon Link</span>
                    <FaFacebookF />
                  </a>
                )}
                {twitter && (
                  <a href={twitter} className={styles.twitter} target="_blank">
                    <span className={styles.screenReaderText}>Twitter Icon Link</span>
                    <FaTwitter />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default Contact;
