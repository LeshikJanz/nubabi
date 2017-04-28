// @flow
// graphql flow definitions
export type GraphQLResponseRoot = {
  data?: Query | Mutation,
  errors?: Array<GraphQLResponseError>,
};

export type GraphQLResponseError = {
  [propName: string]: any, // 7.2.2 says 'GraphQL servers may provide additional entries to error'
  message: string, // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>,
};

export type GraphQLResponseErrorLocation = {
  line: number,
  column: number,
};

export type Query = {
  __typename: string,
  /**  */
  viewer: Viewer,
  /** Fetches an object given its ID */
  node?: Node,
};

export type Viewer = {
  __typename: string,
  /**  */
  allUsers: UserConnection,
  /**  */
  user?: User,
  /**  */
  getUser?: User,
  /**  */
  babies?: BabyConnection,
  /**  */
  baby?: Baby,
  /**  */
  allSkillAreas?: SkillAreaConnection,
  /**  */
  allActivities: ActivityConnection,
  /**  */
  activity?: Activity,
  /**  */
  allExperts: ExpertConnection,
  /**  */
  expert?: Expert,
};

/**
  description: A connection to a list of items.
*/
export type UserConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<UserEdge>,
};

/**
  description: Information about pagination in a connection.
*/
export type PageInfo = {
  __typename: string,
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean,
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean,
  /** When paginating backwards, the cursor to continue. */
  startCursor?: string,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: string,
};

/**
  description: An edge in a connection.
*/
export type UserEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: User,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type User = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  username: string,
  /**  */
  email?: string,
  /**  */
  name?: string,
  /**  */
  website?: string,
  /** Date of Birth */
  dob?: any,
  /**  */
  avatar?: Avatar,
  /**  */
  phone?: string,
  /**  */
  createdAt: any,
  /**  */
  updatedAt: any,
};

export type Node = User | Baby | Activity | Expert | SkillArea;

export type Timestampable = User | Baby;

export type Avatar = {
  __typename: string,
  /**  */
  url?: string,
  /**  */
  large?: Image,
  /**  */
  thumb?: Image,
};

export type Image = {
  __typename: string,
  /**  */
  url?: string,
  /**  */
  width?: number,
  /**  */
  height?: number,
  /**  */
  large?: Image,
  /**  */
  thumb?: Image,
};

export type ResizableImage = Image | SkillAreaImage;

/**
  description: A connection to a list of items.
*/
export type BabyConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<BabyEdge>,
};

export type BabyEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Baby,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Baby = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  name: string,
  /**  */
  avatar?: Avatar,
  /**  */
  coverImage?: Image,
  /** Date of birth */
  dob: any,
  /** The current weight for this Baby */
  weight?: number,
  /** The current height for this Baby */
  height?: number,
  /**  */
  gender: GenderEnum,
  /**  */
  weekBorn: number,
  /**  */
  createdAt: any,
  /**  */
  updatedAt?: any,
  /** Relationship to Viewer */
  relationship?: string,
  /**  */
  activities?: ActivityConnection,
  /**  */
  activity?: Activity,
  /**  */
  achievements?: AchievementConnection,
  /**  */
  memories?: MemoryConnection,
  /**  */
  favoriteActivities: ActivityConnection,
};

export type GenderEnum = 'MALE' | 'FEMALE';

/**
  description: A connection to a list of items.
*/
export type ActivityConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<ActivityEdge>,
  /** Count of filtered result set without considering pagination arguments */
  count: number,
};

export type ActivityEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node?: Activity,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Activity = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  name: string,
  /**  */
  introduction?: string,
  /**  */
  steps: Array<string>,
  /**  */
  equipment?: string,
  /**  */
  expert: Expert,
  /**  */
  skillArea: SkillArea,
  /**  */
  isFavorite?: boolean,
};

export type Expert = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  name: string,
  /**  */
  discipline?: string,
  /**  */
  avatar: Avatar,
  /**  */
  biography?: string,
};

export type SkillArea = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  name: string,
  /**  */
  icon: string,
  /**  */
  image: SkillAreaImage,
  /**  */
  completedIcon?: string,
};

export type SkillAreaImage = {
  __typename: string,
  /**  */
  url: string,
  /**  */
  large: Image,
  /**  */
  thumb: Image,
  /**  */
  width?: number,
  /**  */
  height?: number,
};

/**
  description: A connection to a list of items.
*/
export type AchievementConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<AchievementEdge>,
  /** Count of result set without considering pagination arguments */
  count: number,
};

export type AchievementEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Achievement,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Achievement = {
  __typename: string,
  /**  */
  id: string,
  /**  */
  badges?: Array<Badge>,
};

export type Badge = {
  __typename: string,
  /**  */
  image?: Image,
};

export type MemoryFilterEnum = 'ALL' | 'RECENT' | 'SPECIAL';

/**
  description: A connection to a list of items.
*/
export type MemoryConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<MemoryEdge>,
};

export type MemoryEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Memory,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Memory = {
  __typename: string,
  /**  */
  id: string,
  /**  */
  description?: string,
  /**  */
  image?: Image,
};

/**
  description: A connection to a list of items.
*/
export type SkillAreaConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<SkillAreaEdge>,
};

export type SkillAreaEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: SkillArea,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  description: A connection to a list of items.
*/
export type ExpertConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<ExpertEdge>,
};

export type ExpertEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Expert,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Mutation = {
  __typename: string,
  /**  */
  ping?: string,
  /**  */
  createBaby?: CreateBabyPayload,
  /**  */
  updateBaby?: UpdateBabyPayload,
  /**  */
  swoopActivity?: ChangeActivityPayload,
  /**  */
  changeActivity?: ChangeActivityPayload,
  /**  */
  toggleActivityFavorite?: ToggleFavoritePayload,
};

export type CreateBabyInput = {
  /**  */
  name: string,
  /** Date of birth */
  dob: any,
  /**  */
  avatar?: ImageInput,
  /**  */
  coverImage?: ImageInput,
  /**  */
  weight?: number,
  /**  */
  height?: number,
  /**  */
  gender: GenderEnum,
  /**  */
  weekBorn: number,
  /**  */
  relationship?: string,
};

export type ImageInput = {
  /** A Base64-encoded data URI representing the image contents */
  url?: string,
};

export type CreateBabyPayload = {
  __typename: string,
  /**  */
  createdBaby?: Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId?: string,
};

export type UpdateBabyInput = {
  /**  */
  id: string,
  /**  */
  name?: string,
  /**  */
  dob?: any,
  /**  */
  avatar?: ImageInput,
  /**  */
  coverImage?: ImageInput,
  /**  */
  weight?: number,
  /**  */
  height?: number,
  /**  */
  gender?: GenderEnum,
  /**  */
  weekBorn?: number,
  /**  */
  relationship?: string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId?: string,
};

export type UpdateBabyPayload = {
  __typename: string,
  /**  */
  changedBaby?: Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId?: string,
};

export type SwoopActivityInput = {
  /** The ID of the current Activity */
  id: string,
  /** The ID of the baby the Activity belongs to */
  babyId: string,
};

export type ChangeActivityPayload = {
  __typename: string,
  /**  */
  newActivity?: Activity,
  /** The ID for the Activity that got replaced */
  oldActivityId?: string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId?: string,
};

export type AdjustActivityLevelInput = {
  /** The ID of the current Activity */
  id: string,
  /** The ID of the baby the Activity belongs to */
  babyId: string,
  /**  */
  level: ActivityLevelOperationEnum,
};

export type ActivityLevelOperationEnum = 'INCREASE' | 'DECREASE';

export type ToggleFavoriteInput = {
  /**  */
  id: string,
  /**  */
  babyId: string,
  /**  */
  favorite: boolean,
};

export type ToggleFavoritePayload = {
  __typename: string,
  /**  */
  activity?: Activity,
  /**  */
  wasFavorited?: boolean,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId?: string,
};

export type CreateUserInput = {
  /**  */
  username: string,
  /**  */
  password?: string,
  /**  */
  clientMutationId?: string,
};

export type CreateUserPayload = {
  __typename: string,
  /** The user's authentication token */
  token?: string,
  /** The mutated User. */
  changedUser?: User,
  /** An edge containing the mutated User. Use this to update your client side cache. */
  changedEdge?: UserEdge,
  /** A view port into your application. */
  viewer?: Viewer,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId?: string,
};
