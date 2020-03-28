import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import ProjectPreviewGrid from
  '../components/projectPreviewGrid';
import SEO from '../components/seo';
import LayoutContainer from '../containers/layout-container';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';

import { responsiveTitle1 } from '../components/typography.module.css';

export const query = graphql`
  query ArchivePageQuery {
    projects: allSanitySampleProject(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          mainImage {
            asset {
              _id
            }
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
        }
      }
    }
  }
`;

const ArchivePage = (props) => {
  const { data, errors } = props;
  if (errors) {
    return (
      <LayoutContainer>
        <GraphQLErrorList errors={errors} />
      </LayoutContainer>
    );
  }
  const projectNodes = data && data.projects &&
    mapEdgesToNodes(data.projects).filter(filterOutDocsWithoutSlugs);
  return (
    <LayoutContainer>
      <SEO title='Archive' />
      <Container>
        <h1 className={responsiveTitle1}>Projects</h1>
        {projectNodes && projectNodes.length > 0 && (
          <ProjectPreviewGrid nodes={projectNodes} />
        )}
      </Container>
    </LayoutContainer>
  );
};

export default ArchivePage;
