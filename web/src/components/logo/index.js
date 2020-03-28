import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ color }) => (
  <img
    src={color === 'black' ?
      'img/logo-black-big.png' : 'img/logo-nation-top.png'}
    alt="Eric Nation's logo"
  />
);

Logo.propTypes = {
  color: PropTypes.string.isRequired,
};

export default Logo;
