// @flow
import type { Action, Deps } from './types';
import 'rxjs';
import { combineEpics } from 'redux-observable';
import { epics as appEpics } from './app/actions';
import { epics as authEpics } from './auth/actions';
import { epics as babyEpics } from './babies/actions';

type Epic = (action$: any, deps: Deps) => Observable<Action>;

const commonEpics = [...appEpics, ...authEpics, ...babyEpics];

const configureEpics = (deps: Object, platformEpics: Array<Epic>) => (
  action$: any,
  { getState }: any,
) => {
  const epics = [...commonEpics, ...platformEpics];

  return combineEpics(...epics)(action$, { ...deps, getState });
};

export default configureEpics;
