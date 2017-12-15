import configureDeps from '../configureDeps';
import config from '../config';
import { ApolloClient } from 'apollo-client';

describe('configureDeps', () => {
  const now = 1482363367071;
  Date.now = jest.fn(() => now);

  const deps = configureDeps({
    config: {
      firebase: config.firebase,
    }
  }, {
    somePlatformDependency: true,
  });  /*?*/

  it('adds platform-specific dependencies', () => {
    expect(deps).toHaveProperty('somePlatformDependency');
  });

  it('adds apollo', () => {
    expect(deps.apollo).toBeInstanceOf(ApolloClient);
  });

  it('adds a now timestamp function', () => {
    expect(deps).toHaveProperty('now');
    expect(deps.now()).toEqual(now);
  });

  it.skip('adds a UUID generator');

  it('adds Firebase dependencies', () => {
    expect(deps).toHaveProperty('firebase');
    expect(deps).toHaveProperty('firebaseAuth');
    expect(deps).toHaveProperty('firebaseData');
  });
});
