import * as types from '../actions/actionTypes';

const babies = {
  babies: [],
};

export default function babyReducer(state = babies, action) {
  switch (action.type) {
    case types.GET_BABIES.REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.GET_BABIES.SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        failure: false,
        babies: action.babies,
        index: 0,
      });
    default:
      return state;
  }
}
