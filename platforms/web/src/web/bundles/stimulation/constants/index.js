// @flow
import { IStimulationButton } from 'web/types/custom';
import { ACTIVITY_FILTERS } from '../components/constants/index';

export const STIMULATION_BUTTONS: IStimulationButton[] = [
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
