module.exports = {
  extends: [
    'airbnb',
    'prettier',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 'off',
  },
};
