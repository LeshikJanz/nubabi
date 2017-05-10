// @flow
import type {
  State,
  GrowthState,
  SeenGrowthGlobalIntroAction,
  SkipGrowthIntroductionAction,
} from '../types';

import { createSelector } from 'reselect';
import { identity } from 'ramda';
type Action = SeenGrowthGlobalIntroAction | SkipGrowthIntroductionAction;

export const initialState = {
  hasSeenGlobalIntro: false,
  skippedIntroductions: [],
};

export const skipGrowthGlobalIntro = (
  seen: boolean = true,
): SeenGrowthGlobalIntroAction => {
  return {
    type: 'GROWTH_SEEN_GLOBAL_INTRO',
    payload: seen,
  };
};

export const growth = (state: State) => state.growth;

export const shouldShowGlobalIntro = createSelector(
  growth,
  (state: GrowthState) => state.hasSeenGlobalIntro,
);

export const skippedIntroductions = createSelector(
  growth,
  (state: GrowthState) => state.skippedIntroductions,
);

export const shouldShowIntroduction = createSelector(
  skippedIntroductions,
  (_, props) => props.current.key,
  (skipped, current) => !skipped.includes(current),
);

export const currentPeriod = (_, props) => props.current.key;

export const makeShouldShowIntroductionSelector = () => {
  return createSelector(
    [skippedIntroductions, currentPeriod],
    (skipped, current) => {
      return !skipped.includes(current);
    },
  );
};

export const skipIntroduction = (id: string): SkipGrowthIntroductionAction => {
  return {
    type: 'GROWTH_SKIP_INTRODUCTION',
    payload: id,
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
    case 'GROWTH_SKIP_INTRODUCTION': {
      return {
        ...state,
        skippedIntroductions: [...state.skippedIntroductions, action.payload],
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;
