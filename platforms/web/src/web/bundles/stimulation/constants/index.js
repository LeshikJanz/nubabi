// @flow
import { StimulationButtonType } from '../../../types/custom';

export const ACTIVITY_FILTERS = {
  favorites: 'favorites',
  activities: 'activities',
  history: 'history',
  weeks: 'weeks',
};

export const STIMULATION_BUTTONS = [
  {
    id: 1,
    icon: 'icon-favorite',
    text: 'View Favorites',
    type: ACTIVITY_FILTERS.favorites,
    redirect: '/stimulation/favorites',
  },
  {
    id: 2,
    icon: 'icon-activity',
    text: 'Browse Activities',
    type: ACTIVITY_FILTERS.activities,
    redirect: '/stimulation/browse',
  },
  {
    id: 3,
    icon: 'icon-history',
    text: 'Activity History',
    type: ACTIVITY_FILTERS.history,
    redirect: '/stimulation/history',
  },
];

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

export const INDOOR_CATEGORY_ID = 1;
export const OUTDOOR_CATEGORY_ID = 2;
