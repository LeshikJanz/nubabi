// @flow
import { Action } from 'core/types/types';

export function getBabySuccess(babies): Action {
  return {
    type: 'GET_BABIES_SUCCESS',
    payload: babies,
  };
}

export function getBabyFailure(err): Action {
  return {
    type: 'GET_BABIES_FAILURE',
    payload: err,
    error: true,
  };
}
