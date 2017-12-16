import { mockFirebase } from '../shared/testUtils';
import configureMiddleware from '../configureMiddleware';
import config from '../config';

describe('configureMiddleware', () => {
  const initialState = { config };
  const platformDeps = { firebase: mockFirebase() };
  const platformMiddleware = {};
  const platformEpics = [];

  it('configures initial state, platform-specific dependencies, middleware and epics', () => {
    expect(() => {
      configureMiddleware(
        initialState,
        platformDeps,
        platformMiddleware,
        platformEpics,
      );
    }).not.toThrow();
  });
});
