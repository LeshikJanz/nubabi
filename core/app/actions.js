// @flow
import axios from 'axios';
import { Observable } from 'rxjs/Observable';
import '../shared/observable';

import type {
  Action,
  AppOnlineAction,
  AppErrorAction,
  OnAuthAction,
  Deps,
  FirebaseUser,
  ResetSettingsAction,
} from '../types';

export const appStarted = (): AppStartedAction => ({
  type: 'APP_STARTED',
});

export const appError = (error: Object): AppErrorAction => ({
  type: 'APP_ERROR',
  payload: error,
  error: true,
});

export const appOnline = (online: boolean): AppOnlineAction => ({
  type: 'APP_ONLINE',
  payload: { online },
});

export const appSuccess = (message: string): AppSuccessAction => ({
  type: 'APP_SUCCESS',
  payload: message,
});

export const appInfo = (message: string): AppInfoAction => ({
  type: 'APP_INFO',
  payload: message,
});

export const onAuth = (user: ?FirebaseUser, token?: string): OnAuthAction => ({
  type: 'ON_AUTH',
  payload: { user, token },
});

export const resetSettings = (): ResetSettingsAction => ({
  type: 'RESET_SETTINGS',
});

const appStartedEpic = (action$: any, deps: Deps) => {
  const { firebaseAuth } = deps;

  const onAuth$ = Observable.create(observer => {
    const unsubscribe = firebaseAuth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        firebaseAuth()
          .currentUser.getIdToken(true)
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

export const resetSettingsEpic = (action$: any) => {
  return action$
    .filter(action => action.type === 'RESET_SETTINGS')
    .mapTo(appSuccess('Settings has been reset'));
};

export const epics = [appStartedEpic, resetSettingsEpic];
