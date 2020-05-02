import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import Project from '../components/project';
import SEO from '../components/seo';
import LayoutContainer from '../containers/layout-container';

export const query = graphql`
  query ProjectTemplateQuery($id: String!) {
    sampleProject: sanityProject(id: { eq: $id }) {
      id
      youtubeId
      videoPoster {
        alt
        asset {
          _id
          url
          title
          assetId
          fluid(maxWidth: 720) {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
      }
      _rawBackground
      _rawProcess
      carousel {
        title
        slides {
          image {
            alt
            asset {
              _id
              assetId
              url
              fluid {
                base64
                aspectRatio
                src
                srcSet
                srcWebp
                srcSetWebp
                sizes
              }
            }
          }
        }
      }
      categories {
        title
        id
      }
      clientName
      employerName
      launchDate(formatString: "MMMM YYYY")
      projectName
      projectTags
      projectThumbnail {
        alt
        asset {
          assetId
          _id
          fixed(width: 350) {
            base64
            aspectRatio
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
          }
          url
        }
      }
      projectUrl
      title
      video {
        asset {
          url
          title
          mimeType
          assetId
        }
      }
      slug {
        current
      }
      relatedProjects {
        _id
        slug {
          current
        }
        title
      }
    }
  }
`;

const ProjectTemplate = (props) => {
  const { data, errors, pageContext } = props;
  const { previous } = pageContext;
  const { next } = pageContext;
  const project = data && data.sampleProject;
  return (
    <LayoutContainer isProjectPage={true}>
      {errors && <SEO title="GraphQL Error" />}
      {project && <SEO title={project.title || 'Untitled'} />}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}
      {project && <Project {...project} pagination={[previous, next]} />}
    </LayoutContainer>
  );
};

export default ProjectTemplate;
