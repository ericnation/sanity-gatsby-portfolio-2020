// Plugins
const calc = require('postcss-calc');
const breakPoints = require('postcss-breakpoints');
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
const lost = require('lost');
const stylelintConfig = require('./stylelint.config.js');

module.exports = () => ({
  plugins: [
    breakPoints({
      breakpoints: {
        xs: '410px',
        sm: '630px',
        md: '960px',
        lg: '1312px',
      },
    }),
    presetEnv({
      stage: 0,
    }),
    stylelint(stylelintConfig),
    prependImports({
      path: './src/styles',
      files: ['mixins/index.css'],
    }),
    cssImport({
      path: './src/styles',
    }), // Import files
    mixins(),
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
    lost(), // grid system
  ],
});
