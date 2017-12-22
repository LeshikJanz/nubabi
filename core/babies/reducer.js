// @flow
import type { Action, BabyState } from '../types';
import { path } from 'ramda';

export const initialState = {
  isFetching: false,
  failure: false,
  currentBabyId: null,
  currentBabyPhoto: null,
};

const reducer = (
  state: BabyState = initialState,
  action: Action,
): BabyState => {
  switch (action.type) {
    case 'SET_BABY_PHOTO':
      return Object.assign({}, state, {
        currentBabyPhoto: action.payload,
      });
    case 'GET_BABIES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'GET_BABIES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        failure: false,
        currentBabyId:
          state.currentBabyId || path(['payload', '0', 'id'], action),
      });
    case 'GET_BABIES_FAILURE': {
      return Object.assign({}, state, {
        isFetching: false,
        failure: true,
      });
    }
    case 'SELECT_BABY': {
      return {
        ...state,
        currentBabyId: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reducer;
