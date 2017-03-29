import React, { PureComponent } from 'react';
// $FlowFixMe
import {
  createNavigationContainer,
  createNavigator,
  StackRouter,
  CardStack,
} from 'react-navigation';

import type { NavigationRouteConfigMap } from 'react-navigation/src/TypeDefinition'; // $FlowFixMe
import { merge } from 'lodash';
import sharedElements from './transitioners/MaterialSharedElementTransitioner';
import crossFade from './transitioners/CrossFadeTransitioner';
import android from './transitioners/AndroidDefaultTransitioner';
import chooseBaby from './transitioners/ChooseBabyTransitioner';

import SplashScreen from './SplashScreen';
import TabsNavigator from './TabsNavigator';
import ChooseBaby from '../profile/ChooseBaby';
import Settings from '../settings';
import EditBaby from '../profile/EditBaby';
import ThisWeeksActivities from '../stimulation/ThisWeeksActivities';
import NextWeeksEquipment from '../stimulation/NextWeeksEquipment';
import BrowseActivities from '../stimulation/BrowseActivities';
import ViewThisWeeksActivity from '../stimulation/ViewThisWeeksActivity';
import Login from '../login';
import theme from '../../common/themes/defaultTheme';

export type TransitionName =
  | 'cardStack'
  | 'materialSharedElement'
  | 'crossFade'
  | 'androidDefault'
  | 'chooseBaby';

type State = {
  transition: TransitionName,
  duration: number,
};

class TransitionerSwitcher extends PureComponent {
  state: State;

  // For simplicity, we use context to pass these functions to children
  // We will be moving to having this managed on Redux
  static childContextTypes = {
    setActiveTransition: React.PropTypes.func,
    getActiveTransition: React.PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      transition: 'cardStack',
      duration: 300,
    };
  }

  getChildContext() {
    const self = this;

    return {
      setActiveTransition(transition: TransitionName, callback) {
        return self.setState({ transition }, callback);
      },
      getActiveTransition(): TransitionName {
        return self.state.transition;
      },
    };
  }

  render() {
    const transitionMap = {
      cardStack: CardStack,
      materialSharedElement: sharedElements,
      crossFade,
      androidDefault: android,
      chooseBaby,
    };

    const Transitioner = transitionMap[this.state.transition || 'cardStack'];

    return <Transitioner {...this.props} />;
  }
}

const createCustomNavigator = (
  routeConfigMap: NavigationRouteConfigMap, config) => {
  const {
    containerOptions,
    initialRouteName,
    initialRouteParams,
    paths,
    headerComponent,
    headerMode,
    mode,
    cardStyle,
    onTransitionStart,
    onTransitionEnd,
    navigationOptions,
  } = config;

  const routerConfig = {
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions,
  };

  const router = StackRouter(routeConfigMap, routerConfig);

  return createNavigationContainer(createNavigator(router)(props => (
    <TransitionerSwitcher
      {...props}
      headerComponent={headerComponent}
      headerMode={headerMode}
      mode={mode}
      cardStyle={cardStyle}
      onTransitionStart={onTransitionStart}
      onTransitionEnd={onTransitionEnd}
    />
  )), containerOptions);
};

const routes = {
  chooseBaby: { screen: ChooseBaby, mode: 'modal' },
  editBaby: { screen: EditBaby },
  thisWeekActivities: { screen: ThisWeeksActivities },
  nextWeeksEquipment: { screen: NextWeeksEquipment },
  browseActivities: { screen: BrowseActivities },
  viewThisWeeksActivity: { screen: ViewThisWeeksActivity },
  settings: { screen: Settings },
};

const AppNavigator = createCustomNavigator({
  splash: { screen: SplashScreen },
  login: { screen: Login },
  home: { screen: TabsNavigator },
  ...routes,
}, {
  headerMode: 'float',
  navigationOptions: {
    header: (navigation, childRouter) => {
      const options = {
        tintColor: theme.colors.black,
        backTitle: 'Back',
        style: {
          backgroundColor: theme.colors.white,
        },
      };

      return childRouter ? merge({}, options, childRouter) : options;
    },
  },

});

export default AppNavigator;
