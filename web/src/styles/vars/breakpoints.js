/**
 * Custom media queries
 */
const bkptVal = {
  lg: 73.125, // 1170 = desktop
  md: 60, // 960 = tablet
  sm: 39.375, // 630= bigger phone
  xs: 25, // 400 phone
};

const breakpoints = Object.keys(bkptVal).reduce((acc, curr) => {
  acc[`${curr}Min`] = `min-width: ${bkptVal[curr]}rem`;
  acc[`${curr}Max`] = `max-width: ${bkptVal[curr] - 0.0001}rem`;
  acc[`${curr}Val`] = `${bkptVal[curr]}rem`;
  return acc;
}, {});
/* eslint-disable prefer-object-spread */
module.exports = Object.assign(
  {},
  {
    bkptVal,
  },
  breakpoints
);
