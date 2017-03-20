import * as types from './actionTypes';

export function getBabiesRequest(token) {
  return {
    type: types.GET_BABIES.REQUEST,
    token,
  };
}

export function getBabiesSuccess(babies) {
  return {
    type: types.GET_BABIES.SUCCESS,
    babies,
  };
}

export function getBabiesFailure(err) {
  return {
    type: types.GET_BABIES.FAILURE,
    err,
  };
}

export function getThisWeeksActivitiesRequest(token) {
  return {
    type: types.GET_THIS_WEEKS_ACTIVITIES.REQUEST,
    token,
  };
}

export function getThisWeeksActivitiesSuccess(babies) {
  return {
    type: types.GET_THIS_WEEKS_ACTIVITIES.SUCCESS,
    babies,
  };
}

export function getThisWeeksActivitiesFailure(err) {
  return {
    type: types.GET_THIS_WEEKS_ACTIVITIES.FAILURE,
    err,
  };
}
