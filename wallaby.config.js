process.env.BABEL_ENV = 'test';

module.exports = function(wallaby) {
  const babel = wallaby.compilers.babel();
  return {
    files: [
      'core/**/*.js',
      'platforms/native/**/*.js',
      { pattern: 'core/**/*.json', instrument: false },
      { pattern: 'core/**/*.snap', instrument: false },
      { pattern: 'core/**/*.png', instrument: false },
      { pattern: 'core/**/*.jpg', instrument: false },
      { pattern: 'platforms/**/*.json', instrument: false },
      { pattern: 'platforms/**/*.snap', instrument: false },
      { pattern: 'platforms/server/graphql/introspection.json', instrument: false },
      'libs/graphql-utils/*.js',
      '!libs/graphql-utils/__tests__/*',
      '!core/**/__tests__/*.js',
      '!core/**/__tests__/*.js',
      '!platforms/**/__tests__/*.test.js',
      'package.json',
    ],
    tests: [
      'core/**/__tests__/*.js',
      'core/**/*.test.js',
      'platforms/native/**/__tests__/*.js',
      'libs/graphql-utils/__tests__/*.js',
      '!**/node_modules/**',
    ],
    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      'core/*.js': babel,
      'core/*/*.js': babel,
      'core/**/__tests__/*.js': babel,
      'libs/graphql-utils/*': babel,
      'libs/graphql-utils/__tests__/*.js': babel,
      'platforms/native/**/*.js': babel,
    },

    testFramework: 'jest',

    setup: wallaby => {
      wallaby.testFramework.configure(require('./package.json').jest);
    },
  };
};
