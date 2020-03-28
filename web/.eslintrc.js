module.exports = {
  extends: [
    'standard',
    'airbnb',
    'standard-react',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  rules: {
    'react/prop-types': 0,
    "indent": [2, 2, {"SwitchCase": 1}],
    "max-len": [2, 80, 4, {
      "ignoreComments": true,
      "ignoreUrls": true
    }],
    "quotes": [2, "single"],
    "semi": [2, "always"],
    "no-multiple-empty-lines": [2, {"max": 1}],
    "comma-dangle": [2, "always-multiline"],
    "dot-location": [2, "property"],
    "one-var": [2, "never"],
    "no-var": [2],
    "prefer-const": ["error"],
    "no-bitwise": [2],
    "id-length": ["error", {
      "properties": "never",
      "exceptions": ["x", "y", "i", "e", "n", "k"]
    }],
    "func-names": [1, "always"],
    "no-use-before-define": [2, "nofunc"],
    "object-curly-spacing": [2, "always"],
    "array-bracket-spacing": [2, "never"],
    "keyword-spacing": ["error", {"after": true}],
    "space-before-blocks": [2, "always"],
    "space-in-parens": [2, "never"],
    "spaced-comment": [2, "always"],
    "no-confusing-arrow": ["error", {"allowParens": true}],
    "no-constant-condition": ["error"],
    "arrow-parens": ["error", "always"],
    "operator-linebreak": ["error", "after"],
    "function-paren-newline": ["error", "consistent"],
    "react/prefer-stateless-function": "off",
    "jsx-a11y/anchor-is-valid": [ "error", {
      "components": [ "Link" ],
      "specialLink": [ "to" ]
    }],
    "import/newline-after-import": [0],
    "react/jsx-filename-extension": [0],
    "react/jsx-one-expression-per-line": [0],
    "react/forbid-prop-types": [0],
    "react/jsx-props-no-spreading": [0],
    "import/no-named-as-default": [0],
    "import/no-named-as-default-member": [0],
    "import/no-extraneous-dependencies": [0],
    "import/no-unresolved": [0],
    "import/extensions": [0],
    "no-underscore-dangle": [0],
  },
  settings: {
    react: {
      pragma: 'React',
      version: '16.8.4'
    }
  }
}
