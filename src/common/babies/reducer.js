// @flow
import type { Action, BabyState } from '../types';

const initialState = {
  items: [],
  isFetching: false,
  failure: false,
  index: null,
};

const reducer = (state: BabyState = initialState, action: Action): BabyState => {
  switch (action.type) {
    case 'GET_BABIES_REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'GET_BABIES_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        failure: false,
        items: action.payload,
        index: 0,
      });
    case 'GET_BABIES_FAILURE': {
      return Object.assign({}, state, {
        isFetching: false,
        failure: true,
        items: [],
        index: null,
      });
    }
    default:
      return state;
  }
};

export default reducer;
