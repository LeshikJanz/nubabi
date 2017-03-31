import { Observable } from 'rxjs/Observable';
import { Action, Deps } from '../types';
import api from '../connectors/mlb';

export function getBabiesRequest(): Action {
  return {
    type: 'GET_BABIES_REQUEST',
  };
}

export function getBabiesSuccess(babies): Action {
  return {
    type: 'GET_BABIES_SUCCESS',
    payload: babies,
  };
}

export function getBabiesFailure(err): Action {
  return {
    type: 'GET_BABIES_FAILURE',
    payload: err,
    error: true,
  };
}

export function getThisWeeksActivitiesSuccess(babies): Action {
  return {
    type: 'GET_THIS_WEEKS_ACTIVITIES_SUCCESS',
    payload: babies,
  };
}

export function getThisWeeksActivitiesFailure(err): Action {
  return {
    type: 'GET_THIS_WEEKS_ACTIVITIES_FAILURE',
    payload: err,
    error: true,
  };
}

const fetchBabiesEpic = (action$: any, { getState }: Deps) => (
  action$
    .filter((action: Action) => action.type === 'GET_BABIES_REQUEST')
    .mergeMap(() => {
      return Observable.fromPromise(api.getBabies(getState().auth.token))
        .map(response => getBabiesSuccess(response))
        .catch((err) => Observable.of(getBabiesFailure(err)));
    })
);

const fetchThisWeekActivitiesEpic = (action$: any, { getState }: Deps) => (
  action$
    .filter((action: Action) => action.type === 'GET_THIS_WEEKS_ACTIVITIES_REQUEST')
    .mergeMap(() => (
      Observable
        .fromPromise(api.getThisWeeksActivities(api.getBabies(getState().auth.token)))
        .map(response => getThisWeeksActivitiesSuccess(response))
        .catch(err => Observable.of(getThisWeeksActivitiesFailure(err)))
    ),
  )
);

export const epics = [fetchBabiesEpic, fetchThisWeekActivitiesEpic];
