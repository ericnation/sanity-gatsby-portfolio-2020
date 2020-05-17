import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

const query = graphql`
  query SiteTitleQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
    }
  }
`;

const LayoutContainer = (props) => {
  return (
    <StaticQuery
      query={query}
      render={(data) => {
        if (!data.site) {
          throw new Error(
            'Missing "Site settings". Open the studio at http://localhost:3333 and add "Site settings" data',
          );
        }
        return <Layout {...props} siteTitle={data.site.title} />;
      }}
    />
  );
};

LayoutContainer.defaultProps = {
  isProjectPage: false,
};

LayoutContainer.propTypes = {
  isProjectPage: PropTypes.bool,
};

export default LayoutContainer;
