// @flow
import type { ViewerState, Action } from '../types';

export const initialState = null;

const reducer = (state: ?ViewerState = initialState, action: Action) => {
  switch (action.type) {
    case 'ON_AUTH': {
      return action.payload.user;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
