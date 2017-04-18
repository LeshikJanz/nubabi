import type { ViewerState, Action } from '../types';

export const initialState = null;

const reducer = (
  state: ViewerState = initialState,
  action: Action,
): ViewerState => {
  switch (action.type) {
    case 'ON_AUTH': {
      return action.payload.user || null;
    }

    default: {
      return state;
    }
  }
};

export default reducer;
