// @flow

import type { Deps, State } from './types';

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  ...platformDeps,
  now: () => Date.now(),
});

export default configureDeps;
