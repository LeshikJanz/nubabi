// @flow
import axios from 'axios';
import { Observable } from 'rxjs/Observable';

import type {
  Action,
  AppOnlineAction,
  AppErrorAction,
  OnAuthAction,
  Deps,
  FirebaseUser,
} from '../types';

export const appError = (error: Object): AppErrorAction => ({
  type: 'APP_ERROR',
  payload: error,
  error: true,
});

export const appOnline = (online: boolean): AppOnlineAction => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appSuccess = (message: string) => ({
  type: 'APP_SUCCESS',
  payload: message,
});

export const alertShown = {
  type: 'ALERT_SHOWN',
};

export const onAuth = (user: ?FirebaseUser, token?: string): OnAuthAction => ({
  type: 'ON_AUTH',
  payload: { user, token },
});

const appStartedEpic = (action$: any, deps: Deps) => {
  const { firebaseAuth } = deps;

  const onAuth$ = Observable.create(observer => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        firebaseAuth()
          .currentUser.getToken()
          .then(token => {
            if (__DEV__) {
              axios
                .post('http://localhost:8080/graphql-config', {
                  token: `Bearer ${token}`,
                })
                .catch(() => {});
            }
            observer.next(onAuth(firebaseUser, token));
          });
      } else {
        observer.next(onAuth(firebaseUser));
      }
    });
    return unsubscribe;
  });

  const streams: Array<any> = [onAuth$];

  return action$
    .filter((action: Action) => action.type === 'APP_STARTED')
    .mergeMap(() => Observable.merge(...streams));
};

const resetSettingsEpic = (action$: any) => {
  return action$
    .filter(action => action.type === 'RESET_SETTINGS')
    .mapTo(appSuccess('Settings has been reset'));
};

export const epics = [appStartedEpic, resetSettingsEpic];
