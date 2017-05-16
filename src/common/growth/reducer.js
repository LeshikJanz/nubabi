// @flow
import type {
  Growth,
  GrowthState,
  AgeDuration,
  SeenGrowthGlobalIntroAction,
} from '../types';
import moment from 'moment';

type Action = SeenGrowthGlobalIntroAction;

export const initialState = {
  hasSeenGlobalIntro: false,
};

export const skipGrowthGlobalIntro = (
  seen: boolean = true,
): SeenGrowthGlobalIntroAction => {
  return {
    type: 'GROWTH_SEEN_GLOBAL_INTRO',
    payload: seen,
  };
};

export const getClosestContentForPeriod = (
  content: Array<Growth>,
  dobString: string,
) => {
  const dob = moment(dobString);
  const ageInWeeks = moment().diff(dob, 'weeks');

  let result;

  result = findContent('WEEK', ageInWeeks, content);

  if (result) {
    return result;
  }

  const ageInMonths = moment().diff(dob, 'months');
  result = findContent('MONTH', ageInMonths, content);

  if (result) {
    return result;
  }

  const ageInYears = moment().diff(dob, 'years');
  result = findContent('YEAR', ageInYears, content);

  return result;
};

const findContent = (
  ageDuration: AgeDuration,
  currentAge: number,
  collection: Array<Growth>,
) => {
  return collection.find((element: Growth) => {
    return element.ageDuration === ageDuration &&
      element.minimumAge >= currentAge &&
      element.maximumAge <= currentAge;
  });
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
