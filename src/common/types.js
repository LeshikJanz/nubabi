// @flow

export type Deps = {
  getState: () => Object,
  now: () => number,
  firebase: any,
  firebaseAuth: Function,
  firebaseDatabase: any,
};

// Models
export type Baby = {
  // TODO: we should probably move this to a GraphQL schema and use tooling to
  // get flowtypes. Also, camelcase
  id: string,
  name: string,
  avatar_thumb: string,
  birth_date: Date,
  weight: number,
  height: number,
  memories: Array<Memory>;
};

export type Memory = {
  // TODO
};

export type User = {
  // TODO
};

export type FirebaseUser = {
  uid: string,
  email: string
}

export type Activity = {
  id: number,
  name: string,
  description: string,
  expertId: number,
  skillAreaId: number,
};

export type Expert = {
  id: number,
  name: string,
  image_thumbnail: number,
  profession: string,
  biography: string,
}

export type SkillArea = {
  id: number,
  icon: number,
  image_large: number,
  image_thumbnail: number,
  name: string,
}

export type Viewer = FirebaseUser; // For the time being

// State

export type AppState = {
  error: ?Error,
  online: boolean,
  started: boolean,
};

export type ConfigState = {
  appName: string,
  appVersion: string,
  apiUrl: string,
  firebase: ?Object,
  sentryUrl: string,
};

export type GenericDeviceState = {
  host: string,
};

export type MobileDeviceState = {
  isReactNative: true,
  deviceModel: ?string,
  deviceId: ?string,
  appVersion: ?string,
  systemVersion: ?string,
  bundleId: ?string,
  locale: ?string,
};

export type DeviceState = GenericDeviceState | MobileDeviceState;

export type BabyState = {
  isFetching: boolean,
  failure: boolean,
  items: Array<Baby>,
  index: ?number,
}

export type AuthState = {
  isAuthenticated: boolean,
  isFetching: boolean,
  token: ?string,
  user?: User,
  errorMessage: ?string,
};

export type ViewerState = {
  viewer: ?User,
};

export type TabNavigationState = {
  index: number,
  routes: Array<mixed>, // TODO: shape
};

export type MobileNavigationState = {
  chooseBabyModalVisible: boolean,
  index: number,
  routes: Array<mixed>, // TODO: shape
}

export type ThisWeekState = {
  activities: Array<Activity>,
  experts: Array<Expert>,
  skillArea: number,
  skillAreas: Array<SkillArea>,
}

export type State = {
  app: AppState,
  auth: AuthState,
  config: ConfigState,
  babies: BabyState,
  device: DeviceState,
  navigation: MobileNavigationState,
  tabs: TabNavigationState,
  thisWeek: ThisWeekState,
  viewer: ViewerState,
};

// Actions

export type Action =
  | { type: 'APP_STARTED' }
  | { type: 'APP_ONLINE', payload: { online: boolean } }
  | { type: 'APP_ERROR', payload: Error | Object }
  | { type: 'ON_AUTH', payload: { user: ?FirebaseUser } }
  | { type: 'LOGIN_REQUEST', payload: { email: string, password: string }, meta: { uid: string }}
  | { type: 'LOGIN_SUCCESS', payload: { email: string }, meta: { token: string } }
  | { type: 'LOGIN_FAILURE', payload: Error, error: true }
  | { type: 'LOGOUT' }
  | { type: 'GET_BABIES_REQUEST' }
  | { type: 'GET_BABIES_SUCCESS', payload: Array<Baby> }
  | { type: 'GET_BABIES_FAILURE', payload: Error, error: true }
  | { type: 'GET_THIS_WEEKS_ACTIVITIES_REQUEST', meta: { token: string }}
  | { type: 'GET_THIS_WEEKS_ACTIVITIES_SUCCESS', payload: Array<Activity> }
  | { type: 'GET_THIS_WEEKS_ACTIVITIES_FAILURE', payload: Error, error: true };
