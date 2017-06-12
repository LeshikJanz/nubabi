// @flow
import React, { PureComponent } from 'react';
import { Platform, Linking, BackHandler } from 'react-native';
import {
  NavigationActions,
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
import theme from '../../common/themes/defaultTheme';
import sharedElements from './transitioners/MaterialSharedElementTransitioner';
import crossFade from './transitioners/CrossFadeTransitioner';
import android from './transitioners/AndroidDefaultTransitioner';
import chooseBaby from './transitioners/ChooseBabyTransitioner';
import TabsNavigator from './TabsNavigator';

import SplashScreen from './SplashScreen';
import LoginScreen from '../login/LoginScreen';
import SettingsScreen from '../settings/SettingsScreen';
import ChooseBabyScreen from '../profile/ChooseBabyScreen';
import AddBaby from '../profile/EditBaby/AddBaby';
import EditBaby from '../profile/EditBaby/EditBaby';
import ThisWeeksActivities from '../stimulation/ThisWeeksActivities';
import NextWeeksEquipment from '../stimulation/NextWeeksEquipment';
import BrowseActivitiesScreen from '../stimulation/BrowseActivitiesScreen';
import BrowseActivitiesListScreen
  from '../stimulation/BrowseActivitiesListScreen';
import ViewThisWeeksActivity from '../stimulation/ViewThisWeekActivity';
import BrowseArticlesScreen from '../library/BrowseArticlesScreen';
import UpdateWeightScreen from '../profile/EditBaby/UpdateWeightScreen';
import UpdateHeightScreen from '../profile/EditBaby/UpdateHeightScreen';

import FavoriteActivities from '../stimulation/Favorites';
import ViewActivity from '../stimulation/ViewActivity';
import NavigatorTypes from 'react-navigation/src/navigators/NavigatorTypes';
import { WhatYouNeedToKnowScreen } from '../growth/WhatYouNeedToKnowScreen';
import DevelopmentRoadmapScreen from '../growth/DevelopmentRoadmapScreen';
import ViewGrowthContentScreen from '../growth/ViewGrowthArticleScreen';
import ViewArticleScreen from '../library/ViewArticleScreen';
import ActivityMediaScreen from '../stimulation/ActivityMediaScreen';
import ParentingTipsScreen from '../library/ParentingTipsScreen';
import HealthHelpScreen from '../library/HealthHelpScreen';

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

// on Android, the URI prefix typically contains a host in addition to scheme
const uriPrefix = Platform.OS === 'android' ? 'nubabi://nubabi/' : 'nubabi://';

const routes = {
  settings: { screen: SettingsScreen },
  chooseBaby: { screen: ChooseBabyScreen, mode: 'modal' },
  addBaby: { screen: AddBaby },
  editBaby: { screen: EditBaby },
  updateHeight: { screen: UpdateHeightScreen },
  updateWeight: { screen: UpdateWeightScreen },
  thisWeekActivities: { screen: ThisWeeksActivities },
  favoriteActivities: { screen: FavoriteActivities },
  nextWeeksEquipment: { screen: NextWeeksEquipment },
  browseActivities: { screen: BrowseActivitiesScreen },
  browseActivitiesList: { screen: BrowseActivitiesListScreen },
  viewActivity: { screen: ViewActivity },
  viewThisWeeksActivity: { screen: ViewThisWeeksActivity },
  whatYouNeedToKnow: { screen: WhatYouNeedToKnowScreen },
  developmentRoadmap: { screen: DevelopmentRoadmapScreen },
  viewGrowthContent: {
    screen: ViewGrowthContentScreen,
    path: 'content/growth/:id',
  },
  browseArticles: { screen: BrowseArticlesScreen },
  viewArticle: {
    screen: ViewArticleScreen,
    path: 'articles/:id',
  },
  viewActivityMedia: { screen: ActivityMediaScreen },
  parentingTips: { screen: ParentingTipsScreen },
  healthHelp: { screen: HealthHelpScreen },
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

  const container = createNavigationContainer(navigator, containerOptions);
  container.router = router;
  return container;
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

// So that we can handle deep linking
// See: https://github.com/react-community/react-navigation/issues/1189
class AppNavigatorWithLinking extends AppNavigator {
  componentDidMount() {
    this.subs = BackHandler.addEventListener('hardwareBackPress', () =>
      this.dispatch(NavigationActions.back()),
    );

    Linking.addEventListener('url', ({ url }: { url: string }) => {
      this._handleOpenURL(url);
    });

    Linking.getInitialURL().then(
      (url: string) => url && this._handleOpenURL(url),
    );
  }

  _urlToPathAndParams(url: string) {
    const params = {};
    const delimiter = uriPrefix || '://';
    let path = url.split(delimiter)[1];
    if (!path) {
      path = url;
    }
    return {
      path,
      params,
    };
  }

  _handleOpenURL = (url: string) => {
    const parsedUrl = this._urlToPathAndParams(url);
    if (parsedUrl) {
      const { path, params } = parsedUrl;
      // Use router static set above
      const action = AppNavigator.router.getActionForPathAndParams(
        path,
        params,
      );
      const state = AppNavigator.router.getStateForAction(action);
      // TODO: handle case when opened URI is the current URI
      if (action) {
        // Use navigation from props
        this.props.navigation.dispatch(action);
      }
    }
  };
}

export default AppNavigatorWithLinking;
