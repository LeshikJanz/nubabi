/* @flow */

declare type GraphQLResponseRoot = {
  data?: Query | Mutation,
  errors?: Array<GraphQLResponseError>,
};

declare type GraphQLResponseError = {
  message: string, // Required for all errors
  locations?: Array<GraphQLResponseErrorLocation>,
  [propName: string]: any, // 7.2.2 says 'GraphQL servers may provide additional entries to error'
};

declare type GraphQLResponseErrorLocation = {
  line: number,
  column: number,
};

declare type Query = {
  viewer: Viewer,
  /** Fetches an object given its ID */
  node: ?Node,
};

declare type Viewer = {
  allUsers: UserConnection,
  user: User,
  getUser: ?User,
  friends: UserConnection,
  babies: BabyConnection,
  baby: ?Baby,
  allSkillAreas: SkillAreaConnection,
  allActivities: ActivityConnection,
  allExperts: ExpertConnection,
  expert: ?Expert,
  allTips: TipConnection,
  allQuotes: QuoteConnection,
  allArticles: ArticleConnection,
  article: ?Article,
  growthArticle: ?GrowthArticle,
  /** Content articles for library (not blog links) */
  allLibraryArticles: GrowthArticleConnection,
};

/**
  A connection to a list of items.
*/
declare type UserConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<UserEdge>,
};

/**
  Information about pagination in a connection.
*/
declare type PageInfo = {
  /** When paginating forwards, are there more items? */
  hasNextPage: boolean,
  /** When paginating backwards, are there more items? */
  hasPreviousPage: boolean,
  /** When paginating backwards, the cursor to continue. */
  startCursor: ?string,
  /** When paginating forwards, the cursor to continue. */
  endCursor: ?string,
};

/**
  An edge in a connection.
*/
declare type UserEdge = {
  /** The item at the end of the edge. */
  node: User,
  /** A cursor for use in pagination. */
  cursor: string,
  /** Relationship to Viewer */
  relationship: ?BabyRelationship,
  /** Whether the user is invited but have not accepted yet */
  isPending: ?boolean,
};

declare type User = {
  /** The ID of an object */
  id: string,
  email: ?string,
  firstName: ?string,
  lastName: ?string,
  /** Date of Birth */
  dob: ?any,
  avatar: ?Avatar,
  totalAchievements: ?number,
  totalMemories: ?number,
};

declare type Node =
  | User
  | Baby
  | Expert
  | SkillArea
  | Category
  | Memory
  | Growth
  | Article;

declare type Avatar = {
  url: ?string,
  large: ?Image,
  thumb: ?Image,
};

declare type Image = {
  url: ?string,
  width: ?number,
  height: ?number,
  large: ?Image,
  thumb: ?Image,
};

declare type ResizableImage = Image | SkillAreaImage;

declare type BabyRelationship =
  | 'Parent'
  | 'Grandparent'
  | 'Guardian'
  | 'Relative'
  | 'Nanny'
  | 'AuPair'
  | 'Other';

/**
  A connection to a list of items.
*/
declare type BabyConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<BabyEdge>,
  /** Count of result set without considering pagination arguments */
  count: number,
};

declare type BabyEdge = {
  /** The item at the end of the edge. */
  node: Baby,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Baby = {
  /** The ID of an object */
  id: string,
  name: string,
  avatar: ?Avatar,
  coverImage: ?Image,
  /** Date of birth */
  dob: any,
  /** The current weight for this Baby */
  weight: ?number,
  /** The current height for this Baby */
  height: ?number,
  gender: Gender,
  weekBorn: number,
  createdAt: any,
  updatedAt: ?any,
  /** Relationship to Viewer */
  relationship: ?BabyRelationship,
  activities: ?ActivityConnection,
  activity: ?Activity,
  achievements: ?AchievementConnection,
  memories: ?MemoryConnection,
  measurements: ?Measurements,
  favoriteActivities: ActivityConnection,
  growth: GrowthConnection,
  memory: ?Memory,
};

declare type Timestampable = Baby | Memory | Comment;

declare type Gender = 'MALE' | 'FEMALE';

/**
  A connection to a list of items.
*/
declare type ActivityConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ActivityEdge>,
  /** Count of filtered result set without considering pagination arguments */
  count: number,
};

declare type ActivityEdge = {
  /** The item at the end of the edge. */
  node: ?Activity,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Activity = {
  /** The ID of an object */
  id: string,
  name: string,
  introduction: ?string,
  steps: Array<string>,
  equipment: ?string,
  expert: Expert,
  skillArea: SkillArea,
  isFavorite: ?boolean,
  categories: CategoryConnection,
  media: ActivityMediaConnection,
};

declare type Expert = {
  /** The ID of an object */
  id: string,
  name: string,
  discipline: ?string,
  avatar: Avatar,
  biography: ?string,
};

declare type SkillArea = {
  /** The ID of an object */
  id: string,
  name: string,
  icon: string,
  image: SkillAreaImage,
  completedIcon: ?string,
};

declare type SkillAreaImage = {
  url: string,
  large: Image,
  thumb: Image,
  width: ?number,
  height: ?number,
};

/**
  A connection to a list of items.
*/
declare type CategoryConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<CategoryEdge>,
};

declare type CategoryEdge = {
  /** The item at the end of the edge. */
  node: Category,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Category = {
  /** The ID of an object */
  id: string,
  name: string,
};

/**
  A connection to a list of items.
*/
declare type ActivityMediaConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ActivityMediaEdge>,
};

declare type ActivityMediaEdge = {
  /** The item at the end of the edge. */
  node: ActivityMedia,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type ActivityMedia = {
  type: ActivityMediaType,
  url: ?string,
  thumb: ?string,
};

declare type ActivityMediaType = 'IMAGE' | 'VIDEO';

/**
  A connection to a list of items.
*/
declare type AchievementConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<AchievementEdge>,
  /** Count of result set without considering pagination arguments */
  count: number,
};

declare type AchievementEdge = {
  /** The item at the end of the edge. */
  node: Achievement,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Achievement = {
  id: string,
  badges: ?Array<Badge>,
};

declare type Badge = {
  image: ?Image,
};

declare type MemoryFilter = 'ALL' | 'SPECIAL';

/**
  A connection to a list of items.
*/
declare type MemoryConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<MemoryEdge>,
};

declare type MemoryEdge = {
  /** The item at the end of the edge. */
  node: Memory,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Memory = {
  /** The ID of an object */
  id: string,
  title: string,
  description: ?string,
  author: User,
  files: FileConnection,
  comments: CommentConnection,
  createdAt: any,
  updatedAt: ?any,
};

declare type FileFilter = {
  contentTypeContains: ?string,
};

/**
  A connection to a list of items.
*/
declare type FileConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<FileEdge>,
  /** Count of filtered result set without considering pagination arguments */
  count: ?number,
};

declare type FileEdge = {
  /** The item at the end of the edge. */
  node: File,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  TODO: make avatar, image, etc use/implement this
*/
declare type File = {
  contentType: string,
  createdAt: any,
  name: string,
  /** secret: String! */
  size: number,
  updatedAt: ?any,
  url: string,
};

/**
  A connection to a list of items.
*/
declare type CommentConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<CommentEdge>,
  count: ?number,
};

declare type CommentEdge = {
  /** The item at the end of the edge. */
  node: Comment,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Comment = {
  id: string,
  text: string,
  author: User,
  createdAt: any,
  updatedAt: ?any,
};

declare type Measurements = {
  heights: MeasurementConnection,
  weights: MeasurementConnection,
};

/**
  A connection to a list of items.
*/
declare type MeasurementConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<MeasurementEdge>,
};

declare type MeasurementEdge = {
  /** The item at the end of the edge. */
  node: Measurement,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Measurement = {
  value: number,
  unit: MeasurementUnit,
  recordedAt: any,
};

declare type MeasurementUnit = 'kg' | 'cm' | 'in' | 'lbs';

declare type GrowthConnection = {
  /** Global introduction to the Growth section */
  introduction: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  edges: ?Array<GrowthEdge>,
};

declare type GrowthEdge = {
  /** The item at the end of the edge. */
  node: Growth,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Growth = {
  /** The ID of an object */
  id: string,
  title: string,
  introduction: string,
  content: string,
  /** Minimum baby age in ageDuration units */
  minimumAge: number,
  /** Maximum baby age in ageDuration units */
  maximumAge: number,
  /** Age duration */
  ageDuration: AgeDuration,
  /** Expert who gave this content's advice */
  expert: Expert,
  /** Links to articles (blog posts) */
  growthDevelopmentArticleLinks: ArticleConnection,
  /** Links to library content (Growth & Development) */
  growthDevelopmentContentLinks: GrowthArticleConnection,
  /** Links to articles (blog posts) */
  introductionArticleLinks: ArticleConnection,
  /** Links to library content (introductory section) */
  introductionContentLinks: GrowthArticleConnection,
};

declare type AgeDuration = 'WEEK' | 'MONTH' | 'YEAR';

/**
  A connection to a list of items.
*/
declare type ArticleConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ArticleEdge>,
};

declare type ArticleEdge = {
  /** The item at the end of the edge. */
  node: Article,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A blog post
*/
declare type Article = {
  /** The ID of an object */
  id: string,
  title: string,
  text: string,
  summary: string,
  publishedAt: any,
  author: Author,
  tags: ?Array<Tag>,
  image: Image,
  readingTime: ReadingTime,
};

declare type Content = Article | GrowthArticle | Tip | Quote;

declare type Author = {
  /** The ID of an object */
  id: string,
  name: string,
  biography: ?string,
  avatar: ?Avatar,
};

declare type Tag = {
  id: string,
  name: string,
};

declare type ReadingTime = {
  text: string,
  time: number,
  words: number,
};

/**
  A connection to a list of items.
*/
declare type GrowthArticleConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<GrowthArticleEdge>,
};

declare type GrowthArticleEdge = {
  /** The item at the end of the edge. */
  node: GrowthArticle,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type GrowthArticle = {
  id: string,
  title: string,
  text: string,
  readingTime: ReadingTime,
};

/**
  A connection to a list of items.
*/
declare type SkillAreaConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<SkillAreaEdge>,
};

declare type SkillAreaEdge = {
  /** The item at the end of the edge. */
  node: SkillArea,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type ActivityFilterInput = {
  skillAreas: ?Array<string>,
  categories: ?Array<string>,
};

/**
  A connection to a list of items.
*/
declare type ExpertConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ExpertEdge>,
};

declare type ExpertEdge = {
  /** The item at the end of the edge. */
  node: Expert,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A connection to a list of items.
*/
declare type TipConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<TipEdge>,
};

declare type TipEdge = {
  /** The item at the end of the edge. */
  node: Tip,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A Tip used in the Did You Know section
*/
declare type Tip = {
  /** The ID of an object */
  id: string,
  text: string,
};

/**
  A connection to a list of items.
*/
declare type QuoteConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<QuoteEdge>,
};

declare type QuoteEdge = {
  /** The item at the end of the edge. */
  node: Quote,
  /** A cursor for use in pagination. */
  cursor: string,
};

declare type Quote = {
  /** The ID of an object */
  id: string,
  author: ?string,
  text: string,
  title: ?string,
};

declare type LibraryArticlesFilterInput = {
  section: ?string,
};

declare type Mutation = {
  updateUser: ?UpdateUserPayload,
  inviteUser: ?InviteUserPayload,
  createBaby: ?CreateBabyPayload,
  updateBaby: ?UpdateBabyPayload,
  recordBabyMeasurement: ?RecordMeasurementPayload,
  swoopActivity: ?ChangeActivityPayload,
  changeActivity: ?ChangeActivityPayload,
  toggleActivityFavorite: ?ToggleFavoritePayload,
  createMemory: ?CreateOrUpdateMemoryPayload,
};

declare type UpdateUserInput = {
  firstName: ?string,
  lastName: ?string,
  dob: ?any,
  avatar: ?ImageInput,
};

declare type ImageInput = {
  /** A Base64-encoded data URI representing the image contents */
  url: ?string,
};

declare type UpdateUserPayload = {
  /** The mutated User. */
  changedUser: ?User,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

declare type InviteUserInput = {
  inviteToken: string,
  firstName: string,
  lastName: string,
  email: string,
  relationship: BabyRelationship,
};

declare type InviteUserPayload = {
  inviteToken: ?string,
  invitedUser: ?User,
  changedEdge: ?UserEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

declare type CreateBabyInput = {
  name: string,
  /** Date of birth */
  dob: any,
  avatar: ?ImageInput,
  coverImage: ?ImageInput,
  weight: ?number,
  height: ?number,
  gender: Gender,
  weekBorn: number,
  relationship: ?string,
};

declare type CreateBabyPayload = {
  createdBaby: ?Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type UpdateBabyInput = {
  id: string,
  name: ?string,
  dob: ?any,
  avatar: ?ImageInput,
  coverImage: ?ImageInput,
  weight: ?number,
  height: ?number,
  gender: ?Gender,
  weekBorn: ?number,
  relationship: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type UpdateBabyPayload = {
  changedBaby: ?Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type RecordMeasurementInput = {
  babyId: string,
  value: number,
  type: MeasurementType,
  unit: MeasurementUnit,
};

declare type MeasurementType = 'height' | 'weight';

declare type RecordMeasurementPayload = {
  changedMeasurement: ?Measurement,
  baby: Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type SwoopActivityInput = {
  /** The ID of the current Activity */
  id: string,
  /** The ID of the baby the Activity belongs to */
  babyId: string,
};

declare type ChangeActivityPayload = {
  newActivity: ?Activity,
  /** The ID for the Activity that got replaced */
  oldActivityId: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type AdjustActivityLevelInput = {
  /** The ID of the current Activity */
  id: string,
  /** The ID of the baby the Activity belongs to */
  babyId: string,
  level: ActivityLevelOperation,
};

declare type ActivityLevelOperation = 'INCREASE' | 'DECREASE';

declare type ToggleFavoriteInput = {
  id: string,
  babyId: string,
  favorite: boolean,
};

declare type ToggleFavoritePayload = {
  activity: ?Activity,
  wasFavorited: ?boolean,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type CreateMemoryInput = {
  babyId: string,
  title: string,
  files: ?Array<FileInputBase64>,
  /** The date chose by the user to represent this Memory's date */
  createdAt: any,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

declare type FileInputBase64 = {
  name: string,
  url: string,
  contentType: string,
  size: number,
};

declare type CreateOrUpdateMemoryPayload = {
  memory: ?Memory,
  edge: ?MemoryEdge,
  clientMutationId: ?string,
};

declare type CreateUserInput = {
  username: string,
  password: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

declare type CreateUserPayload = {
  /** The user's authentication token */
  token: ?string,
  /** The mutated User. */
  changedUser: ?User,
  /** An edge containing the mutated User. Use this to update your client side cache. */
  changedEdge: ?UserEdge,
  /** A view port into your application. */
  viewer: ?Viewer,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

declare type AuthProviderSignupData = {
  email: ?AuthProviderEmail,
};

declare type AuthProviderEmail = {
  email: string,
  password: string,
};

declare type FileInput = {
  name: string,
  contentType: string,
  size: number,
};
