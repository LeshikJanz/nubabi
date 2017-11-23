// @flow
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, Linking, Platform } from 'react-native';
import {
  createNavigationContainer,
  createNavigator,
  NavigationActions,
  StackRouter,
} from 'react-navigation';
import CardStackTransitioner from 'react-navigation/src/views/CardStackTransitioner';

import type { NavigationRouteConfigMap } from 'react-navigation/src/TypeDefinition'; // $FlowFixMe
import theme from 'core/themes/defaultTheme';
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
import BrowseActivitiesListScreen from '../stimulation/BrowseActivitiesListScreen';
import ViewThisWeeksActivity from '../stimulation/ViewThisWeekActivity';
import ActivityHistoryScreen from '../stimulation/ActivityHistoryScreen';
import ActivityHistoryDetailScreen from '../stimulation/ActivityHistoryDetailScreen';
import BrowseArticlesScreen from '../library/BrowseArticlesScreen';
import UpdateWeightScreen from '../profile/EditBaby/UpdateWeightScreen';
import UpdateHeightScreen from '../profile/EditBaby/UpdateHeightScreen';

import FavoriteActivities from '../stimulation/Favorites';
import ViewActivity from '../stimulation/ViewActivity';
import NavigatorTypes from 'react-navigation/src/navigators/NavigatorTypes';
import { WhatYouNeedToKnowScreen } from '../growth/WhatYouNeedToKnowScreen';
import ViewGrowthContentScreen from '../growth/ViewGrowthArticleScreen';
import ViewArticleScreen from '../library/ViewArticleScreen';
import ActivityMediaScreen from '../stimulation/ActivityMediaScreen';
import ParentingTipsScreen from '../library/ParentingTipsScreen';
import HealthHelpScreen from '../library/HealthHelpScreen';
import GraphDetailScreen from '../growth/GraphDetailScreen';
import ViewMemoryScreen from '../memories/ViewMemoryScreen';
import AddMemoryScreen from '../memories/AddMemoryScreen';
import EditMemoryScreen from '../memories/EditMemoryScreen';
import VoiceRecordingScreen from '../memories/VoiceRecordingScreen';
import StickersScreen from '../memories/StickersScreen';
import NotificationSettingsScreen from '../settings/NotificationSettingsScreen';
import EditUserProfileScreen from '../settings/EditUserProfileScreen';
import FriendsScreen from '../settings/FriendsScreen';
import InviteUserScreen from '../settings/InviteUserScreen';
import GalleryScreen from '../components/GalleryScreen';
import NotificationsScreen from '../notifications/NotificationsScreen';

export type TransitionName =
  | 'cardStack'
  | 'materialSharedElement'
  | 'crossFade'
  | 'androidDefault'
  | 'chooseBaby';

type State = {
  transition: TransitionName,
};

// on Android, the URI prefix typically contains a host in addition to scheme
const uriPrefix = Platform.OS === 'android' ? 'nubabi://nubabi/' : 'nubabi://';

const routes = {
  // Settings
  settings: { screen: SettingsScreen },
  notifications: { screen: NotificationsScreen },
  notificationSettings: { screen: NotificationSettingsScreen },
  friends: { screen: FriendsScreen },
  inviteUser: { screen: InviteUserScreen },
  chooseBaby: { screen: ChooseBabyScreen, mode: 'modal' },
  editUser: { screen: EditUserProfileScreen },
  // Profile
  addBaby: { screen: AddBaby },
  editBaby: { screen: EditBaby },
  updateHeight: { screen: UpdateHeightScreen },
  updateWeight: { screen: UpdateWeightScreen },
  graphDetail: { screen: GraphDetailScreen },
  // Stimulation
  thisWeekActivities: { screen: ThisWeeksActivities },
  favoriteActivities: { screen: FavoriteActivities },
  nextWeeksEquipment: { screen: NextWeeksEquipment },
  browseActivities: { screen: BrowseActivitiesScreen },
  browseActivitiesList: { screen: BrowseActivitiesListScreen },
  viewActivity: { screen: ViewActivity },
  viewThisWeeksActivity: { screen: ViewThisWeeksActivity },
  viewActivityMedia: { screen: ActivityMediaScreen },
  activityHistory: { screen: ActivityHistoryScreen },
  activityHistoryDetail: { screen: ActivityHistoryDetailScreen },
  // Growth
  whatYouNeedToKnow: { screen: WhatYouNeedToKnowScreen },
  viewGrowthContent: {
    screen: ViewGrowthContentScreen,
    path: 'content/growth/:id',
  },
  browseArticles: { screen: BrowseArticlesScreen },
  viewArticle: {
    screen: ViewArticleScreen,
    path: 'articles/:id',
  },
  parentingTips: { screen: ParentingTipsScreen },
  healthHelp: { screen: HealthHelpScreen },
  // Memories
  addMemory: { screen: AddMemoryScreen },
  viewMemory: {
    screen: ViewMemoryScreen,
    path: 'memories/:id',
  },
  editMemory: {
    screen: EditMemoryScreen,
    path: 'memories/:id/edit',
  },
  voiceRecording: { screen: VoiceRecordingScreen },
  gallery: { screen: GalleryScreen },
  stickers: { screen: StickersScreen, mode: 'modal' },
};

class TransitionerSwitcher extends PureComponent {
  state: State;

  // For simplicity, we use context to pass these functions to children
  // We will be moving to having this managed on Redux
  static childContextTypes = {
    setActiveTransition: PropTypes.func,
    getActiveTransition: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      transition: 'cardStack',
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
      // const state = AppNavigator.router.getStateForAction(action);

      // TODO: handle case when opened URI is the current URI
      if (action) {
        // Use navigation from props
        this.props.navigation.dispatch(action);
      }
    }
  };
}

export default AppNavigatorWithLinking;
