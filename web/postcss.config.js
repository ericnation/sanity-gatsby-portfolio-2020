// Plugins
const calc = require('postcss-calc');
const presetEnv = require('postcss-preset-env');
const cssImport = require('postcss-import');
const nested = require('postcss-nested');
const units = require('postcss-units');
const colorFunction = require('postcss-color-function');
const autoprefixer = require('autoprefixer');
const mixins = require('postcss-sassy-mixins');
const focus = require('postcss-focus');
const stylelint = require('stylelint');
const browserReporter = require('postcss-browser-reporter');
const reporter = require('postcss-reporter');
const prependImports = require('postcss-prepend-imports');
const cssnano = require('cssnano');
const variables = require('postcss-simple-vars');
const stylelintConfig = require('./stylelint.config.js');
const cssVars = require('./src/styles/vars');
const flatten = require('./src/utils/flatten');

module.exports = () => ({
  plugins: [
    prependImports({
      path: './src/styles',
      files: ['mixins/index.css'],
    }),
    cssImport({
      path: './src/styles',
    }), // Import files
    mixins(),
    variables({
      variables: flatten(cssVars),
    }),
    stylelint(stylelintConfig),
    units(), // Compute rem() function
    nested(), // Allow nested syntax.
    calc({
      mediaQueries: true,
    }),
    colorFunction(),
    focus(),
    autoprefixer({
      flexbox: 'no-2009',
    }),
    browserReporter(),
    reporter(),
    cssnano({ preset: 'default' }),
    presetEnv({
      stage: 0,
    }),
  ],
});
