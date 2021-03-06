/* @flow */

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
  viewer: Viewer,
  /** Fetches an object given its ID */
  node: ?Node,
  ping: ?string,
};

export type Viewer = {
  allUsers: UserConnection,
  user: ?User,
  getUser: ?User,
  friends: UserConnection,
  babies: BabyConnection,
  baby: ?Baby,
  allActivities: ActivityConnection,
  allSkillAreas: SkillAreaConnection,
  allExperts: ExpertConnection,
  expert: ?Expert,
  allTips: TipConnection,
  allQuotes: QuoteConnection,
  randomQuote: ?Quote,
  allArticles: ArticleConnection,
  article: ?Article,
  growthArticle: ?GrowthArticle,
  /** Content articles for library (not blog links) */
  allLibraryArticles: GrowthArticleConnection,
};

/**
  A connection to a list of items.
*/
export type UserConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<UserEdge>,
};

/**
  Information about pagination in a connection.
*/
export type PageInfo = {
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
export type UserEdge = {
  /** The item at the end of the edge. */
  node: User,
  /** A cursor for use in pagination. */
  cursor: string,
  /** Relationship to Viewer */
  relationship: ?BabyRelationship,
  /** Whether the user is invited but have not accepted yet */
  isPending: ?boolean,
};

export type User = {
  /** The ID of an object */
  id: string,
  email: ?string,
  firstName: ?string,
  lastName: ?string,
  /** Date of Birth */
  dob: ?any,
  avatar: ?Avatar,
  linkedAccounts: LinkedAccountsConnection,
  totalAchievements: ?number,
  totalMemories: ?number,
};

export type Node =
  | User
  | Baby
  | Expert
  | SkillArea
  | Category
  | Growth
  | Article
  | Memory;

export type Avatar = {
  id: string,
  url: string,
  contentType: string,
  createdAt: any,
  name: string,
  size: number,
  updatedAt: ?any,
  width: ?number,
  height: ?number,
  large: ?Image,
  thumb: ?Image,
};

export type File = Avatar | Image | GenericFile | Video | Audio;

export type ResizableImage = Avatar | Image | SkillAreaImage;

export type Thumbnailable = Avatar | Image | Video;

export type Image = {
  /** The ID of an object */
  id: string,
  contentType: string,
  createdAt: any,
  name: string,
  size: number,
  updatedAt: ?any,
  url: string,
  width: ?number,
  height: ?number,
  large: ?Image,
  thumb: ?Image,
};

/**
  A connection to a list of items.
*/
export type LinkedAccountsConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<LinkedAccountEdge>,
};

export type LinkedAccountEdge = {
  /** The item at the end of the edge. */
  node: LinkedAccount,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type LinkedAccount = {
  /** The ID of an object */
  id: string,
  provider: ?AuthProvider,
  displayName: string,
  email: ?string,
  photoURL: ?string,
};

export type AuthProvider = 'EMAIL' | 'FACEBOOK';

export type BabyRelationship =
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
export type BabyConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<BabyEdge>,
  /** Count of result set without considering pagination arguments */
  count: number,
};

export type BabyEdge = {
  /** The item at the end of the edge. */
  node: Baby,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Baby = {
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
  achievements: ?AchievementConnection,
  measurements: ?Measurements,
  activities: ?ActivityConnection,
  favoriteActivities: ActivityConnection,
  activity: ?Activity,
  activityHistory: ?ActivityHistoryConnection,
  growth: GrowthConnection,
  memories: ?MemoryConnection,
  memory: ?Memory,
};

export type Timestampable = Baby | Memory | Comment;

export type Gender = 'MALE' | 'FEMALE';

/**
  A connection to a list of items.
*/
export type AchievementConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<AchievementEdge>,
  /** Count of result set without considering pagination arguments */
  count: number,
};

export type AchievementEdge = {
  /** The item at the end of the edge. */
  node: Achievement,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Achievement = {
  id: string,
  badges: ?Array<Badge>,
};

export type Badge = {
  image: ?Image,
};

export type Measurements = {
  heights: MeasurementConnection,
  weights: MeasurementConnection,
};

/**
  A connection to a list of items.
*/
export type MeasurementConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<MeasurementEdge>,
};

export type MeasurementEdge = {
  /** The item at the end of the edge. */
  node: Measurement,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Measurement = {
  value: number,
  unit: MeasurementUnit,
  recordedAt: any,
};

export type MeasurementUnit = 'kg' | 'cm' | 'in' | 'lbs';

export type ActivityFilterInput = {
  skillAreas: ?Array<string>,
  categories: ?Array<string>,
  periodId: ?string,
};

/**
  A connection to a list of items.
*/
export type ActivityConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ActivityEdge>,
  /** Count of filtered result set without considering pagination arguments */
  count: number,
};

export type ActivityEdge = {
  /** The item at the end of the edge. */
  node: ?Activity,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Activity = {
  /** The ID of an object */
  id: string,
  name: string,
  introduction: ?string,
  steps: Array<string>,
  equipment: ?string,
  expert: Expert,
  skillArea: SkillArea,
  /** Whether an activity is favorite, only valid when it's child of baby
   (i.e $babyId passed). Will return false otherwise. */
  isFavorite: boolean,
  /** Whether this activity has been completed, only valid when it's
   child of baby (i.e $babyId passed). Will return false otherwise. */
  isCompleted: boolean,
  categories: CategoryConnection,
  media: ActivityMediaConnection,
};

export type Expert = {
  /** The ID of an object */
  id: string,
  name: string,
  discipline: ?string,
  avatar: Avatar,
  biography: ?string,
};

export type SkillArea = {
  /** The ID of an object */
  id: string,
  name: string,
  icon: string,
  image: SkillAreaImage,
  completedIcon: ?string,
};

export type SkillAreaImage = {
  url: string,
  large: Image,
  thumb: Image,
  width: ?number,
  height: ?number,
};

/**
  A connection to a list of items.
*/
export type CategoryConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<CategoryEdge>,
};

export type CategoryEdge = {
  /** The item at the end of the edge. */
  node: Category,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Category = {
  /** The ID of an object */
  id: string,
  name: string,
};

/**
  A connection to a list of items.
*/
export type ActivityMediaConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ActivityMediaEdge>,
};

export type ActivityMediaEdge = {
  /** The item at the end of the edge. */
  node: ActivityMedia,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type ActivityMedia = {
  type: ActivityMediaType,
  url: ?string,
  thumb: ?string,
};

export type ActivityMediaType = 'IMAGE' | 'VIDEO';

/**
  A connection to a list of items.
*/
export type ActivityHistoryConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ActivityHistoryEdge>,
};

export type ActivityHistoryEdge = {
  /** The item at the end of the edge. */
  node: ActivityHistory,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type ActivityHistory = {
  /** The ID of an object */
  id: string,
  startDate: any,
  endDate: any,
};

export type GrowthConnection = {
  /** Global introduction to the Growth section */
  introduction: string,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  edges: ?Array<GrowthEdge>,
  /** The current growth based on the baby's dob (returns the last content if we can't find a closer one) */
  current: ?Growth,
};

export type GrowthEdge = {
  /** The item at the end of the edge. */
  node: Growth,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Growth = {
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

export type AgeDuration = 'WEEK' | 'MONTH' | 'YEAR';

/**
  A connection to a list of items.
*/
export type ArticleConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ArticleEdge>,
};

export type ArticleEdge = {
  /** The item at the end of the edge. */
  node: Article,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A blog post
*/
export type Article = {
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
  blogUrl: ?string,
};

export type Content = Article | GrowthArticle | Tip | Quote;

export type Author = {
  /** The ID of an object */
  id: string,
  name: string,
  biography: ?string,
  avatar: ?Avatar,
};

export type Tag = {
  id: string,
  name: string,
};

export type ReadingTime = {
  text: string,
  time: number,
  words: number,
};

/**
  A connection to a list of items.
*/
export type GrowthArticleConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<GrowthArticleEdge>,
};

export type GrowthArticleEdge = {
  /** The item at the end of the edge. */
  node: GrowthArticle,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type GrowthArticle = {
  /** The ID of an object */
  id: string,
  title: string,
  text: string,
  readingTime: ReadingTime,
  section: GrowthArticleSection,
};

export type GrowthArticleSection = {
  /** The ID of an object */
  id: string,
  name: string,
};

export type MemoryFilter = 'ALL' | 'SPECIAL';

/**
  A connection to a list of items.
*/
export type MemoryConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<MemoryEdge>,
};

export type MemoryEdge = {
  /** The item at the end of the edge. */
  node: Memory,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Memory = {
  /** The ID of an object */
  id: string,
  title: string,
  description: ?string,
  author: User,
  files: FileConnection,
  comments: CommentConnection,
  createdAt: any,
  updatedAt: ?any,
  suggestedMemoryType: ?string,
  likes: LikeConnection,
  isLikedByViewer: boolean,
  fromActivity: ?Activity,
};

export type Commentable = Memory;

/**
  A connection to a list of items.
*/
export type CommentConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<CommentEdge>,
  count: ?number,
};

export type CommentEdge = {
  /** The item at the end of the edge. */
  node: Comment,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Comment = {
  /** The ID of an object */
  id: string,
  text: string,
  author: User,
  commentable: Commentable,
  createdAt: any,
  updatedAt: ?any,
};

export type Likeable = Memory;

/**
  A connection to a list of items.
*/
export type LikeConnection = {
  /** Count of filtered result set without considering pagination arguments */
  count: ?number,
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<LikeEdge>,
};

export type LikeEdge = {
  /** The user that performed the like */
  actor: User,
  /** The Likeable item at the end of the edge. */
  node: Likeable,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type FileFilter = {
  contentTypeContains: ?string,
};

/**
  A connection to a list of items.
*/
export type FileConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<FileEdge>,
  /** Count of filtered result set without considering pagination arguments */
  count: ?number,
};

export type FileEdge = {
  /** The item at the end of the edge. */
  node: File,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A connection to a list of items.
*/
export type SkillAreaConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<SkillAreaEdge>,
};

export type SkillAreaEdge = {
  /** The item at the end of the edge. */
  node: SkillArea,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A connection to a list of items.
*/
export type ExpertConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<ExpertEdge>,
};

export type ExpertEdge = {
  /** The item at the end of the edge. */
  node: Expert,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A connection to a list of items.
*/
export type TipConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<TipEdge>,
};

export type TipEdge = {
  /** The item at the end of the edge. */
  node: Tip,
  /** A cursor for use in pagination. */
  cursor: string,
};

/**
  A Tip used in the Did You Know section
*/
export type Tip = {
  /** The ID of an object */
  id: string,
  text: string,
};

/**
  A connection to a list of items.
*/
export type QuoteConnection = {
  /** Information to aid in pagination. */
  pageInfo: PageInfo,
  /** A list of edges. */
  edges: ?Array<QuoteEdge>,
};

export type QuoteEdge = {
  /** The item at the end of the edge. */
  node: Quote,
  /** A cursor for use in pagination. */
  cursor: string,
};

export type Quote = {
  /** The ID of an object */
  id: string,
  author: ?string,
  text: string,
  title: ?string,
};

export type LibraryArticlesFilterInput = {
  section: ?string,
};

export type Mutation = {
  updateUser: ?UpdateUserPayload,
  inviteUser: ?InviteUserPayload,
  linkAccount: ?LinkAccountPayload,
  unlinkAccount: ?UnlinkAccountPayload,
  createComment: ?CreateOrUpdateCommentPayload,
  createBaby: ?CreateBabyPayload,
  updateBaby: ?UpdateBabyPayload,
  deleteBaby: ?UpdateBabyPayload,
  recordBabyMeasurement: ?RecordMeasurementPayload,
  swoopActivity: ?ChangeActivityPayload,
  changeActivity: ?ChangeActivityPayload,
  completeActivity: ?CompleteActivityPayload,
  toggleActivityFavorite: ?ToggleFavoritePayload,
  createMemory: ?CreateOrUpdateMemoryPayload,
  updateMemory: ?CreateOrUpdateMemoryPayload,
  deleteMemory: ?DeleteMemoryPayload,
  toggleMemoryLike: ?ToggleMemoryLikePayload,
};

export type UpdateUserInput = {
  firstName: ?string,
  lastName: ?string,
  dob: ?any,
  avatar: ?FileInput,
};

export type FileInput = {
  name: string,
  contentType: string,
  size: number,
  url: string,
};

export type UpdateUserPayload = {
  /** The mutated User. */
  changedUser: ?User,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

export type InviteUserInput = {
  inviteToken: string,
  firstName: string,
  lastName: string,
  email: string,
  relationship: BabyRelationship,
};

export type InviteUserPayload = {
  inviteToken: ?string,
  invitedUser: ?User,
  changedEdge: ?UserEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

export type LinkAccountInput = {
  providerId: AuthProvider,
  accessToken: string,
};

export type LinkAccountPayload = {
  edge: ?LinkedAccountEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

export type UnlinkAccountInput = {
  providerId: string,
};

export type UnlinkAccountPayload = {
  /** The LinkedAccount that was deleted as the result of the unlink */
  deletedEdge: ?LinkedAccountEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

export type CreateCommentInput = {
  id: string,
  commentableType: string,
  text: string,
};

export type CreateOrUpdateCommentPayload = {
  edge: ?CommentEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

export type CreateBabyInput = {
  name: string,
  /** Date of birth */
  dob: any,
  avatar: ?FileInput,
  coverImage: ?FileInput,
  weight: ?number,
  height: ?number,
  gender: Gender,
  weekBorn: number,
  relationship: ?string,
};

export type CreateBabyPayload = {
  createdBaby: ?Baby,
  /** An edge for the Baby that was created */
  edge: ?BabyEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type UpdateBabyInput = {
  id: string,
  name: ?string,
  dob: ?any,
  avatar: ?FileInput,
  coverImage: ?FileInput,
  weight: ?number,
  height: ?number,
  gender: ?Gender,
  weekBorn: ?number,
  relationship: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type UpdateBabyPayload = {
  changedBaby: ?Baby,
  /** An edge for the Baby that was updated */
  edge: ?BabyEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type DeleteBabyInput = {
  id: string,
};

export type RecordMeasurementInput = {
  babyId: string,
  value: number,
  type: MeasurementType,
  unit: MeasurementUnit,
};

export type MeasurementType = 'height' | 'weight';

export type RecordMeasurementPayload = {
  changedMeasurement: ?Measurement,
  baby: Baby,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type SwoopActivityInput = {
  /** The ID of the current Activity */
  id: string,
  /** The ID of the baby the Activity belongs to */
  babyId: string,
};

export type ChangeActivityPayload = {
  newActivity: ?Activity,
  /** The ID for the Activity that got replaced */
  oldActivityId: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type AdjustActivityLevelInput = {
  /** The ID of the current Activity */
  id: string,
  /** The ID of the baby the Activity belongs to */
  babyId: string,
  level: ActivityLevelOperation,
};

export type ActivityLevelOperation = 'INCREASE' | 'DECREASE';

export type CompleteActivityInput = {
  id: string,
  babyId: string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type CompleteActivityPayload = {
  edge: ?ActivityEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type ToggleFavoriteInput = {
  id: string,
  babyId: string,
  favorite: boolean,
};

export type ToggleFavoritePayload = {
  edge: ?ActivityEdge,
  wasFavorited: ?boolean,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type CreateMemoryInput = {
  babyId: string,
  title: string,
  files: ?Array<FileInput>,
  /** The date chose by the user to represent this Memory's date */
  createdAt: any,
  /** A string identifier of the suggested memory that was selected
   when creating this memory */
  suggestedMemoryType: ?string,
  /** An activity that was used to create this Memory */
  fromActivity: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type CreateOrUpdateMemoryPayload = {
  edge: ?MemoryEdge,
  clientMutationId: ?string,
};

export type UpdateMemoryInput = {
  id: string,
  title: ?string,
  createdAt: ?any,
  files: ?Array<FileInput>,
  removeFiles: ?Array<string>,
  suggestedMemoryType: ?string,
};

export type DeleteMemoryInput = {
  id: string,
};

export type DeleteMemoryPayload = {
  memory: ?Memory,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type ToggleMemoryLikeInput = {
  id: string,
  isLiked: boolean,
};

export type ToggleMemoryLikePayload = {
  edge: ?MemoryEdge,
  /** An opaque string used by frontend frameworks like relay to track requests and responses */
  clientMutationId: ?string,
};

export type CreateUserInput = {
  username: string,
  password: ?string,
  /** An opaque string used by frontend frameworks like relay to track requests and responses. */
  clientMutationId: ?string,
};

export type CreateUserPayload = {
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

export type AuthProviderSignupData = {
  email: ?AuthProviderEmailInput,
};

export type AuthProviderEmailInput = {
  email: string,
  password: string,
};

/**
  TODO: make avatar, image, etc. use/implement this
*/
export type GenericFile = {
  id: string,
  contentType: string,
  createdAt: any,
  name: string,
  size: number,
  updatedAt: ?any,
  url: string,
};

export type Video = {
  /** The ID of an object */
  id: string,
  url: string,
  contentType: string,
  createdAt: any,
  name: string,
  size: number,
  updatedAt: ?any,
  thumb: ?Image,
  duration: ?number,
};

export type Audio = {
  /** The ID of an object */
  id: string,
  url: string,
  contentType: string,
  createdAt: any,
  name: string,
  size: number,
  updatedAt: ?any,
  duration: ?number,
};

export type ImageInput = {
  /** A Base64-encoded data URI representing the image contents */
  url: ?string,
};
