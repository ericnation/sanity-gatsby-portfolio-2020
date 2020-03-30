/**
 * Merged custom props and custom media.
 * Import this to use any css custom props or media in JS.
 *
 * NOTE: we need to provide these to postcss as well, which doesn't like import statements (yet)
 */

/* eslint-disable global-require */
module.exports = {
  breakpoints: require('./breakpoints'),
  bkptVal: require('./breakpoints').bkptVal,
  colors: require('./colors'),
  fonts: require('./fonts'),
  'ui-sections': require('./ui-sections'),
};
/* eslint-enable */
