// @flow
import type { Element } from 'react';

// Models
import type {
  Baby,
  Activity,
  ActivityConnection,
  ActivityEdge,
  Memory,
  User,
  Achievement,
  Expert,
  SkillArea,
  GenderEnum as Gender,
  Image,
  Avatar,
  CreateBabyInput,
  UpdateBabyInput,
  SwoopActivityInput,
  ActivityLevelOperationEnum as ActivityLevelOperation,
  AdjustActivityLevelInput,
  ToggleFavoriteInput,
  RecordMeasurementInput,
} from './modelTypes';

export type {
  Baby,
  Activity,
  ActivityConnection,
  ActivityEdge,
  Memory,
  User,
  Achievement,
  Expert,
  SkillArea,
  Gender,
  Image,
  Avatar,
  CreateBabyInput,
  UpdateBabyInput,
  SwoopActivityInput,
  ActivityLevelOperation,
  AdjustActivityLevelInput,
  ToggleFavoriteInput,
  RecordMeasurementInput,
};

export type FirebaseUser = {
  uid: String,
  email: String,
};

// Deps

export type Deps = {
  getState: () => Object,
  now: () => number,
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: any,
  apollo: Object,
};

export type Viewer = FirebaseUser; // For the time being

// Data fetching

export type {
  ApolloQueryResult,
  MutationResultAction,
  InjectedGraphQLDataProps as GraphQLDataProp,
} from './apolloTypes';

// React Navigation
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
export type NavigationOptionsGetter = (
  NavigationConfigProp,
) => NavigationScreenOptions;

export type NavigationOptions = NavigationScreenOptions;

export type NavigationProp = NavigationScreenProp<*, *>;

// Layout
export type LayoutProps = {
  viewportWidth: number,
  viewportHeight: number,
  parentWidth: ?number,
  parentHeight: ?number,
};

// State

export type AppState = {
  +error: ?Error,
  +online: boolean,
  +started: boolean,
};

export type ConfigState = {
  +appName: string,
  +appVersion: string,
  +apiUrl: string,
  +firebase: ?Object,
  +sentryUrl: string,
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
};

export type DeviceState = GenericDeviceState | MobileDeviceState;

export type BabyState = {
  +isFetching: boolean,
  +failure: boolean,
  +currentBabyId: ?string,
};

export type GrowthState = {
  +hasSeenGlobalIntro: boolean,
  +skippedIntroductions: Array<string>,
};

export type AuthState = {
  +isAuthenticated: boolean,
  +isFetching: boolean,
  +token: ?string,
  +user?: User,
  +errorMessage: ?string,
};

export type ViewerState = {
  +viewer: ?User,
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

export type State = {
  +app: AppState,
  +auth: AuthState,
  +config: ConfigState,
  +babies: BabyState,
  +device: DeviceState,
  +growth: GrowthState,
  +navigation: MobileNavigationState,
  +tabs: TabNavigationState,
  +thisWeek: ThisWeekState,
  +viewer: ViewerState,
};

// Actions

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

export type LoginRequestAction = {
  type: 'LOGIN_REQUEST',
  payload: { email: string, password: string },
  meta: { uid: string },
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

export type GetBabiesRequestAction = { type: 'GET_BABIES_REQUEST' };

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

export type Action =
  | AppStartedAction
  | AppOnlineAction
  | AppErrorAction
  | OnAuthAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | GetBabiesRequestAction
  | GetBabiesSuccessAction
  | GetBabiesFailureAction
  | SeenGrowthGlobalIntroAction
  | SkipGrowthIntroductionAction;
