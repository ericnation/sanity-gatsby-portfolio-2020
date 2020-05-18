import React from 'react';
import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import BlogPost from '../components/blogPost';
import SEO from '../components/seo';
import LayoutContainer from '../containers/layout-container';
import { toPlainText } from '../lib/helpers';

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
      }
      thumbnailImage {
        alt
        asset {
          url
          assetId
          _id
          fixed(width: 400) {
            base64
            aspectRatio
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
          }
        }
        hotspot {
          height
          width
          x
          y
        }
        crop {
          top
          right
          left
          bottom
        }
      }
      mainImage {
        alt
        asset {
          url
          assetId
          _id
          fluid(maxHeight: 500) {
            base64
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
        hotspot {
          height
          width
          x
          y
        }
        crop {
          top
          right
          left
          bottom
        }
      }
      title
      slug {
        current
      }
      _rawExcerpt
      _rawBody
      author {
        name
        image {
          alt
          asset {
            _id
            assetId
            fixed(width: 75) {
              base64
              aspectRatio
              width
              height
              src
              srcSet
              srcWebp
              srcSetWebp
            }
          }
        }
      }
    }
  }
`;

const BlogPostTemplate = (props) => {
  const { data, errors } = props;
  const post = data && data.post;
  return (
    <LayoutContainer isProjectPage={true}>
      <main>
        {errors && <SEO title="GraphQL Error" />}
        {post && (
          <SEO
            title={post.title || 'Untitled'}
            description={toPlainText(post._rawExcerpt)}
            image={post.thumbnailImage}
          />
        )}

        {errors && (
          <Container>
            <GraphQLErrorList errors={errors} />
          </Container>
        )}

        {post && <BlogPost {...post} />}
      </main>
    </LayoutContainer>
  );
};

export default BlogPostTemplate;
