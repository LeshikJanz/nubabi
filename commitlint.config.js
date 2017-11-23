/* eslint-disable import/no-extraneous-dependencies */
const { flatten, keys, mapObjIndexed } = require('ramda');
const { patterns } = require('./.commitlint-patterns.json');

module.exports = {
  extends: ['@commitlint/config-angular'],
  settings: {
    scope: {
      enumerables: mapObjIndexed(
        val => ({
          description: val,
        }),
        patterns.components
      ),
    },
  },
  rules: {
    'scope-enum': () => {
      const innerScopes = keys(patterns.components).map(component => {
        return [`core/${component}`, `native/${component}`, `web/${component}`];
      });

      const scopes = flatten([
        patterns.system,
        patterns.packages,
        keys(patterns.components),
        innerScopes,
      ]);
      return [2, 'always', scopes.concat(['system'])];
    },
  },
};
