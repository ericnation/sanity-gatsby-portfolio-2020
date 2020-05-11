import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import ProjectHeader from '../components/projectHeader';
import styles from '../styles/404-page.module.css';

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <ProjectHeader />
    <div className={styles.wrap}>
      <div className={styles.innerWrap}>
        <h1>Whoops, you've arrived at the 404 page.</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness 😢</p>

        <p>
          No worries, just click on the logo in the footer or header to find your way back home 😄
        </p>
      </div>
    </div>
  </Layout>
);

export default NotFoundPage;
