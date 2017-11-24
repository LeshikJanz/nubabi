// @flow
import { Action } from 'core/types/types';
import { Baby } from 'core/types/modelTypes';

export function getBabySuccess(baby: Baby): Action {
  return {
    type: 'GET_BABY_SUCCESS',
    payload: baby,
  };
}

export function getBabyFailure(err): Action {
  return {
    type: 'GET_BABY_FAILURE',
    payload: err,
    error: true,
  };
}
