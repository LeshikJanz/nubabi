import { NavigationExperimental } from 'react-native';
import { CHANGE_TAB } from '../constants/actionTypes';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const tabRoutes = {
  index: 2,
  routes: [
    { key: 'stimulation', icon: 'stimulation', title: 'Stimulation' },
    { key: 'growth', icon: 'growth', title: 'Growth' },
    { key: 'profile', title: 'Profile' },
    { key: 'library', icon: 'library', title: 'Library' },
    { key: 'memories', icon: 'memories', title: 'Memories' },
  ],
};

export default function navigation(state = tabRoutes, action) {
  switch (action.type) {
    case CHANGE_TAB: {
      return NavigationStateUtils.jumpToIndex(state, action.index);
    }

    default:
      return state;
  }
}
