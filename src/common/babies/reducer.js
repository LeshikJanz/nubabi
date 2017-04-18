// @flow
import type { Action, BabyState } from '../types';

export const initialState = {
  isFetching: false,
  failure: false,
  currentBabyId: null,
};

const reducer = (
  state: BabyState = initialState,
  action: Action,
): BabyState => {
  switch (action.type) {
    case 'GET_BABIES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'GET_BABIES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        failure: false,
        currentBabyId: state.currentBabyId || action.payload[0].id,
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
