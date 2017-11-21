module.exports = {
  extends: ['@commitlint/config-angular'],
  rules: {
    'scope-enum': () => {
      const { patterns } = require('./.commitlint-patterns.json');
      return [2, 'always', patterns.concat(['system'])];
    },
  },
};
