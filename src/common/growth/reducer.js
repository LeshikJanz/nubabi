// @flow
import type { GrowthState, SeenGrowthGlobalIntroAction } from '../types';

type Action = SeenGrowthGlobalIntroAction;

export const initialState = {
  hasSeenGlobalIntro: false,
};

export const skipGrowthGlobalIntro = (
  seen = true,
): SeenGrowthGlobalIntroAction => {
  return {
    type: 'GROWTH_SEEN_GLOBAL_INTRO',
    payload: seen,
  };
};

function reducer(state: GrowthState = initialState, action: Action) {
  switch (action.type) {
    case 'GROWTH_SEEN_GLOBAL_INTRO': {
      return {
        ...state,
        hasSeenGlobalIntro: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
