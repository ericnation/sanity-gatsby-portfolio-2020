import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';

const Logo = ({ color }) => {
  const { sanitySiteSettings } = useStaticQuery(graphql`
    query LogoQuery {
      sanitySiteSettings {
        blackLogo {
          alt
          caption
          asset {
            id
            _id
            url
            assetId
            _type
          }
        }
        whiteLogo {
          alt
          caption
          asset {
            id
            _id
            url
            assetId
            _type
          }
        }
      }
    }
  `);
  const {
    blackLogo,
    whiteLogo,
  } = sanitySiteSettings;
  const blackLogoImg = imageUrlFor(buildImageObj(blackLogo)).width(67).url();
  const whiteLogoImg = imageUrlFor(buildImageObj(whiteLogo)).width(67).url();
  return (
    <img
      src={color === 'black' ?
        blackLogoImg : whiteLogoImg}
      alt="Eric Nation's logo"
    />
  );
};

Logo.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Logo;
