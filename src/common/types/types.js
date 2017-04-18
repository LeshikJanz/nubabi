// @flow

// Models
import type {
  Baby,
  Activity,
  Memory,
  User,
  Achievement,
  Expert,
  SkillArea,
  GenderEnum as Gender,
  Image,
  Avatar,
} from './modelTypes';

export type {
  Baby,
  Activity,
  Memory,
  User,
  Achievement,
  Expert,
  SkillArea,
  Gender,
  Image,
  Avatar,
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
  | GetBabiesFailureAction;
