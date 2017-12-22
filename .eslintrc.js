const path = require('path');

module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'fp', 'graphql', 'react', 'react-native', 'prettier'],
  env: {
    jest: true,
  },
  globals: {
    __DEV__: false,
  },
  settings: {
    'import/resolver': {
      'babel-module': {
        projectRootDir: __dirname,
      },
    },
  },
  rules: {
    'arrow-parens': 0,
    'global-require': 0,
    'import/first': 0,
    'no-duplicate-imports': 0,
    'react/no-array-index-key': 0,
    // handled by eslint-plugin-import
    'no-use-before-define': 0,
    'no-underscore-dangle': [
      2,
      {
        allowAfterThis: true,
      },
    ],
    'import/prefer-default-export': 0,
    // actions can have only one action
    'import/no-named-as-default': 0,
    // we're exporting components for testing
    'arrow-body-style': 0,
    'no-confusing-arrow': 0,
    // this rule is indeed confusing
    'class-methods-use-this': 0,
    'react/jsx-filename-extension': 0,
    'react/forbid-prop-types': 0,
    'import/extensions': 0,
    'react-native/no-unused-styles': 0,
    'react-native/split-platform-components': 2,
    'fp/no-mutating-assign': 2,
    'graphql/template-strings': [
      'error',
      {
        // Import default settings for your GraphQL client. Supported values:
        // 'apollo', 'relay', 'lokka', 'literal'
        schemaJsonFilepath: path.resolve(__dirname, 'graphql.schema.json'),
        env: 'apollo',
      },
    ],
    'react/sort-comp': [
      2,
      {
        order: [
          'type-annotations',
          'state',
          '/^static fragments',
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],
    'react/require-default-props': 0, // Checked by flowtype
    // These rules have issues. Disabling until fixed
    // See:  https://github.com/yannickcr/eslint-plugin-react/issues/1452
    'react/boolean-prop-naming': 0,
    'react/default-props-match-prop-types': 0,
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight', 'to'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'jsx-a11y/label-has-for': 0,
  },
};
