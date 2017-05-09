import React, { PureComponent } from 'react';
// $FlowFixMe
import {
  createNavigationContainer,
  createNavigator,
  StackRouter,
} from 'react-navigation';
import CardStackTransitioner
  from 'react-navigation/src/views/CardStackTransitioner';

import type {
  NavigationRouteConfigMap,
} from 'react-navigation/src/TypeDefinition'; // $FlowFixMe
import { merge } from 'lodash';
import sharedElements from './transitioners/MaterialSharedElementTransitioner';
import crossFade from './transitioners/CrossFadeTransitioner';
import android from './transitioners/AndroidDefaultTransitioner';
import chooseBaby from './transitioners/ChooseBabyTransitioner';

import SplashScreen from './SplashScreen';
import TabsNavigator from './TabsNavigator';
import ChooseBabyScreen from '../profile/ChooseBabyScreen';
import Settings from '../settings/Settings';
import AddBaby from '../profile/EditBaby/AddBaby';
import EditBaby from '../profile/EditBaby/EditBaby';
import ThisWeeksActivities from '../stimulation/ThisWeeksActivities';
import NextWeeksEquipment from '../stimulation/NextWeeksEquipment';
import BrowseActivities from '../stimulation/BrowseActivities';
import ViewThisWeeksActivity from '../stimulation/ViewThisWeekActivity';
import LoginScreen from '../login/LoginScreen';

import theme from '../../common/themes/defaultTheme';
import FavoriteActivities from '../stimulation/Favorites';
import ViewActivity from '../stimulation/ViewActivity';
import NavigatorTypes from 'react-navigation/src/navigators/NavigatorTypes';
import { WhatYouNeedToKnowScreen } from '../growth/WhatYouNeedToKnowScreen';
import DevelopmentRoadmapScreen from '../growth/DevelopmentRoadmapScreen';

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
      cardStack: CardStackTransitioner,
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
  routeConfigMap: NavigationRouteConfigMap,
  config,
) => {
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
  const view = props => {
    return (
      <TransitionerSwitcher
        {...props}
        router={router}
        headerComponent={headerComponent}
        headerMode={headerMode}
        mode={mode}
        cardStyle={cardStyle}
        onTransitionStart={onTransitionStart}
        onTransitionEnd={onTransitionEnd}
      />
    );
  };

  view.displayName = 'AppNavigator';

  const navigator = createNavigator(
    router,
    routeConfigMap,
    config,
    NavigatorTypes.STACK,
  )(view);

  return createNavigationContainer(navigator, containerOptions);
};

const routes = {
  chooseBaby: { screen: ChooseBabyScreen, mode: 'modal' },
  addBaby: { screen: AddBaby },
  editBaby: { screen: EditBaby },
  thisWeekActivities: { screen: ThisWeeksActivities },
  favoriteActivities: { screen: FavoriteActivities },
  nextWeeksEquipment: { screen: NextWeeksEquipment },
  browseActivities: { screen: BrowseActivities },
  viewActivity: { screen: ViewActivity },
  viewThisWeeksActivity: { screen: ViewThisWeeksActivity },
  whatYouNeedToKnow: { screen: WhatYouNeedToKnowScreen },
  developmentRoadmap: { screen: DevelopmentRoadmapScreen },
  settings: { screen: Settings },
};

const AppNavigator = createCustomNavigator(
  {
    splash: { screen: SplashScreen },
    login: { screen: LoginScreen },
    home: { screen: TabsNavigator },
    ...routes,
  },
  {
    headerMode: 'float',
    // TODO: ensure child options get preserved
    navigationOptions: ({ navigationOptions }) => {
      // console.log('APP NAVIGATOR', args);
      return {
        headerBackTitle: 'Back',
        headerTintColor: theme.colors.black,
        headerStyle: {
          backgroundColor: theme.colors.white,
          ...navigationOptions.headerStyle,
        },
      };
    },
  },
);

export default AppNavigator;
