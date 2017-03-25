import { Action } from '../types';

export function getBabiesRequest(token): Action {
  return {
    type: 'GET_BABIES_REQUEST',
    meta: {
      token,
    },
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

export function getThisWeeksActivitiesRequest(token): Action {
  return {
    type: 'GET_THIS_WEEKS_ACTIVITIES_REQUEST',
    meta: {
      token,
    },
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
