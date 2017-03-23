import { NavigationExperimental } from 'react-native';
import {
  POP_ROUTE,
  PUSH_ROUTE,
  TOGGLE_CHOOSE_BABY_MODAL,
} from '../../common/actionTypes';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const navigationRoutes = {
  chooseBabyModalVisible: false,
  index: 0,
  routes: [
    {
      key: 'tabs',
    },
  ],
};

export default function navigation(state = navigationRoutes, action) {
  switch (action.type) {
    case POP_ROUTE: {
      return NavigationStateUtils.pop(state);
    }

    case PUSH_ROUTE: {
      return NavigationStateUtils.push(state, action.route);
    }

    case TOGGLE_CHOOSE_BABY_MODAL: {
      return Object.assign({}, state, {
        chooseBabyModalVisible: !state.chooseBabyModalVisible,
      });
    }

    default:
      return state;
  }
}
