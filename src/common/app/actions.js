// @flow
import type { Action, Deps, FirebaseUser } from '../types';
import { Observable } from 'rxjs/Observable';
import api from '../connectors/mlb';
import { getBabiesSuccess } from '../babies/actions';

export const appError = (error: Object): Action => ({
  type: 'APP_ERROR',
  payload: error,
  error: true,
});

export const appOnline = (online: boolean): Action => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const onAuth = (user: ?FirebaseUser): Action => ({
  type: 'ON_AUTH',
  payload: { user },
});

// We will get rid of this once we standarize data fetching
const appOnlineEpic = (action$: any, deps: Deps) => {
  return action$.ofType('ON_AUTH')
    .switchMap(() => {
      const { getState } = deps;
      const state = getState();

      if (!state.app.online && state.auth.isAuthenticated) {
        return Observable.fromPromise(api.getBabies(state.auth.token))
          .mergeMap(response => [getBabiesSuccess(response), appOnline(true)])
          .catch((err) => Observable.of(appError(err)));
      }

      return Observable.of(appOnline(true));
    });
};

const appStartedEpic = (action$: any, deps: Deps) => {
  const { firebaseAuth } = deps;

  const onAuth$ = Observable.create(observer => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(firebaseUser => {
      observer.next(onAuth(firebaseUser));
    });
    return unsubscribe;
  });

  const streams: Array<any> = [onAuth$];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable.merge(...streams));
};

export const epics = [appStartedEpic, appOnlineEpic];
