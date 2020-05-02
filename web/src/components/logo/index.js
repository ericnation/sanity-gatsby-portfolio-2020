import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import { buildImageObj } from '../../lib/helpers';
import imageUrlFor from '../../lib/image-url';

const Logo = ({ color, width, height }) => {
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
  const { blackLogo, whiteLogo } = sanitySiteSettings;
  let blackLogoImg = '',
    whiteLogoImg = '';
  if (!width) {
    blackLogoImg = imageUrlFor(buildImageObj(blackLogo)).height(height).url();
    whiteLogoImg = imageUrlFor(buildImageObj(whiteLogo)).height(height).url();
  }

  if (!height) {
    blackLogoImg = imageUrlFor(buildImageObj(blackLogo)).width(width).url();
    whiteLogoImg = imageUrlFor(buildImageObj(whiteLogo)).width(width).url();
  }

  return <img src={color === 'black' ? blackLogoImg : whiteLogoImg} alt="Eric Nation's logo" />;
};

Logo.defaultProps = {
  height: 0,
  width: 0,
};

Logo.propTypes = {
  color: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Logo;
