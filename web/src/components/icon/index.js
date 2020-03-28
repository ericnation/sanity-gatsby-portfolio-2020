import React from 'react';
import HamburgerIcon from './hamburger';

const Icon = (props) => {
  switch (props.symbol) {
    case 'hamburger':
      return <HamburgerIcon />;
    default:
      return <span>Unknown icon: {props.symbol}</span>;
  }
};

export default Icon;
