// @flow
import { StimulationButtonType } from 'web/types/custom';

export const ACTIVITY_BUTTONS: StimulationButtonType[] = [
  {
    type: 'tooDifficult',
    icon: 'icon-not-ready',
    mainText: 'TOO DIFFICULT',
    additionalText: 'Not quite ready for this',
    callback: 'changeActivityLevel',
    level: 'DECREASE',
  },
  {
    type: 'done',
    icon: 'icon-done',
    mainText: 'MARK AS DONE',
    additionalText: "Tick if you've completed it",
    callback: 'completeActivity',
  },
  {
    type: 'tooEase',
    icon: 'icon-too-ease',
    mainText: 'TOO EASE',
    additionalText: 'Increase the level',
    callback: 'changeActivityLevel',
    level: 'INCREASE',
  },
];

export const ACTIVITY_FILTERS = {
  favorites: 'favorites',
  activities: 'activities',
  history: 'history',
  weeks: 'weeks',
};

export const INDOOR_CATEGORY_ID = 1;
export const OUTDOOR_CATEGORY_ID = 2;
