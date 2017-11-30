// @flow
/* global __DEV__:false */
import type { Deps, State } from './types';
import * as firebase from 'firebase';
import { configureApollo } from './configureApollo';

let firebaseDeps = null;

const createFirebaseDeps = firebaseConfig => {
  if (!firebaseDeps) {
    firebase.initializeApp(firebaseConfig);
    firebaseDeps = {
      firebase: firebase.database().ref(),
      firebaseAuth: firebase.auth,
      firebaseData: firebase.database,
    };
  }

  return firebaseDeps;
};

const apollo = configureApollo();

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  apollo,
  ...createFirebaseDeps(initialState.config.firebase),
  now: () => Date.now(),
  ...platformDeps,
});

export default configureDeps;
