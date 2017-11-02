// @flow
import type {
  Growth,
  GrowthState,
  AgeDuration,
  SeenGrowthGlobalIntroAction
} from "../types";
import differenceInWeeks from "date-fns/difference_in_weeks";
import differenceInYears from "date-fns/difference_in_years";
import differenceInMonths from "date-fns/difference_in_months";
import parse from "date-fns/parse";
import prop from "ramda/src/prop";
import merge from "ramda/src/merge";

type Action = SeenGrowthGlobalIntroAction;

export const initialState = {
  hasSeenGlobalIntro: false
};

export const skipGrowthGlobalIntro = (
  seen: boolean = true
): SeenGrowthGlobalIntroAction => {
  return {
    type: "GROWTH_SEEN_GLOBAL_INTRO",
    payload: seen
  };
};

export const getClosestContentForPeriod = (
  content: Array<Growth>,
  dobString: string
) => {
  const dob = new parse(dobString);
  const ageInWeeks = differenceInWeeks(Date.now(), dob);

  let result;

  result = findContent("WEEK", ageInWeeks, content);

  if (result) {
    return result;
  }

  const ageInMonths = differenceInMonths(Date.now(), dob);
  result = findContent("MONTH", ageInMonths, content);

  if (result) {
    return result;
  }

  const ageInYears = differenceInYears(Date.now(), dob);
  result = findContent("YEAR", ageInYears, content);

  return result;
};

const findContent = (
  ageDuration: AgeDuration,
  currentAge: number,
  collection: Array<Growth>
) => {
  return collection.find((element: Growth) => {
    const isRaw = typeof element["age_duration"] !== "undefined";
    const minimumAge = prop(isRaw ? "age_min" : "minimumAge")(element);
    const maximumAge = prop(isRaw ? "age_max" : "maximumAge")(element);
    const contentAgeDuration = isRaw
      ? prop("age_duration", element).toUpperCase()
      : prop("ageDuration", element);

    return (
      contentAgeDuration === ageDuration &&
      minimumAge >= currentAge &&
      maximumAge <= currentAge
    );
  });
};

function reducer(state: GrowthState = initialState, action: Action) {
  switch (action.type) {
    case "GROWTH_SEEN_GLOBAL_INTRO": {
      return merge(state, {
        hasSeenGlobalIntro: action.payload
      });
    }
    case "RESET_TIPS": {
      return merge(state, { hasSeenGlobalIntro: false });
    }
    default: {
      return state;
    }
  }
}

export default reducer;
