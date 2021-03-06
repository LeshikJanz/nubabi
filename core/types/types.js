// @flow
import type { Element } from 'react';

/*
 ******************************************************************************
 * Models                                                                     *
 ******************************************************************************
 */

import type {
  Activity,
  Avatar,
  Baby,
  Expert,
  SkillArea,
  User,
} from './modelTypes';
import type { MutationOpts, QueryOpts as QueryOptsApollo } from 'react-apollo';
import { ApolloClient } from 'apollo-client';

export type { OperationComponent, QueryProps } from 'react-apollo';

export type QueryOpts<T> =
  | (QueryOptsApollo & {
      variables: T | Object,
    })
  | MutationOpts;

export type { Activity, Avatar, User, SkillArea, Baby };
export type {
  ActivityConnection,
  Article,
  File,
  FileConnection,
  FileEdge,
  Image,
  GrowthArticle,
  Memory,
  MemoryConnection,
  Measurement,
} from './modelTypes';
export * from './queryTypes';

export type FirebaseUser = {
  uid: String,
  email: String,
  firstName?: String,
  lastName?: String,
  avatar?: Avatar,
};

export type Viewer = FirebaseUser; // For the time being

export type {
  ApolloQueryResult,
  MutationResultAction,
  InjectedGraphQLDataProps as GraphQLDataProp,
} from './apolloTypes';

/*
 ******************************************************************************
 * Deps                                                                       *
 ******************************************************************************
 */

export type Deps = {
  getState: () => Object,
  now: () => number,
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: Function,
  firebaseSdk: any,
  apollo: typeof ApolloClient,
};

/*
 ******************************************************************************
 * React Navigation                                                           *
 ******************************************************************************
 */

export type Style =
  | { [key: string]: any }
  | number
  | false
  | null
  | void
  | Array<Style>;

type NavigationScreenOptions = {|
  // CardStackOptions
  headerMode?: 'float' | 'screen' | 'none',
  // NavigationScreenOptions
  title?: string | Element<*>,
  // NavigationStackScreenOptions
  headerTitle?: string | Element<*>,
  headerTitleStyle?: Style,
  headerTintColor?: string,
  headerLeft?: Element<*>,
  headerBackTitle?: string,
  headerTruncatedBackTitle?: string,
  headerPressColorAndroid?: string,
  headerRight?: Element<*>,
  headerStyle?: Style,
  headerVisible?: boolean,
  gesturesEnabled?: boolean,
  // NavigationTabScreenOptions
  tabBarIcon?:
    | Element<*>
    | ((options: { tintColor: ?string, focused: boolean }) => ?Element<*>),
  tabBarLabel?:
    | string
    | Element<*>
    | ((options: { tintColor: ?string, focused: boolean }) => ?Element<*>),
  tabBarVisible?: boolean,
|};

type NavigationConfigProp = {
  navigation: NavigationScreenProp<*, *>,
};

// We separate the types to get more descriptive error messages
export type NavigationOptionsGetter = NavigationConfigProp => NavigationScreenOptions;

export type NavigationOptions = NavigationScreenOptions;

export type NavigationProp = NavigationScreenProp<*, *>;

/*
 ******************************************************************************
 * Layout                                                                     *
 ******************************************************************************
 */

export type LayoutProps = {
  viewportWidth: number,
  viewportHeight: number,
  parentWidth: ?number,
  parentHeight: ?number,
};

/*
 ******************************************************************************
 * State                                                                      *
 ******************************************************************************
 */

export type AppState = {
  +error: ?Error,
  +online: boolean,
  +started: boolean,
  +success: ?string,
};

export type ConfigState = {
  +appName: string,
  +appVersion: string,
  +apiUrl: string,
  +firebase: ?Object,
  +sentryUrl: string,
  +graphqlEndpoint: ?string,
};

export type GenericDeviceState = {
  +host: string,
};

export type MobileDeviceState = {
  +isReactNative: true,
  +deviceModel: ?string,
  +deviceId: ?string,
  +appVersion: ?string,
  +systemVersion: ?string,
  +bundleId: ?string,
  +locale: ?string,
  +orientation: 'PORTRAIT' | 'LANDSCAPE' | null,
};

export type DeviceState = GenericDeviceState | MobileDeviceState;

export type BabyState = {
  +isFetching: boolean,
  +failure: boolean,
  +currentBabyId: ?string,
};

export type GrowthState = {
  +hasSeenGlobalIntro: boolean,
};

export type AuthState = {
  +isAuthenticated: boolean,
  +isFetching: boolean,
  +token: ?string,
  +user?: User,
  +errorMessage: ?string,
};

export type ViewerState = {
  +viewer: ?Viewer,
};

export type UnitDisplaySettingsState = {
  +weight: 'kg' | 'lbs',
  +height: 'cm' | 'in',
};

export type NotificationSettingsState = {
  +memories: boolean,
  +stimulation: boolean,
  +growth: boolean,
  +activities: boolean,
  +email: boolean,
};

export type SettingsState = {
  +unitDisplay: UnitDisplaySettingsState,
  +notifications: NotificationSettingsState,
};

export type TabNavigationState = {
  +index: number,
  +routes: Array<mixed>, // TODO: shape
};

export type MobileNavigationState = {
  +chooseBabyModalVisible: boolean,
  +index: number,
  +routes: Array<mixed>, // TODO: shape
};

export type ThisWeekState = {
  +activities: Array<Activity>,
  +experts: Array<Expert>,
  +skillArea: number,
  +skillAreas: Array<SkillArea>,
};

export type UIState = {
  +gallery: {
    +scrollEnabled: boolean,
  },
  +showNetworkIndicator: boolean,
};

export type State = {
  +app: AppState,
  +auth: AuthState,
  +config: ConfigState,
  +babies: BabyState,
  +device: DeviceState,
  +growth: GrowthState,
  +navigation: MobileNavigationState,
  +settings: SettingsState,
  +tabs: TabNavigationState,
  +thisWeek: ThisWeekState,
  +ui: UIState,
  +viewer: ViewerState,
};

/*
 ******************************************************************************
 * Actions                                                                    *
 ******************************************************************************
 */

export type AppStartedAction = { type: 'APP_STARTED' };

export type AppOnlineAction = {
  type: 'APP_ONLINE',
  payload: { online: boolean },
};

export type AppErrorAction = { type: 'APP_ERROR', payload: Error | Object };

export type OnAuthAction = {
  type: 'ON_AUTH',
  payload: { user: ?FirebaseUser, token: ?string },
};

export type AuthProviderEmailData = {
  email: string,
  password: string,
};

export type AuthProviderFacebookData = {
  credential: string,
};

export type AuthProviderData = AuthProviderEmailData | AuthProviderFacebookData;

export type LoginRequestAction = {
  type: 'LOGIN_REQUEST',
  payload: AuthProviderData,
  meta: {
    // TODO: provider is optional because we provide a deprecation notice
    // remove accordingly
    provider?: AuthProvider,
  },
};

export type LoginSuccessAction = {
  type: 'LOGIN_SUCCESS',
  payload: { email: string },
  meta: { token: string },
};

export type LoginFailureAction = {
  type: 'LOGIN_FAILURE',
  payload: Error,
  error: true,
};

export type LogoutAction = { type: 'LOGOUT' };

export type LinkAccountRequestAction = {
  type: 'LINK_ACCOUNT_REQUEST',
  payload: {
    accessToken: string,
    providerId: AuthProvider,
  },
};

export type LinkAccountSuccessAction = {
  type: 'LINK_ACCOUNT_SUCCESS',
  payload: AuthProvider,
  meta: Object,
};

export type LinkAccountFailureAction = {
  type: 'LINK_ACCOUNT_FAILURE',
  payload: Error,
  error: true,
};

export type UnlinkAccountRequestAction = {
  type: 'UNLINK_ACCOUNT_REQUEST',
  payload: AuthProvider,
};

export type UnlinkAccountSuccessAction = {
  type: 'UNLINK_ACCOUNT_SUCCESS',
  payload: AuthProvider,
};

export type UnlinkAccountFailureAction = {
  type: 'UNLINK_ACCOUNT_FAILURE',
  payload: Error,
  error: true,
};

type GetBabiesRequestAction = { type: 'GET_BABIES_REQUEST' };

export type GetBabiesSuccessAction = {
  type: 'GET_BABIES_SUCCESS',
  payload: Array<Baby>,
};

export type GetBabiesFailureAction = {
  type: 'GET_BABIES_FAILURE',
  payload: Error,
  error: true,
};

export type SeenGrowthGlobalIntroAction = {
  type: 'GROWTH_SEEN_GLOBAL_INTRO',
  payload: boolean,
};

export type SkipGrowthIntroductionAction = {
  type: 'GROWTH_SKIP_INTRODUCTION',
  payload: string,
};

export type SettingsSetValueAction = {
  type: 'SETTINGS_SET_VALUE',
  payload: {
    path: Array<string>,
    value: any,
  },
};

export type ToggleGalleryScrollEnabledAction = {
  type: 'TOGGLE_GALLERY_SCROLL_ENABLED',
  payload: boolean,
};

export type ToggleNetworkIndicatorAction = {
  type: 'TOGGLE_NETWORK_ACTIVITY_INDICATOR',
  payload: boolean,
};

export type SelectBabyAction = {
  type: 'SELECT_BABY',
  payload: string,
};

export type DeleteBabyAction = {
  type: 'DELETE_BABY',
  payload: string,
};

export type ResetSettingsAction = {
  type: 'RESET_SETTINGS',
};

export type Action =
  | AppStartedAction
  | AppOnlineAction
  | AppErrorAction
  | OnAuthAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | LinkAccountRequestAction
  | LinkAccountSuccessAction
  | LinkAccountFailureAction
  | UnlinkAccountRequestAction
  | UnlinkAccountSuccessAction
  | UnlinkAccountFailureAction
  | GetBabiesRequestAction
  | GetBabiesSuccessAction
  | GetBabiesFailureAction
  | SelectBabyAction
  | DeleteBabyAction
  | SeenGrowthGlobalIntroAction
  | SkipGrowthIntroductionAction
  | SettingsSetValueAction
  | ToggleGalleryScrollEnabledAction
  | ToggleNetworkIndicatorAction
  | ResetSettingsAction;
