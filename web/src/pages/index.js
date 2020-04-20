import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import LayoutContainer from '../containers/layout-container';
import About from '../components/about';
import Nav from '../components/nav';
import Contact from '../components/contact';
import Services from '../components/services';
import Hero from '../components/hero';
import ProjectSection from '../components/projectSection';

export const query = graphql`
  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
    }
  }
`;

const IndexPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <LayoutContainer>
        <GraphQLErrorList errors={errors} />
      </LayoutContainer>
    );
  }

  const site = (data || {}).site;

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <LayoutContainer>
      <SEO title={site.title} description={site.description} keywords={site.keywords} />
      <Container>
        <Hero />
        <Nav />
        <About />
        <Services />
        <ProjectSection />
        <Contact />
      </Container>
    </LayoutContainer>
  );
};

export default IndexPage;
