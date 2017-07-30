process.env.BABEL_ENV = 'test';

module.exports = function(wallaby) {
  return {
    files: [
      'src/**/*.js',
      'src/**/*.json',
      'src/**/*.snap',
      'package.json',
      '!src/**/__tests__/*.js',
      '!src/**/*.test.js',
    ],
    tests: ['src/**/__tests__/*.js', 'src/**/*.test.js'],
    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },

    testFramework: 'jest',

    setup: wallaby => {
      wallaby.testFramework.configure(require('./package.json').jest);
    },
  };
};
