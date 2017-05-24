// @flow
// graphql flow definitions
export type GraphQLResponseRoot = {
  data?: Query | Mutation,
  errors?: Array<GraphQLResponseError>,
};

export type GraphQLResponseError = {
  message: string, // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>,
  [propName: string]: any, // 7.2.2 says 'GraphQL servers may provide additional entries to error'
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
  babies: BabyConnection,
  /**  */
  baby?: Baby,
  /**  */
  allSkillAreas: SkillAreaConnection,
  /**  */
  allActivities: ActivityConnection,
  /**  */
  allExperts: ExpertConnection,
  /**  */
  expert?: Expert,
  /**  */
  allTips: TipConnection,
  /**  */
  allQuotes: QuoteConnection,
  /**  */
  allArticles: ArticleConnection,
  /**  */
  article?: Article,
  /**  */
  growthArticle?: GrowthArticle,
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

export type Node =
  | User
  | Baby
  | Expert
  | SkillArea
  | Category
  | Growth
  | Article;

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
  /**  */
  growth: GrowthConnection,
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
  /**  */
  categories: CategoryConnection,
  /**  */
  media: ActivityMediaConnection,
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
export type CategoryConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<CategoryEdge>,
};

export type CategoryEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Category,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Category = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  name: string,
};

/**
  description: A connection to a list of items.
*/
export type ActivityMediaConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<ActivityMediaEdge>,
};

export type ActivityMediaEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: ActivityMedia,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type ActivityMedia = {
  __typename: string,
  /**  */
  type: ActivityMediaTypeEnum,
  /**  */
  url?: string,
  /**  */
  thumb?: string,
};

export type ActivityMediaTypeEnum = 'IMAGE' | 'VIDEO';

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

export type GrowthConnection = {
  __typename: string,
  /** Global introduction to the Growth section */
  introduction: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /**  */
  edges?: Array<GrowthEdge>,
};

export type GrowthEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Growth,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Growth = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  title: string,
  /**  */
  introduction: string,
  /**  */
  content: string,
  /** Minimum baby age in ageDuration units */
  minimumAge: number,
  /** Maximum baby age in ageDuration units */
  maximumAge: number,
  /** Age duration */
  ageDuration: AgeDurationEnum,
  /** Expert who gave this content's advice */
  expert: Expert,
  /** Parenting tips content link */
  parentingLinks: GrowthArticleConnection,
  /** FAQ links */
  faqLinks: GrowthArticleConnection,
};

export type AgeDurationEnum = 'WEEK' | 'MONTH' | 'YEAR';

/**
  description: A connection to a list of items.
*/
export type GrowthArticleConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<GrowthArticleEdge>,
};

export type GrowthArticleEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: GrowthArticle,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type GrowthArticle = {
  __typename: string,
  /**  */
  id: string,
  /**  */
  title: string,
  /**  */
  text: string,
  /**  */
  readingTime: ReadingTime,
};

export type Content = GrowthArticle | Tip | Quote | Article;

export type ReadingTime = {
  __typename: string,
  /**  */
  text: string,
  /**  */
  time: number,
  /**  */
  words: number,
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

/**
  description: A connection to a list of items.
*/
export type TipConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<TipEdge>,
};

export type TipEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Tip,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  description: A Tip used in the Did You Know section
*/
export type Tip = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  text: string,
};

/**
  description: A connection to a list of items.
*/
export type QuoteConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<QuoteEdge>,
};

export type QuoteEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Quote,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Quote = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  author?: string,
  /**  */
  text: string,
  /**  */
  title?: string,
};

/**
  description: A connection to a list of items.
*/
export type ArticleConnection = {
  __typename: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges?: Array<ArticleEdge>,
};

export type ArticleEdge = {
  __typename: string,
  /** The item at the end of the edge. */
  node: Article,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  description: A blog post
*/
export type Article = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  title: string,
  /**  */
  text: string,
  /**  */
  summary: string,
  /**  */
  publishedAt: any,
  /**  */
  author: Author,
  /**  */
  tags?: Array<Tag>,
  /**  */
  image: Image,
};

export type Author = {
  __typename: string,
  /** The ID of an object */
  id: string,
  /**  */
  name: string,
  /**  */
  biography?: string,
  /**  */
  avatar?: Avatar,
};

export type Tag = {
  __typename: string,
  /**  */
  id: string,
  /**  */
  name: string,
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
  recordBabyMeasurement?: RecordMeasurementPayload,
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

export type RecordMeasurementInput = {
  /**  */
  babyId: string,
  /**  */
  value: number,
  /**  */
  type: MeasurementTypeEnum,
  /**  */
  unit: MeasurementUnitEnum,
};

export type MeasurementTypeEnum = 'height' | 'weight';

export type MeasurementUnitEnum = 'kg' | 'cm' | 'in' | 'lbs';

export type RecordMeasurementPayload = {
  __typename: string,
  /**  */
  changedMeasurement?: Measurement,
  /**  */
  baby: Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId?: string,
};

export type Measurement = {
  __typename: string,
  /**  */
  value: number,
  /**  */
  unit: MeasurementUnitEnum,
  /**  */
  recordedAt: any,
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
