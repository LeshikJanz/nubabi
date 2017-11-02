// @flow
import type { Action, Deps } from "./types";
import "rxjs/add/operator/map";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/mapTo";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/withLatestFrom";
import "rxjs/add/operator/take";
import "rxjs/add/observable/from";
import "rxjs/add/observable/fromPromise";
import "rxjs/add/observable/merge";
import "rxjs/add/observable/of";
import "rxjs/add/observable/zip";
import { combineEpics } from "redux-observable";
import { epics as appEpics } from "./app/actions";
import { epics as authEpics } from "./auth/actions";
import { epics as babyEpics } from "./babies/actions";

type Epic = (action$: any, deps: Deps) => Observable<Action>;

const commonEpics = [...appEpics, ...authEpics, ...babyEpics];

const configureEpics = (deps: Object, platformEpics: Array<Epic>) => (
  action$: any,
  { getState }: any
) => {
  const epics = [...commonEpics, ...platformEpics];

  return combineEpics(...epics)(action$, { ...deps, getState });
};

export default configureEpics;
