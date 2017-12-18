// @flow
/* global __DEV__:false */
import type { Deps, State } from './types';
import { configureApollo } from './configureApollo';

let firebaseDeps = null;

const createFirebaseDeps = (firebase, firebaseConfig) => {
  if (!firebaseDeps) {
    firebase.initializeApp(firebaseConfig);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseAnalytics: firebase.analytics,
      firebaseData: firebase.database,
      firebaseSdk: firebase,
    };
  }

  return firebaseDeps;
};

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  apollo: configureApollo(),
  ...createFirebaseDeps(platformDeps.firebase, initialState.config.firebase),
  now: () => Date.now(),
  ...platformDeps,
});

export default configureDeps;
