import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { buildImageObj } from '../lib/helpers';
import { StaticQuery, graphql } from 'gatsby';
import imageUrlFor from '../lib/image-url';

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      keywords
      author {
        name
      }
    }
  }
`;

const SEO = ({ description, lang, meta, keywords, title, image }) => {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription = description || (data.site && data.site.description) || '';
        const siteTitle = (data.site && data.site.title) || '';
        const siteAuthor = (data.site && data.site.author && data.site.author.name) || '';
        const metaImage =
          image && image.asset ? imageUrlFor(buildImageObj(image)).width(500).url() : '';
        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title}
            link={[
              {
                rel: 'icon',
                href: '../assets/images/favicon.ico',
              },
              {
                rel: 'apple-touch-icon-precomposed',
                href: '../assets/images/apple-touch-icon-precomposed.png',
              },
              {
                rel: 'apple-touch-icon-precomposed',
                href: 'apple-touch-icon-72x72-precomposed.png',
                sizes: '72x72',
              },
              {
                rel: 'apple-touch-icon-precomposed',
                href: 'apple-touch-icon-114x114-precomposed.png',
                sizes: '114x114',
              },
              {
                rel: 'apple-touch-icon-precomposed',
                href: 'apple-touch-icon-144x144-precomposed.png',
                sizes: '144x144',
              },
            ]}
            titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
            meta={[
              {
                name: 'google-site-verification',
                content: 'UA-166068421-1',
              },
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:image',
                content: metaImage,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteAuthor,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'twitter:image',
                content: metaImage,
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
};

SEO.defaultProps = {
  description: '',
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
