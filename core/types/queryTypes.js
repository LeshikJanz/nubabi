/* @flow */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type AgeDuration = 'WEEK' | 'MONTH' | 'YEAR';

export type CreateMemoryInput = {|
  babyId: string,
  title: string,
  files?: ?Array<?FileInputBase64>,
  // The date chose by the user to represent this Memory's date
  createdAt: any,
  // A string identifier of the suggested memory that was selected
  // when creating this memory
  suggestedMemoryType?: ?string,
  // An activity that was used to create this Memory
  fromActivity?: ?string,
  // An opaque string used by frontend frameworks like relay to track requests and responses
  clientMutationId?: ?string,
|};

export type FileInputBase64 = {|
  name: string,
  url: string,
  contentType: string,
  size: number,
|};

export type UpdateMemoryInput = {|
  id: string,
  title?: ?string,
  createdAt?: ?any,
  files?: ?Array<?FileInputBase64>,
  removeFiles?: ?Array<?string>,
  suggestedMemoryType?: ?string,
|};

export type DeleteMemoryInput = {|
  id: string,
|};

export type CreateCommentInput = {|
  id: string,
  commentableType: string,
  text: string,
|};

export type ToggleMemoryLikeInput = {|
  id: string,
  isLiked: boolean,
|};

export type CreateBabyInput = {|
  name: string,
  // Date of birth
  dob: any,
  avatar?: ?FileInputBase64,
  coverImage?: ?FileInputBase64,
  weight?: ?number,
  height?: ?number,
  gender: Gender,
  weekBorn: number,
  relationship?: ?string,
|};

export type Gender = 'MALE' | 'FEMALE';

export type BabyRelationship =
  | 'Parent'
  | 'Grandparent'
  | 'Guardian'
  | 'Relative'
  | 'Nanny'
  | 'AuPair'
  | 'Other';

export type UpdateBabyInput = {|
  id: string,
  name?: ?string,
  dob?: ?any,
  avatar?: ?FileInputBase64,
  coverImage?: ?FileInputBase64,
  weight?: ?number,
  height?: ?number,
  gender?: ?Gender,
  weekBorn?: ?number,
  relationship?: ?string,
  // An opaque string used by frontend frameworks like relay to track requests and responses
  clientMutationId?: ?string,
|};

export type RecordMeasurementInput = {|
  babyId: string,
  value: number,
  type: MeasurementType,
  unit: MeasurementUnit,
|};

export type MeasurementType = 'height' | 'weight';

export type MeasurementUnit = 'kg' | 'cm' | 'in' | 'lbs';

export type UpdateUserInput = {|
  firstName?: ?string,
  lastName?: ?string,
  dob?: ?any,
  avatar?: ?FileInputBase64,
|};

export type InviteUserInput = {|
  inviteToken: string,
  firstName: string,
  lastName: string,
  email: string,
  relationship: BabyRelationship,
|};

export type AuthProvider = 'EMAIL' | 'FACEBOOK';

export type LinkAccountInput = {|
  providerId: AuthProvider,
  accessToken: string,
|};

export type UnlinkAccountInput = {|
  providerId: string,
|};

export type ActivityFilterInput = {|
  skillAreas?: ?Array<string>,
  categories?: ?Array<string>,
  periodId?: ?string,
|};

export type ActivityMediaType = 'IMAGE' | 'VIDEO';

export type SwoopActivityInput = {|
  // The ID of the current Activity
  id: string,
  // The ID of the baby the Activity belongs to
  babyId: string,
|};

export type AdjustActivityLevelInput = {|
  // The ID of the current Activity
  id: string,
  // The ID of the baby the Activity belongs to
  babyId: string,
  level: ActivityLevelOperation,
|};

export type ActivityLevelOperation = 'INCREASE' | 'DECREASE';

export type CompleteActivityInput = {|
  id: string,
  babyId: string,
  // An opaque string used by frontend frameworks like relay to track requests and responses
  clientMutationId?: ?string,
|};

export type ToggleFavoriteInput = {|
  id: string,
  babyId: string,
  favorite: boolean,
|};

export type getBabiesQuery = {|
  viewer: {|
    user: ?{|
      // The ID of an object
      id: string,
      avatar: ?{|
        url: string,
      |},
    |},
    babies: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          name: string,
        |},
      |}>,
    |},
  |},
|};

export type GraphDetailQueryVariables = {|
  currentBabyId: string,
|};

export type GraphDetailQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      name: string,
      measurements: ?{|
        heights: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              recordedAt: any,
              value: number,
            |},
          |}>,
        |},
        weights: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              recordedAt: any,
              value: number,
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type GrowthQueryVariables = {|
  babyId: string,
  hasSeenGlobalIntro: boolean,
|};

export type GrowthQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      measurements: ?{|
        weights: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              value: number,
              recordedAt: any,
            |},
          |}>,
        |},
        heights: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              value: number,
              recordedAt: any,
            |},
          |}>,
        |},
      |},
      growth: {|
        // Global introduction to the Growth section
        introduction: string,
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            // The ID of an object
            id: string,
            title: string,
            introduction: string,
            content: string,
            // Minimum baby age in ageDuration units
            minimumAge: number,
            // Maximum baby age in ageDuration units
            maximumAge: number,
            // Age duration
            ageDuration: AgeDuration,
          |},
        |}>,
      |},
      name: string,
      // Date of birth
      dob: any,
    |},
  |},
|};

export type ViewGrowthArticleQueryVariables = {|
  id: string,
  babyId: string,
|};

export type ViewGrowthArticleQuery = {|
  viewer: {|
    growthArticle: ?{|
      // The ID of an object
      id: string,
      title: string,
      text: string,
      readingTime: {|
        text: string,
      |},
      section: {|
        // The ID of an object
        id: string,
        name: string,
      |},
    |},
  |},
|};

export type WhatYouNeedToKnowQueryVariables = {|
  babyId: string,
|};

export type WhatYouNeedToKnowQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      // Date of birth
      dob: any,
      name: string,
      growth: {|
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            // The ID of an object
            id: string,
            title: string,
            // Minimum baby age in ageDuration units
            minimumAge: number,
            // Maximum baby age in ageDuration units
            maximumAge: number,
            // Age duration
            ageDuration: AgeDuration,
            introduction: string,
            content: string,
            // Links to library content (introductory section)
            introductionContentLinks: {|
              // A list of edges.
              edges: ?Array<?{|
                // The item at the end of the edge.
                node: {|
                  // The ID of an object
                  id: string,
                  title: string,
                  text: string,
                  section: {|
                    // The ID of an object
                    id: string,
                    name: string,
                  |},
                |},
              |}>,
            |},
            // Links to library content (Growth & Development)
            growthDevelopmentContentLinks: {|
              // A list of edges.
              edges: ?Array<?{|
                // The item at the end of the edge.
                node: {|
                  // The ID of an object
                  id: string,
                  title: string,
                  text: string,
                  section: {|
                    // The ID of an object
                    id: string,
                    name: string,
                  |},
                |},
              |}>,
            |},
            // Expert who gave this content's advice
            expert: {|
              // The ID of an object
              id: string,
              name: string,
              discipline: ?string,
              avatar: {|
                url: string,
              |},
            |},
          |},
        |}>,
      |},
    |},
  |},
|};

export type ArticleListQuery = {|
  viewer: {|
    allArticles: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          title: string,
          image: {|
            url: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type BrowseArticlesQuery = {|
  viewer: {|
    allArticles: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          title: string,
          image: {|
            url: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type HealthHelpQuery = {|
  viewer: {|
    // Content articles for library (not blog links)
    allLibraryArticles: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          title: string,
          section: {|
            // The ID of an object
            id: string,
            name: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type ParentingTipsQuery = {|
  viewer: {|
    // Content articles for library (not blog links)
    allLibraryArticles: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          title: string,
          section: {|
            // The ID of an object
            id: string,
            name: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type ViewArticleQueryVariables = {|
  id: string,
|};

export type ViewArticleQuery = {|
  viewer: {|
    article: ?{|
      // The ID of an object
      id: string,
      title: string,
      text: string,
      readingTime: {|
        text: string,
      |},
      author: {|
        name: string,
      |},
      publishedAt: any,
      tags: ?Array<?{|
        id: string,
        name: string,
      |}>,
      image: {|
        url: string,
      |},
      blogUrl: ?string,
    |},
  |},
|};

export type AddMemoryMutationVariables = {|
  input: CreateMemoryInput,
|};

export type AddMemoryMutation = {|
  createMemory: ?{|
    edge: ?{|
      // A cursor for use in pagination.
      cursor: string,
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        createdAt: any,
        files: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  large: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  duration: ?number,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  duration: ?number,
                },
          |}>,
        |},
        suggestedMemoryType: ?string,
        fromActivity: ?{|
          // The ID of an object
          id: string,
          name: string,
          skillArea: {|
            // The ID of an object
            id: string,
            icon: string,
          |},
        |},
        comments: {|
          count: ?number,
        |},
        isLikedByViewer: boolean,
        likes: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The user that performed the like
            actor: {|
              firstName: ?string,
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type EditMemoryQueryVariables = {|
  id: string,
  babyId: string,
|};

export type EditMemoryQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      memory: ?{|
        // The ID of an object
        id: string,
        title: string,
        createdAt: any,
        suggestedMemoryType: ?string,
        files: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                },
          |}>,
        |},
      |},
    |},
  |},
|};

export type UpdateMemoryMutationVariables = {|
  input: UpdateMemoryInput,
|};

export type UpdateMemoryMutation = {|
  updateMemory: ?{|
    edge: ?{|
      // A cursor for use in pagination.
      cursor: string,
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        createdAt: any,
        suggestedMemoryType: ?string,
        files: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  large: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  duration: ?number,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  duration: ?number,
                },
          |}>,
          // Count of filtered result set without considering pagination arguments
          count: ?number,
        |},
        fromActivity: ?{|
          // The ID of an object
          id: string,
          name: string,
          skillArea: {|
            // The ID of an object
            id: string,
            icon: string,
          |},
        |},
        comments: {|
          count: ?number,
        |},
        isLikedByViewer: boolean,
        likes: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The user that performed the like
            actor: {|
              firstName: ?string,
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type ViewMemoriesQueryVariables = {|
  babyId: string,
|};

export type ViewMemoriesQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      memories: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            // The ID of an object
            id: string,
            title: string,
            createdAt: any,
            files: {|
              // Count of filtered result set without considering pagination arguments
              count: ?number,
              // A list of edges.
              edges: ?Array<?{|
                // The item at the end of the edge.
                node:
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                      thumb: ?{|
                        url: string,
                      |},
                      large: ?{|
                        url: string,
                      |},
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                      thumb: ?{|
                        url: string,
                      |},
                      duration: ?number,
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                      duration: ?number,
                    },
              |}>,
            |},
            suggestedMemoryType: ?string,
            fromActivity: ?{|
              // The ID of an object
              id: string,
              name: string,
              skillArea: {|
                // The ID of an object
                id: string,
                icon: string,
              |},
            |},
            comments: {|
              count: ?number,
            |},
            isLikedByViewer: boolean,
            likes: {|
              // Count of filtered result set without considering pagination arguments
              count: ?number,
              // A list of edges.
              edges: ?Array<?{|
                // The user that performed the like
                actor: {|
                  firstName: ?string,
                |},
              |}>,
            |},
          |},
        |}>,
      |},
    |},
  |},
|};

export type MemoryCommentsQueryVariables = {|
  babyId?: ?string,
  memoryId: string,
|};

export type MemoryCommentsQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      memory: ?{|
        // The ID of an object
        id: string,
        comments: {|
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              // The ID of an object
              id: string,
              text: string,
              createdAt: any,
              author: {|
                firstName: ?string,
                lastName: ?string,
                avatar: ?{|
                  url: string,
                |},
              |},
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type DeleteMemoryMutationVariables = {|
  input: DeleteMemoryInput,
|};

export type DeleteMemoryMutation = {|
  deleteMemory: ?{|
    memory: ?{|
      // The ID of an object
      id: string,
    |},
  |},
|};

export type MemoryQueryVariables = {|
  id: string,
  babyId?: ?string,
|};

export type MemoryQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      memory: ?{|
        // The ID of an object
        id: string,
        title: string,
        createdAt: any,
        files: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  large: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  duration: ?number,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  duration: ?number,
                },
          |}>,
        |},
        suggestedMemoryType: ?string,
        comments: {|
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              // The ID of an object
              id: string,
              text: string,
              createdAt: any,
              author: {|
                firstName: ?string,
                lastName: ?string,
                avatar: ?{|
                  url: string,
                |},
              |},
            |},
          |}>,
        |},
        isLikedByViewer: boolean,
        likes: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The user that performed the like
            actor: {|
              firstName: ?string,
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type AddCommentToMemoryMutationVariables = {|
  input: CreateCommentInput,
|};

export type AddCommentToMemoryMutation = {|
  createComment: ?{|
    edge: ?{|
      // A cursor for use in pagination.
      cursor: string,
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        createdAt: any,
        text: string,
        author: {|
          // The ID of an object
          id: string,
          firstName: ?string,
          lastName: ?string,
          avatar: ?{|
            url: string,
          |},
        |},
        commentable: {
          // The ID of an object
          id: string,
          comments: {|
            count: ?number,
          |},
        },
      |},
    |},
  |},
|};

export type ToggleMemoryLikeMutationVariables = {|
  input: ToggleMemoryLikeInput,
|};

export type ToggleMemoryLikeMutation = {|
  toggleMemoryLike: ?{|
    edge: ?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        isLikedByViewer: boolean,
        likes: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
        |},
      |},
    |},
  |},
|};

export type getBabyAvatarQueryVariables = {|
  id?: ?string,
|};

export type getBabyAvatarQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      avatar: ?{|
        url: string,
      |},
    |},
  |},
|};

export type SplashScreenQueryVariables = {|
  currentBabyId?: ?string,
  hasCurrentBaby: boolean,
|};

export type SplashScreenQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      avatar: ?{|
        url: string,
      |},
      coverImage: ?{|
        url: string,
      |},
    |},
    randomQuote: ?{|
      // The ID of an object
      id: string,
      author: ?string,
      text: string,
    |},
  |},
|};

export type BabyNameQueryVariables = {|
  id?: ?string,
|};

export type BabyNameQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      name: string,
    |},
  |},
|};

export type ChooseBabyListQuery = {|
  viewer: {|
    babies: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          name: string,
          avatar: ?{|
            url: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type CreateBabyMutationVariables = {|
  input: CreateBabyInput,
|};

export type CreateBabyMutation = {|
  createBaby: ?{|
    createdBaby: ?{|
      // The ID of an object
      id: string,
      name: string,
      gender: Gender,
      // Date of birth
      dob: any,
      weekBorn: number,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
      avatar: ?{|
        url: string,
      |},
      coverImage: ?{|
        url: string,
      |},
    |},
  |},
|};

export type UpdateBabyMutationVariables = {|
  input: UpdateBabyInput,
|};

export type UpdateBabyMutation = {|
  updateBaby: ?{|
    changedBaby: ?{|
      // The ID of an object
      id: string,
      name: string,
      gender: Gender,
      // Date of birth
      dob: any,
      weekBorn: number,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
      avatar: ?{|
        url: string,
      |},
      coverImage: ?{|
        url: string,
      |},
    |},
  |},
|};

export type EditBabyQueryVariables = {|
  id: string,
|};

export type EditBabyQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      name: string,
      gender: Gender,
      // Date of birth
      dob: any,
      weekBorn: number,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
      avatar: ?{|
        url: string,
      |},
      coverImage: ?{|
        url: string,
      |},
    |},
  |},
|};

export type UpdateMeasurementMutationVariables = {|
  input: RecordMeasurementInput,
|};

export type UpdateMeasurementMutation = {|
  recordBabyMeasurement: ?{|
    baby: {|
      // The ID of an object
      id: string,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
    |},
  |},
|};

export type CurrentMeasurementsQueryVariables = {|
  babyId: string,
|};

export type CurrentMeasurementsQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
    |},
  |},
|};

export type ProfileQueryVariables = {|
  id: string,
|};

export type ProfileQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      name: string,
      coverImage: ?{|
        url: string,
      |},
      avatar: ?{|
        url: string,
      |},
      // Date of birth
      dob: any,
      // The current height for this Baby
      height: ?number,
      // The current weight for this Baby
      weight: ?number,
      growth: {|
        // The current growth based on the baby's dob (returns the last content if we can't find a closer one)
        current: ?{|
          // The ID of an object
          id: string,
          introduction: string,
          title: string,
          // Maximum baby age in ageDuration units
          maximumAge: number,
          // Expert who gave this content's advice
          expert: {|
            // The ID of an object
            id: string,
            name: string,
            discipline: ?string,
            avatar: {|
              url: string,
            |},
          |},
        |},
      |},
      activities: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: ?{|
            // The ID of an object
            id: string,
            name: string,
            introduction: ?string,
            skillArea: {|
              // The ID of an object
              id: string,
              icon: string,
            |},
          |},
        |}>,
      |},
      memories: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            // The ID of an object
            id: string,
            title: string,
            files: {|
              // A list of edges.
              edges: ?Array<?{|
                // The item at the end of the edge.
                node:
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                      thumb: ?{|
                        url: string,
                      |},
                      large: ?{|
                        url: string,
                      |},
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                      thumb: ?{|
                        url: string,
                      |},
                    }
                  | {
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    },
              |}>,
            |},
          |},
        |}>,
      |},
    |},
  |},
|};

export type UpdateUserProfileMutationVariables = {|
  input: UpdateUserInput,
|};

export type UpdateUserProfileMutation = {|
  updateUser: ?{|
    // The mutated User.
    changedUser: ?{|
      // The ID of an object
      id: string,
      firstName: ?string,
      lastName: ?string,
      // Date of Birth
      dob: ?any,
      avatar: ?{|
        url: string,
      |},
    |},
  |},
|};

export type EditUserProfileQuery = {|
  viewer: {|
    user: ?{|
      // The ID of an object
      id: string,
      firstName: ?string,
      lastName: ?string,
      // Date of Birth
      dob: ?any,
      avatar: ?{|
        url: string,
        thumb: ?{|
          url: string,
        |},
      |},
      linkedAccounts: {|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            // The ID of an object
            id: string,
            provider: ?AuthProvider,
            displayName: string,
          |},
        |}>,
      |},
    |},
  |},
|};

export type FriendsListQuery = {|
  viewer: {|
    friends: {|
      // A list of edges.
      edges: ?Array<?{|
        // Relationship to Viewer
        relationship: ?BabyRelationship,
        // Whether the user is invited but have not accepted yet
        isPending: ?boolean,
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          firstName: ?string,
          lastName: ?string,
          avatar: ?{|
            thumb: ?{|
              url: string,
            |},
          |},
        |},
      |}>,
    |},
  |},
|};

export type InviteUserMutationVariables = {|
  input: InviteUserInput,
|};

export type InviteUserMutation = {|
  inviteUser: ?{|
    changedEdge: ?{|
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      // Whether the user is invited but have not accepted yet
      isPending: ?boolean,
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        firstName: ?string,
        lastName: ?string,
        avatar: ?{|
          thumb: ?{|
            url: string,
          |},
        |},
      |},
    |},
  |},
|};

export type UserProfileQuery = {|
  viewer: {|
    user: ?{|
      // The ID of an object
      id: string,
      firstName: ?string,
      lastName: ?string,
      avatar: ?{|
        thumb: ?{|
          url: string,
        |},
      |},
    |},
  |},
|};

export type LinkAccountMutationVariables = {|
  input: LinkAccountInput,
|};

export type LinkAccountMutation = {|
  linkAccount: ?{|
    edge: ?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        provider: ?AuthProvider,
        displayName: string,
      |},
    |},
  |},
|};

export type UnlinkAccountMutationVariables = {|
  input: UnlinkAccountInput,
|};

export type UnlinkAccountMutation = {|
  unlinkAccount: ?{|
    // The LinkedAccount that was deleted as the result of the unlink
    deletedEdge: ?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        provider: ?AuthProvider,
      |},
    |},
  |},
|};

export type ActivityHistoryQueryVariables = {|
  babyId: string,
|};

export type ActivityHistoryQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      activityHistory: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            // The ID of an object
            id: string,
            startDate: any,
            endDate: any,
          |},
        |}>,
      |},
    |},
  |},
|};

export type ActivityHistoryDetailQueryVariables = {|
  periodId: string,
  babyId: string,
|};

export type ActivityHistoryDetailQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      activities: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: ?{|
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              // The ID of an object
              id: string,
              name: string,
              image: {|
                thumb: {|
                  url: string,
                |},
              |},
              icon: string,
              completedIcon: ?string,
            |},
            equipment: ?string,
            // Whether this activity has been completed, only valid when it's
            // child of baby (i.e $babyId passed). Will return false otherwise.
            isCompleted: boolean,
          |},
        |}>,
      |},
    |},
  |},
|};

export type BrowseActivitiesQuery = {|
  viewer: {|
    allSkillAreas: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: {|
          // The ID of an object
          id: string,
          name: string,
          icon: string,
        |},
      |}>,
    |},
  |},
|};

export type BrowseActivitiesListQueryVariables = {|
  cursor?: ?string,
  filter?: ?ActivityFilterInput,
|};

export type BrowseActivitiesListQuery = {|
  viewer: {|
    allActivities: {|
      // A list of edges.
      edges: ?Array<?{|
        // The item at the end of the edge.
        node: ?{|
          // The ID of an object
          id: string,
          name: string,
          skillArea: {|
            // The ID of an object
            id: string,
            name: string,
            image: {|
              thumb: {|
                url: string,
              |},
            |},
            icon: string,
            completedIcon: ?string,
          |},
          equipment: ?string,
          // Whether this activity has been completed, only valid when it's
          // child of baby (i.e $babyId passed). Will return false otherwise.
          isCompleted: boolean,
        |},
      |}>,
      // Information to aid in pagination.
      pageInfo: {|
        // When paginating forwards, the cursor to continue.
        endCursor: ?string,
        // When paginating forwards, are there more items?
        hasNextPage: boolean,
      |},
    |},
  |},
|};

export type FavoriteActivitiesListQueryVariables = {|
  babyId: string,
|};

export type FavoriteActivitiesListQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      favoriteActivities: {|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: ?{|
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              // The ID of an object
              id: string,
              name: string,
              image: {|
                thumb: {|
                  url: string,
                |},
              |},
              icon: string,
              completedIcon: ?string,
            |},
            equipment: ?string,
            // Whether this activity has been completed, only valid when it's
            // child of baby (i.e $babyId passed). Will return false otherwise.
            isCompleted: boolean,
          |},
        |}>,
      |},
    |},
  |},
|};

export type ThisWeeksActivitiesListQueryVariables = {|
  babyId: string,
|};

export type ThisWeeksActivitiesListQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      activities: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // A cursor for use in pagination.
          cursor: string,
          // The item at the end of the edge.
          node: ?{|
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              // The ID of an object
              id: string,
              name: string,
              image: {|
                thumb: {|
                  url: string,
                |},
              |},
              icon: string,
              completedIcon: ?string,
            |},
            equipment: ?string,
            // Whether this activity has been completed, only valid when it's
            // child of baby (i.e $babyId passed). Will return false otherwise.
            isCompleted: boolean,
          |},
        |}>,
      |},
    |},
  |},
|};

export type ViewActivityQueryVariables = {|
  babyId: string,
  activityId: string,
|};

export type ViewActivityQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      name: string,
      activity: ?{|
        // The ID of an object
        id: string,
        // Whether an activity is favorite, only valid when it's child of baby
        // (i.e $babyId passed). Will return false otherwise.
        isFavorite: boolean,
        name: string,
        introduction: ?string,
        // Whether this activity has been completed, only valid when it's
        // child of baby (i.e $babyId passed). Will return false otherwise.
        isCompleted: boolean,
        expert: {|
          // The ID of an object
          id: string,
          name: string,
          discipline: ?string,
          avatar: {|
            url: string,
          |},
          biography: ?string,
        |},
        skillArea: {|
          // The ID of an object
          id: string,
          name: string,
          image: {|
            large: {|
              url: string,
            |},
          |},
          icon: string,
        |},
        steps: Array<?string>,
        media: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              type: ActivityMediaType,
              thumb: ?string,
              url: ?string,
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type ViewThisWeekActivityQueryVariables = {|
  babyId: string,
  activityId: string,
  cursor: string,
|};

export type ViewThisWeekActivityQuery = {|
  viewer: {|
    baby: ?{|
      // The ID of an object
      id: string,
      name: string,
      activity: ?{|
        // The ID of an object
        id: string,
        // Whether an activity is favorite, only valid when it's child of baby
        // (i.e $babyId passed). Will return false otherwise.
        isFavorite: boolean,
        name: string,
        introduction: ?string,
        // Whether this activity has been completed, only valid when it's
        // child of baby (i.e $babyId passed). Will return false otherwise.
        isCompleted: boolean,
        expert: {|
          // The ID of an object
          id: string,
          name: string,
          discipline: ?string,
          avatar: {|
            url: string,
          |},
          biography: ?string,
        |},
        skillArea: {|
          // The ID of an object
          id: string,
          name: string,
          image: {|
            large: {|
              url: string,
            |},
          |},
          icon: string,
        |},
        steps: Array<?string>,
        media: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node: {|
              type: ActivityMediaType,
              thumb: ?string,
              url: ?string,
            |},
          |}>,
        |},
      |},
      nextActivity: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // A cursor for use in pagination.
          cursor: string,
          // The item at the end of the edge.
          node: ?{|
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              // The ID of an object
              id: string,
              name: string,
            |},
          |},
        |}>,
      |},
      previousActivity: ?{|
        // A list of edges.
        edges: ?Array<?{|
          // A cursor for use in pagination.
          cursor: string,
          // The item at the end of the edge.
          node: ?{|
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              // The ID of an object
              id: string,
              name: string,
            |},
          |},
        |}>,
      |},
    |},
  |},
|};

export type SwoopActivityMutationVariables = {|
  input: SwoopActivityInput,
|};

export type SwoopActivityMutation = {|
  swoopActivity: ?{|
    newActivity: ?{|
      // The ID of an object
      id: string,
      // Whether an activity is favorite, only valid when it's child of baby
      // (i.e $babyId passed). Will return false otherwise.
      isFavorite: boolean,
      name: string,
      introduction: ?string,
      // Whether this activity has been completed, only valid when it's
      // child of baby (i.e $babyId passed). Will return false otherwise.
      isCompleted: boolean,
      expert: {|
        // The ID of an object
        id: string,
        name: string,
        discipline: ?string,
        avatar: {|
          url: string,
        |},
        biography: ?string,
      |},
      skillArea: {|
        // The ID of an object
        id: string,
        name: string,
        image: {|
          large: {|
            url: string,
          |},
        |},
        icon: string,
      |},
      steps: Array<?string>,
      media: {|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            type: ActivityMediaType,
            thumb: ?string,
            url: ?string,
          |},
        |}>,
      |},
    |},
    // The ID for the Activity that got replaced
    oldActivityId: ?string,
  |},
|};

export type ChangeActivityLevelMutationVariables = {|
  input: AdjustActivityLevelInput,
|};

export type ChangeActivityLevelMutation = {|
  changeActivity: ?{|
    newActivity: ?{|
      // The ID of an object
      id: string,
      // Whether an activity is favorite, only valid when it's child of baby
      // (i.e $babyId passed). Will return false otherwise.
      isFavorite: boolean,
      name: string,
      introduction: ?string,
      // Whether this activity has been completed, only valid when it's
      // child of baby (i.e $babyId passed). Will return false otherwise.
      isCompleted: boolean,
      expert: {|
        // The ID of an object
        id: string,
        name: string,
        discipline: ?string,
        avatar: {|
          url: string,
        |},
        biography: ?string,
      |},
      skillArea: {|
        // The ID of an object
        id: string,
        name: string,
        image: {|
          large: {|
            url: string,
          |},
        |},
        icon: string,
      |},
      steps: Array<?string>,
      media: {|
        // A list of edges.
        edges: ?Array<?{|
          // The item at the end of the edge.
          node: {|
            type: ActivityMediaType,
            thumb: ?string,
            url: ?string,
          |},
        |}>,
      |},
    |},
    // The ID for the Activity that got replaced
    oldActivityId: ?string,
  |},
|};

export type CompleteActivityMutationVariables = {|
  input: CompleteActivityInput,
|};

export type CompleteActivityMutation = {|
  completeActivity: ?{|
    edge: ?{|
      // The item at the end of the edge.
      node: ?{|
        // The ID of an object
        id: string,
      |},
    |},
  |},
|};

export type ToggleFavoriteMutationVariables = {|
  input: ToggleFavoriteInput,
|};

export type ToggleFavoriteMutation = {|
  toggleActivityFavorite: ?{|
    edge: ?{|
      // The item at the end of the edge.
      node: ?{|
        // The ID of an object
        id: string,
        name: string,
        skillArea: {|
          // The ID of an object
          id: string,
          name: string,
          image: {|
            thumb: {|
              url: string,
            |},
          |},
          icon: string,
          completedIcon: ?string,
        |},
        equipment: ?string,
        // Whether this activity has been completed, only valid when it's
        // child of baby (i.e $babyId passed). Will return false otherwise.
        isCompleted: boolean,
        // Whether an activity is favorite, only valid when it's child of baby
        // (i.e $babyId passed). Will return false otherwise.
        isFavorite: boolean,
      |},
    |},
    wasFavorited: ?boolean,
  |},
|};

export type MemoryMediaFileFragment =
  | {
      // The ID of an object
      id: string,
      contentType: string,
      url: ?string,
    }
  | {
      // The ID of an object
      id: string,
      contentType: string,
      url: ?string,
    }
  | {
      // The ID of an object
      id: string,
      contentType: string,
      url: ?string,
    }
  | {
      // The ID of an object
      id: string,
      contentType: string,
      url: ?string,
    }
  | {
      // The ID of an object
      id: string,
      contentType: string,
      url: ?string,
    };

export type AgeHeaderFragment = {|
  name: string,
  // Date of birth
  dob: any,
|};

export type ExpertAdviceFragment = {|
  name: string,
  discipline: ?string,
  avatar: {|
    url: string,
  |},
|};

export type MeasurementFragment = {|
  recordedAt: any,
  value: number,
|};

export type GraphDetailHeaderBabyFragment = {|
  name: string,
|};

export type GrowthIntroductionFragment = {|
  // Global introduction to the Growth section
  introduction: string,
|};

export type GrowthPeriodFragment = {|
  title: string,
  // Minimum baby age in ageDuration units
  minimumAge: number,
  // Maximum baby age in ageDuration units
  maximumAge: number,
  // Age duration
  ageDuration: AgeDuration,
|};

export type CurrentGrowthFragment = {|
  introduction: string,
  content: string,
  // Links to library content (introductory section)
  introductionContentLinks: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        text: string,
        section: {|
          // The ID of an object
          id: string,
          name: string,
        |},
      |},
    |}>,
  |},
  // Links to library content (Growth & Development)
  growthDevelopmentContentLinks: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        text: string,
        section: {|
          // The ID of an object
          id: string,
          name: string,
        |},
      |},
    |}>,
  |},
|};

export type ArticleFragment = {|
  // The ID of an object
  id: string,
  title: string,
  text: string,
  readingTime: {|
    text: string,
  |},
  author: {|
    name: string,
  |},
  publishedAt: any,
  tags: ?Array<?{|
    id: string,
    name: string,
  |}>,
  image: {|
    url: string,
  |},
  blogUrl: ?string,
|};

export type ArticleListItemFragment = {|
  // The ID of an object
  id: string,
  title: string,
  image: {|
    url: string,
  |},
|};

export type GrowthArticleFragment = {|
  // The ID of an object
  id: string,
  title: string,
  text: string,
  readingTime: {|
    text: string,
  |},
  section: {|
    // The ID of an object
    id: string,
    name: string,
  |},
|};

export type GrowthArticleListItemFragment = {|
  // The ID of an object
  id: string,
  title: string,
  section: {|
    // The ID of an object
    id: string,
    name: string,
  |},
|};

export type LikeMemoryButtonFragment = {|
  // The ID of an object
  id: string,
  isLikedByViewer: boolean,
  likes: {|
    // Count of filtered result set without considering pagination arguments
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The user that performed the like
      actor: {|
        firstName: ?string,
      |},
    |}>,
  |},
|};

export type MemoryListItemFragment = {|
  // The ID of an object
  id: string,
  title: string,
  files: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node:
        | {
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
            thumb: ?{|
              url: string,
            |},
          }
        | {
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
            thumb: ?{|
              url: string,
            |},
          }
        | {
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
          }
        | {
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
            thumb: ?{|
              url: string,
            |},
            duration: ?number,
          }
        | {
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
            duration: ?number,
          },
    |}>,
  |},
  suggestedMemoryType: ?string,
  comments: {|
    count: ?number,
  |},
|};

export type MemoryFormFragment = {|
  // The ID of an object
  id: string,
  title: string,
  createdAt: any,
  suggestedMemoryType: ?string,
  files: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node:
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            thumb: ?{|
              url: string,
            |},
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            thumb: ?{|
              url: string,
            |},
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          },
    |}>,
  |},
|};

export type MemoryItemFragment = {|
  // The ID of an object
  id: string,
  title: string,
  createdAt: any,
  files: {|
    // Count of filtered result set without considering pagination arguments
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node:
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            thumb: ?{|
              url: string,
            |},
            large: ?{|
              url: string,
            |},
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            thumb: ?{|
              url: string,
            |},
            duration: ?number,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            duration: ?number,
          },
    |}>,
  |},
  suggestedMemoryType: ?string,
  fromActivity: ?{|
    // The ID of an object
    id: string,
    name: string,
    skillArea: {|
      // The ID of an object
      id: string,
      icon: string,
    |},
  |},
  comments: {|
    count: ?number,
  |},
  isLikedByViewer: boolean,
  likes: {|
    // Count of filtered result set without considering pagination arguments
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The user that performed the like
      actor: {|
        firstName: ?string,
      |},
    |}>,
  |},
|};

export type MemoryActivityFragment = {|
  // The ID of an object
  id: string,
  name: string,
  skillArea: {|
    // The ID of an object
    id: string,
    icon: string,
  |},
|};

export type MemoryCommentFragment = {|
  // The ID of an object
  id: string,
  text: string,
  createdAt: any,
  author: {|
    firstName: ?string,
    lastName: ?string,
    avatar: ?{|
      url: string,
    |},
  |},
|};

export type MemoryCommentsFragment = {|
  comments: {|
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        text: string,
        createdAt: any,
        author: {|
          firstName: ?string,
          lastName: ?string,
          avatar: ?{|
            url: string,
          |},
        |},
      |},
    |}>,
  |},
|};

export type MemoryCommentsSummaryFragment = {|
  comments: {|
    count: ?number,
  |},
|};

export type MemoryDetailFragment = {|
  // The ID of an object
  id: string,
  title: string,
  createdAt: any,
  files: {|
    // Count of filtered result set without considering pagination arguments
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node:
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            thumb: ?{|
              url: string,
            |},
            large: ?{|
              url: string,
            |},
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            thumb: ?{|
              url: string,
            |},
            duration: ?number,
          }
        | {
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
            duration: ?number,
          },
    |}>,
  |},
  suggestedMemoryType: ?string,
  comments: {|
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        text: string,
        createdAt: any,
        author: {|
          firstName: ?string,
          lastName: ?string,
          avatar: ?{|
            url: string,
          |},
        |},
      |},
    |}>,
  |},
  isLikedByViewer: boolean,
  likes: {|
    // Count of filtered result set without considering pagination arguments
    count: ?number,
    // A list of edges.
    edges: ?Array<?{|
      // The user that performed the like
      actor: {|
        firstName: ?string,
      |},
    |}>,
  |},
|};

export type MemoriesFragment = {|
  memories: ?{|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        createdAt: any,
        files: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  large: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  duration: ?number,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  duration: ?number,
                },
          |}>,
        |},
        suggestedMemoryType: ?string,
        fromActivity: ?{|
          // The ID of an object
          id: string,
          name: string,
          skillArea: {|
            // The ID of an object
            id: string,
            icon: string,
          |},
        |},
        comments: {|
          count: ?number,
        |},
        isLikedByViewer: boolean,
        likes: {|
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<?{|
            // The user that performed the like
            actor: {|
              firstName: ?string,
            |},
          |}>,
        |},
      |},
    |}>,
  |},
|};

export type ChooseBabyFragment = {|
  // The ID of an object
  id: string,
  name: string,
  avatar: ?{|
    url: string,
  |},
|};

export type BabyFormFragment = {|
  // The ID of an object
  id: string,
  name: string,
  gender: Gender,
  // Date of birth
  dob: any,
  weekBorn: number,
  // Relationship to Viewer
  relationship: ?BabyRelationship,
  // The current weight for this Baby
  weight: ?number,
  // The current height for this Baby
  height: ?number,
  avatar: ?{|
    url: string,
  |},
  coverImage: ?{|
    url: string,
  |},
|};

export type HeaderFragment = {|
  name: string,
  coverImage: ?{|
    url: string,
  |},
  avatar: ?{|
    url: string,
  |},
  // Date of birth
  dob: any,
  // The current height for this Baby
  height: ?number,
  // The current weight for this Baby
  weight: ?number,
|};

export type CurrentMeasurementsFragment = {|
  // The current weight for this Baby
  weight: ?number,
  // The current height for this Baby
  height: ?number,
|};

export type ProfileFragment = {|
  // The ID of an object
  id: string,
  name: string,
  coverImage: ?{|
    url: string,
  |},
  avatar: ?{|
    url: string,
  |},
  // Date of birth
  dob: any,
  // The current height for this Baby
  height: ?number,
  // The current weight for this Baby
  weight: ?number,
  growth: {|
    // The current growth based on the baby's dob (returns the last content if we can't find a closer one)
    current: ?{|
      // The ID of an object
      id: string,
      introduction: string,
      title: string,
      // Maximum baby age in ageDuration units
      maximumAge: number,
      // Expert who gave this content's advice
      expert: {|
        // The ID of an object
        id: string,
        name: string,
        discipline: ?string,
        avatar: {|
          url: string,
        |},
      |},
    |},
  |},
  activities: ?{|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: ?{|
        // The ID of an object
        id: string,
        name: string,
        introduction: ?string,
        skillArea: {|
          // The ID of an object
          id: string,
          icon: string,
        |},
      |},
    |}>,
  |},
  memories: ?{|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        files: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  large: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                },
          |}>,
        |},
      |},
    |}>,
  |},
|};

export type ProfileActivitiesFragment = {|
  activities: ?{|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: ?{|
        // The ID of an object
        id: string,
        name: string,
        introduction: ?string,
        skillArea: {|
          // The ID of an object
          id: string,
          icon: string,
        |},
      |},
    |}>,
  |},
|};

export type ProfileGrowthFragment = {|
  // The ID of an object
  id: string,
  growth: {|
    // The current growth based on the baby's dob (returns the last content if we can't find a closer one)
    current: ?{|
      // The ID of an object
      id: string,
      introduction: string,
      title: string,
      // Maximum baby age in ageDuration units
      maximumAge: number,
      // Expert who gave this content's advice
      expert: {|
        // The ID of an object
        id: string,
        name: string,
        discipline: ?string,
        avatar: {|
          url: string,
        |},
      |},
    |},
  |},
|};

export type RecentMemoriesFragment = {|
  memories: ?{|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        title: string,
        files: {|
          // A list of edges.
          edges: ?Array<?{|
            // The item at the end of the edge.
            node:
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                  large: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                  thumb: ?{|
                    url: string,
                  |},
                }
              | {
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                },
          |}>,
        |},
      |},
    |}>,
  |},
|};

export type FriendListUserFragment = {|
  // The ID of an object
  id: string,
  firstName: ?string,
  lastName: ?string,
  avatar: ?{|
    thumb: ?{|
      url: string,
    |},
  |},
|};

export type FriendListEdgeFragment = {|
  // Relationship to Viewer
  relationship: ?BabyRelationship,
  // Whether the user is invited but have not accepted yet
  isPending: ?boolean,
|};

export type LinkedAccountItemFragment = {|
  // The ID of an object
  id: string,
  provider: ?AuthProvider,
  displayName: string,
|};

export type LinkedAccountsFragment = {|
  linkedAccounts: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        // The ID of an object
        id: string,
        provider: ?AuthProvider,
        displayName: string,
      |},
    |}>,
  |},
|};

export type UserFormFragment = {|
  // The ID of an object
  id: string,
  firstName: ?string,
  lastName: ?string,
  // Date of Birth
  dob: ?any,
  avatar: ?{|
    url: string,
  |},
|};

export type UserAvatarFragment = {|
  avatar: ?{|
    url: string,
  |},
|};

export type UserProfileFragment = {|
  // The ID of an object
  id: string,
  firstName: ?string,
  lastName: ?string,
  avatar: ?{|
    thumb: ?{|
      url: string,
    |},
  |},
|};

export type ActivityFragment = {|
  // The ID of an object
  id: string,
  // Whether an activity is favorite, only valid when it's child of baby
  // (i.e $babyId passed). Will return false otherwise.
  isFavorite: boolean,
  name: string,
  introduction: ?string,
  // Whether this activity has been completed, only valid when it's
  // child of baby (i.e $babyId passed). Will return false otherwise.
  isCompleted: boolean,
  expert: {|
    // The ID of an object
    id: string,
    name: string,
    discipline: ?string,
    avatar: {|
      url: string,
    |},
    biography: ?string,
  |},
  skillArea: {|
    // The ID of an object
    id: string,
    name: string,
    image: {|
      large: {|
        url: string,
      |},
    |},
    icon: string,
  |},
  steps: Array<?string>,
  media: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        type: ActivityMediaType,
        thumb: ?string,
        url: ?string,
      |},
    |}>,
  |},
|};

export type ActivityNavigationFragment = {|
  // A list of edges.
  edges: ?Array<?{|
    // A cursor for use in pagination.
    cursor: string,
    // The item at the end of the edge.
    node: ?{|
      // The ID of an object
      id: string,
      name: string,
      skillArea: {|
        // The ID of an object
        id: string,
        name: string,
      |},
    |},
  |}>,
|};

export type ActivityActionsActivityFragment = {|
  name: string,
  // Whether this activity has been completed, only valid when it's
  // child of baby (i.e $babyId passed). Will return false otherwise.
  isCompleted: boolean,
|};

export type ActivityActionsSkillFragment = {|
  icon: string,
|};

export type ActivityHistoryItemFragment = {|
  // The ID of an object
  id: string,
  startDate: any,
  endDate: any,
|};

export type ActivityListFragment = {|
  // The ID of an object
  id: string,
  name: string,
  skillArea: {|
    // The ID of an object
    id: string,
    name: string,
    image: {|
      thumb: {|
        url: string,
      |},
    |},
    icon: string,
    completedIcon: ?string,
  |},
  equipment: ?string,
  // Whether this activity has been completed, only valid when it's
  // child of baby (i.e $babyId passed). Will return false otherwise.
  isCompleted: boolean,
|};

export type DidYouKnowFragment = {|
  // The ID of an object
  id: string,
  text: string,
|};

export type ExpertInfoFragment = {|
  // The ID of an object
  id: string,
  name: string,
  discipline: ?string,
  avatar: {|
    url: string,
  |},
  biography: ?string,
|};

export type ExpertInfoActivityFragment = {|
  introduction: ?string,
|};

export type FavoriteActivitiesFragment = {|
  favoriteActivities: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: ?{|
        // The ID of an object
        id: string,
        name: string,
        skillArea: {|
          // The ID of an object
          id: string,
          name: string,
          image: {|
            thumb: {|
              url: string,
            |},
          |},
          icon: string,
          completedIcon: ?string,
        |},
        equipment: ?string,
        // Whether this activity has been completed, only valid when it's
        // child of baby (i.e $babyId passed). Will return false otherwise.
        isCompleted: boolean,
      |},
    |}>,
  |},
|};

export type HeaderSkillFragment = {|
  name: string,
  image: {|
    large: {|
      url: string,
    |},
  |},
|};

export type HeaderActivityFragment = {|
  name: string,
|};

export type StepsFragment = {|
  name: string,
  steps: Array<?string>,
  media: {|
    // A list of edges.
    edges: ?Array<?{|
      // The item at the end of the edge.
      node: {|
        type: ActivityMediaType,
        thumb: ?string,
        url: ?string,
      |},
    |}>,
  |},
|};
