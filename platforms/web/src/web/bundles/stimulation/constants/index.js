// @flow
import { StimulationButtonType } from '../../../types/custom';

export const STIMULATION_BUTTONS = [
  {
    id: 1,
    icon: 'icon-puzzle',
    text: `Week's activities`,
    redirect: '/stimulation/weeks',
  },
  {
    id: 2,
    icon: 'icon-favorite',
    text: 'View Favorites',
    redirect: '/stimulation/favorites',
  },
  {
    id: 3,
    icon: 'icon-activity',
    text: 'Browse Activities',
    redirect: '/stimulation/browse',
  },
  {
    id: 4,
    icon: 'icon-history',
    text: 'Activity History',
    redirect: '/stimulation/history',
  },
];

export const ACTIVITY_BUTTONS: StimulationButtonType[] = [
  {
    id: 1,
    type: 'tooDifficult',
    icon: 'icon-not-ready',
    mainText: 'TOO DIFFICULT',
    additionalText: 'Not quite ready for this',
    callback: 'changeActivityLevel',
    level: 'DECREASE',
  },
  {
    id: 2,
    type: 'done',
    icon: 'icon-done',
    mainText: 'MARK AS DONE',
    additionalText: "Tick if you've completed it",
    callback: 'completeActivity',
  },
  {
    id: 3,
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
