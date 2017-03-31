// @flow
import type { Deps, State } from './types';
import * as firebase from 'firebase';

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

const configureDeps = (initialState: State, platformDeps: Deps) => ({
  ...platformDeps,
  ...createFirebaseDeps(initialState.config.firebase),
  now: () => Date.now(),
});

export default configureDeps;
