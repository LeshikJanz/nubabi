import { Observable } from 'rxjs/Observable';
import { Action, Deps, MutationResultAction } from '../types';
import api from '../connectors/mlb';
import { resetNavigation } from '../../native/navigation/actions';

export function selectBaby(id): Action {
  return {
    type: 'SELECT_BABY',
    payload: id,
  };
}

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

const createBabyEpic = (action$: any) => {
  return action$
    .filter((action: MutationResultAction) => {
      return action.type === 'APOLLO_MUTATION_RESULT' &&
        action.operationName === 'CreateBaby';
    })
    .mergeMap(({ result: { data } }) => {
      if (data.createBaby) {
        const id = data.createBaby.createdBaby.id;
        //
        return [selectBaby(id), resetNavigation('home')];
      }

      return Observable.of(null);
    });
};

const fetchThisWeekActivitiesEpic = (action$: any, { getState }: Deps) =>
  action$
    .filter(
      (action: Action) => action.type === 'GET_THIS_WEEKS_ACTIVITIES_REQUEST',
    )
    .mergeMap(() =>
      Observable.fromPromise(
        api.getThisWeeksActivities(api.getBabies(getState().auth.token)),
      )
        .map(response => getThisWeeksActivitiesSuccess(response))
        .catch(err => Observable.of(getThisWeeksActivitiesFailure(err))));

export const epics = [fetchThisWeekActivitiesEpic, createBabyEpic];
