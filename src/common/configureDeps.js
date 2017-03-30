// @flow

import type { Deps, State } from './types';

const configureDeps = (initialState: State, platformDeps: Deps) => { console.log(initialState); return ({
  ...platformDeps,
  now: () => Date.now(),
})};

export default configureDeps;
