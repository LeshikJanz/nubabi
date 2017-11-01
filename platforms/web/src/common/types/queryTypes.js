/* @flow */
//  This file was automatically generated and should not be edited.

export type AgeDuration = 'WEEK' | 'MONTH' | 'YEAR';

export type CreateMemoryInput = {|
  babyId: string,
  title: string,
  files?: ?Array<?FileInputBase64>,
  // The date chose by the user to represent this Memory's date
  createdAt: any,
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
|};

export type CreateBabyInput = {|
  name: string,
  // Date of birth
  dob: any,
  avatar?: ?ImageInput,
  coverImage?: ?ImageInput,
  weight?: ?number,
  height?: ?number,
  gender: Gender,
  weekBorn: number,
  relationship?: ?string,
|};

export type ImageInput = {|
  // A Base64-encoded data URI representing the image contents
  url?: ?string,
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
  avatar?: ?ImageInput,
  coverImage?: ?ImageInput,
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
  avatar?: ?ImageInput,
|};

export type InviteUserInput = {|
  inviteToken: string,
  firstName: string,
  lastName: string,
  email: string,
  relationship: BabyRelationship,
|};

export type ActivityFilterInput = {|
  skillAreas?: ?Array<string>,
  categories?: ?Array<string>,
|};

export type ActivityMediaType = 'IMAGE' | 'VIDEO';

export type ToggleFavoriteInput = {|
  id: string,
  babyId: string,
  favorite: boolean,
|};

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

export type GetBabiesQuery = {|
  viewer: {|
    __typename: string,
    user: ?{|
      __typename: string,
      // The ID of an object
      id: string,
    |},
    babies: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      measurements: ?{|
        __typename: string,
        heights: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              recordedAt: any,
              value: number,
            |},
          |}>,
        |},
        weights: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
      measurements: ?{|
        __typename: string,
        weights: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              value: number,
              recordedAt: any,
            |},
          |}>,
        |},
        heights: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              value: number,
              recordedAt: any,
            |},
          |}>,
        |},
      |},
      growth: {|
        __typename: string,
        // Global introduction to the Growth section
        introduction: string,
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: {|
            __typename: string,
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
    __typename: string,
    growthArticle: ?{|
      __typename: string,
      id: string,
      title: string,
      text: string,
      readingTime: {|
        __typename: string,
        text: string,
      |},
    |},
  |},
|};

export type WhatYouNeedToKnowQueryVariables = {|
  babyId: string,
|};

export type WhatYouNeedToKnowQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      // Date of birth
      dob: any,
      growth: {|
        __typename: string,
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: {|
            __typename: string,
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
              __typename: string,
              // A list of edges.
              edges: ?Array<{|
                __typename: string,
                // The item at the end of the edge.
                node: {|
                  __typename: string,
                  id: string,
                  title: string,
                  text: string,
                |},
              |}>,
            |},
            // Links to library content (Growth & Development)
            growthDevelopmentContentLinks: {|
              __typename: string,
              // A list of edges.
              edges: ?Array<{|
                __typename: string,
                // The item at the end of the edge.
                node: {|
                  __typename: string,
                  id: string,
                  title: string,
                  text: string,
                |},
              |}>,
            |},
            // Expert who gave this content's advice
            expert: {|
              __typename: string,
              // The ID of an object
              id: string,
              name: string,
              discipline: ?string,
              avatar: {|
                __typename: string,
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
    __typename: string,
    allArticles: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          title: string,
          image: {|
            __typename: string,
            url: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type BrowseArticlesQuery = {|
  viewer: {|
    __typename: string,
    allArticles: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          title: string,
          image: {|
            __typename: string,
            url: string,
          |},
        |},
      |}>,
    |},
  |},
|};

export type HealthHelpQuery = {|
  viewer: {|
    __typename: string,
    // Content articles for library (not blog links)
    allLibraryArticles: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          id: string,
          title: string,
        |},
      |}>,
    |},
  |},
|};

export type ParentingTipsQuery = {|
  viewer: {|
    __typename: string,
    // Content articles for library (not blog links)
    allLibraryArticles: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          id: string,
          title: string,
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
    __typename: string,
    article: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      title: string,
      text: string,
      readingTime: {|
        __typename: string,
        text: string,
      |},
      author: {|
        __typename: string,
        name: string,
      |},
      publishedAt: any,
      tags: ?Array<{|
        __typename: string,
        id: string,
        name: string,
      |}>,
      image: {|
        __typename: string,
        url: string,
      |},
    |},
  |},
|};

export type AddMemoryMutationVariables = {|
  input: CreateMemoryInput,
|};

export type AddMemoryMutation = {|
  createMemory: ?{|
    __typename: string,
    edge: ?{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        // The ID of an object
        id: string,
        title: string,
        files: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node:
              | {
                  __typename: 'Avatar',
                  // The ID of an object
                  id: string,
                  url: ?string,
                  contentType: string,
                }
              | {
                  __typename: 'Image',
                  // The ID of an object
                  id: string,
                  url: ?string,
                  contentType: string,
                }
              | {
                  __typename: 'GenericFile',
                  // The ID of an object
                  id: string,
                  url: ?string,
                  contentType: string,
                },
          |}>,
        |},
      |},
    |},
  |},
|};

export type EditMemoryMutationVariables = {|
  input: UpdateMemoryInput,
|};

export type EditMemoryMutation = {|
  updateMemory: ?{|
    __typename: string,
    memory: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      title: string,
      createdAt: any,
      files: {|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node:
            | {
                __typename: 'Avatar',
                // The ID of an object
                id: string,
                contentType: string,
                url: ?string,
              }
            | {
                __typename: 'Image',
                // The ID of an object
                id: string,
                contentType: string,
                url: ?string,
              }
            | {
                __typename: 'GenericFile',
                // The ID of an object
                id: string,
                contentType: string,
                url: ?string,
              },
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      memory: ?{|
        __typename: string,
        // The ID of an object
        id: string,
        comments: {|
          __typename: string,
          count: ?number,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              id: string,
              text: string,
              createdAt: any,
              author: {|
                __typename: string,
                firstName: ?string,
                lastName: ?string,
              |},
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type ViewMemoriesQueryVariables = {|
  babyId?: ?string,
|};

export type ViewMemoriesQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      memories: ?{|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: {|
            __typename: string,
            // The ID of an object
            id: string,
            title: string,
            author: {|
              __typename: string,
              avatar: ?{|
                __typename: string,
                url: string,
              |},
            |},
            createdAt: any,
            files: {|
              __typename: string,
              // Count of filtered result set without considering pagination arguments
              count: ?number,
              // A list of edges.
              edges: ?Array<{|
                __typename: string,
                // The item at the end of the edge.
                node:
                  | {
                      __typename: 'Avatar',
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    }
                  | {
                      __typename: 'Image',
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    }
                  | {
                      __typename: 'GenericFile',
                      // The ID of an object
                      id: string,
                      contentType: string,
                      url: ?string,
                    },
              |}>,
            |},
            comments: {|
              __typename: string,
              count: ?number,
              // A list of edges.
              edges: ?Array<{|
                __typename: string,
                // A cursor for use in pagination.
                cursor: string,
                // The item at the end of the edge.
                node: {|
                  __typename: string,
                  id: string,
                  text: string,
                  createdAt: any,
                  author: {|
                    __typename: string,
                    firstName: ?string,
                    lastName: ?string,
                  |},
                |},
              |}>,
            |},
          |},
        |}>,
      |},
    |},
  |},
|};

export type MemoryQueryVariables = {|
  id: string,
  babyId?: ?string,
|};

export type MemoryQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      memory: ?{|
        __typename: string,
        // The ID of an object
        id: string,
        title: string,
        author: {|
          __typename: string,
          avatar: ?{|
            __typename: string,
            url: string,
          |},
        |},
        createdAt: any,
        files: {|
          __typename: string,
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node:
              | {
                  __typename: 'Avatar',
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  __typename: 'Image',
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  __typename: 'GenericFile',
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                },
          |}>,
        |},
        comments: {|
          __typename: string,
          count: ?number,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // A cursor for use in pagination.
            cursor: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              id: string,
              text: string,
              createdAt: any,
              author: {|
                __typename: string,
                firstName: ?string,
                lastName: ?string,
              |},
            |},
          |}>,
        |},
      |},
    |},
  |},
|};

export type GetBabyAvatarQueryVariables = {|
  id?: ?string,
|};

export type GetBabyAvatarQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      avatar: ?{|
        __typename: string,
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      avatar: ?{|
        __typename: string,
        url: string,
      |},
      coverImage: ?{|
        __typename: string,
        url: string,
      |},
    |},
    babies: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          avatar: ?{|
            __typename: string,
            url: string,
          |},
        |},
      |}>,
    |},
    allQuotes: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          author: ?string,
          text: string,
        |},
      |}>,
    |},
  |},
|};

export type BabyNameQueryVariables = {|
  id?: ?string,
|};

export type BabyNameQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
    |},
  |},
|};

export type ChooseBabyListQuery = {|
  viewer: {|
    __typename: string,
    babies: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          avatar: ?{|
            __typename: string,
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
    __typename: string,
    createdBaby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      gender: Gender,
      // Date of birth
      dob: any,
      weekBorn: number,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      avatar: ?{|
        __typename: string,
        url: string,
      |},
      coverImage: ?{|
        __typename: string,
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
    __typename: string,
    changedBaby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      gender: Gender,
      // Date of birth
      dob: any,
      weekBorn: number,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      avatar: ?{|
        __typename: string,
        url: string,
      |},
      coverImage: ?{|
        __typename: string,
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      gender: Gender,
      // Date of birth
      dob: any,
      weekBorn: number,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      avatar: ?{|
        __typename: string,
        url: string,
      |},
      coverImage: ?{|
        __typename: string,
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
    __typename: string,
    baby: {|
      __typename: string,
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
    |},
  |},
|};

export type GetBabyQueryVariables = {|
  id: string,
|};

export type GetBabyQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      coverImage: ?{|
        __typename: string,
        url: string,
      |},
      avatar: ?{|
        __typename: string,
        url: string,
      |},
      // Date of birth
      dob: any,
      achievements: ?{|
        __typename: string,
        // Count of result set without considering pagination arguments
        count: number,
      |},
      favoriteActivities: {|
        __typename: string,
        // Count of filtered result set without considering pagination arguments
        count: number,
      |},
      // The current weight for this Baby
      weight: ?number,
      // The current height for this Baby
      height: ?number,
      memories: ?{|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: {|
            __typename: string,
            // The ID of an object
            id: string,
            title: string,
            files: {|
              __typename: string,
              // A list of edges.
              edges: ?Array<{|
                __typename: string,
                // The item at the end of the edge.
                node:
                  | {
                      __typename: 'Avatar',
                      url: ?string,
                      contentType: string,
                    }
                  | {
                      __typename: 'Image',
                      url: ?string,
                      contentType: string,
                    }
                  | {
                      __typename: 'GenericFile',
                      url: ?string,
                      contentType: string,
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
    __typename: string,
    // The mutated User.
    changedUser: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      firstName: ?string,
      lastName: ?string,
      // Date of Birth
      dob: ?any,
      avatar: ?{|
        __typename: string,
        url: string,
      |},
    |},
  |},
|};

export type EditUserProfileQuery = {|
  viewer: {|
    __typename: string,
    user: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      firstName: ?string,
      lastName: ?string,
      // Date of Birth
      dob: ?any,
      avatar: ?{|
        __typename: string,
        url: string,
      |},
    |},
  |},
|};

export type FriendsListQuery = {|
  viewer: {|
    __typename: string,
    friends: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // Relationship to Viewer
        relationship: ?BabyRelationship,
        // Whether the user is invited but have not accepted yet
        isPending: ?boolean,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          firstName: ?string,
          lastName: ?string,
          avatar: ?{|
            __typename: string,
            thumb: ?{|
              __typename: string,
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
    __typename: string,
    changedEdge: ?{|
      __typename: string,
      // Relationship to Viewer
      relationship: ?BabyRelationship,
      // Whether the user is invited but have not accepted yet
      isPending: ?boolean,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        // The ID of an object
        id: string,
        firstName: ?string,
        lastName: ?string,
        avatar: ?{|
          __typename: string,
          thumb: ?{|
            __typename: string,
            url: string,
          |},
        |},
      |},
    |},
  |},
|};

export type UserProfileQuery = {|
  viewer: {|
    __typename: string,
    user: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      firstName: ?string,
      lastName: ?string,
      avatar: ?{|
        __typename: string,
        thumb: ?{|
          __typename: string,
          url: string,
        |},
      |},
    |},
  |},
|};

export type BrowseActivitiesQuery = {|
  viewer: {|
    __typename: string,
    allSkillAreas: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          image: {|
            __typename: string,
            url: string,
          |},
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
    __typename: string,
    allActivities: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: ?{|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          skillArea: {|
            __typename: string,
            // The ID of an object
            id: string,
            name: string,
            image: {|
              __typename: string,
              thumb: {|
                __typename: string,
                url: string,
              |},
            |},
            icon: string,
            completedIcon: ?string,
          |},
        |},
      |}>,
      // Information to aid in pagination.
      pageInfo: {|
        __typename: string,
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      favoriteActivities: {|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: ?{|
            __typename: string,
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              __typename: string,
              // The ID of an object
              id: string,
              name: string,
              image: {|
                __typename: string,
                thumb: {|
                  __typename: string,
                  url: string,
                |},
              |},
              icon: string,
              completedIcon: ?string,
            |},
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      activities: ?{|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // A cursor for use in pagination.
          cursor: string,
          // The item at the end of the edge.
          node: ?{|
            __typename: string,
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              __typename: string,
              // The ID of an object
              id: string,
              name: string,
              image: {|
                __typename: string,
                thumb: {|
                  __typename: string,
                  url: string,
                |},
              |},
              icon: string,
              completedIcon: ?string,
            |},
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
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      activity: ?{|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
        introduction: ?string,
        expert: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          discipline: ?string,
          avatar: {|
            __typename: string,
            url: string,
          |},
          biography: ?string,
        |},
        skillArea: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          image: {|
            __typename: string,
            large: {|
              __typename: string,
              url: string,
            |},
          |},
          icon: string,
        |},
        steps: Array<?string>,
        media: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              type: ActivityMediaType,
              thumb: ?string,
              url: ?string,
            |},
          |}>,
        |},
      |},
      favoriteActivities: {|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: ?{|
            __typename: string,
            // The ID of an object
            id: string,
          |},
        |}>,
      |},
    |},
  |},
|};

export type ToggleFavoriteMutationVariables = {|
  input: ToggleFavoriteInput,
|};

export type ToggleFavoriteMutation = {|
  toggleActivityFavorite: ?{|
    __typename: string,
    wasFavorited: ?boolean,
  |},
|};

export type ViewThisWeekActivityQueryVariables = {|
  babyId: string,
  activityId: string,
  cursor: string,
|};

export type ViewThisWeekActivityQuery = {|
  viewer: {|
    __typename: string,
    baby: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      activity: ?{|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
        introduction: ?string,
        expert: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          discipline: ?string,
          avatar: {|
            __typename: string,
            url: string,
          |},
          biography: ?string,
        |},
        skillArea: {|
          __typename: string,
          // The ID of an object
          id: string,
          name: string,
          image: {|
            __typename: string,
            large: {|
              __typename: string,
              url: string,
            |},
          |},
          icon: string,
        |},
        steps: Array<?string>,
        media: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              type: ActivityMediaType,
              thumb: ?string,
              url: ?string,
            |},
          |}>,
        |},
      |},
      nextActivity: ?{|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // A cursor for use in pagination.
          cursor: string,
          // The item at the end of the edge.
          node: ?{|
            __typename: string,
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              __typename: string,
              // The ID of an object
              id: string,
              name: string,
            |},
          |},
        |}>,
      |},
      previousActivity: ?{|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // A cursor for use in pagination.
          cursor: string,
          // The item at the end of the edge.
          node: ?{|
            __typename: string,
            // The ID of an object
            id: string,
            name: string,
            skillArea: {|
              __typename: string,
              // The ID of an object
              id: string,
              name: string,
            |},
          |},
        |}>,
      |},
      favoriteActivities: {|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: ?{|
            __typename: string,
            // The ID of an object
            id: string,
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
    __typename: string,
    newActivity: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      introduction: ?string,
      expert: {|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
        discipline: ?string,
        avatar: {|
          __typename: string,
          url: string,
        |},
        biography: ?string,
      |},
      skillArea: {|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
        image: {|
          __typename: string,
          large: {|
            __typename: string,
            url: string,
          |},
        |},
        icon: string,
      |},
      steps: Array<?string>,
      media: {|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: {|
            __typename: string,
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
    __typename: string,
    newActivity: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      introduction: ?string,
      expert: {|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
        discipline: ?string,
        avatar: {|
          __typename: string,
          url: string,
        |},
        biography: ?string,
      |},
      skillArea: {|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
        image: {|
          __typename: string,
          large: {|
            __typename: string,
            url: string,
          |},
        |},
        icon: string,
      |},
      steps: Array<?string>,
      media: {|
        __typename: string,
        // A list of edges.
        edges: ?Array<{|
          __typename: string,
          // The item at the end of the edge.
          node: {|
            __typename: string,
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

export type StimulationQuery = {|
  viewer: {|
    __typename: string,
    allTips: {|
      __typename: string,
      // A list of edges.
      edges: ?Array<{|
        __typename: string,
        // The item at the end of the edge.
        node: {|
          __typename: string,
          // The ID of an object
          id: string,
          text: string,
        |},
      |}>,
    |},
  |},
|};

export type AgeHeaderFragment = {|
  __typename: string,
  name: string,
  // Date of birth
  dob: any,
|};

export type ExpertAdviceFragment = {|
  __typename: string,
  name: string,
  discipline: ?string,
  avatar: {|
    __typename: string,
    url: string,
  |},
|};

export type MeasurementFragment = {|
  __typename: string,
  recordedAt: any,
  value: number,
|};

export type GraphDetailHeaderBabyFragment = {|
  __typename: string,
  name: string,
|};

export type GrowthIntroductionFragment = {|
  __typename: string,
  // Global introduction to the Growth section
  introduction: string,
|};

export type GrowthPeriodFragment = {|
  __typename: string,
  title: string,
  // Minimum baby age in ageDuration units
  minimumAge: number,
  // Maximum baby age in ageDuration units
  maximumAge: number,
  // Age duration
  ageDuration: AgeDuration,
|};

export type CurrentGrowthFragment = {|
  __typename: string,
  introduction: string,
  content: string,
  // Links to library content (introductory section)
  introductionContentLinks: {|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        id: string,
        title: string,
        text: string,
      |},
    |}>,
  |},
  // Links to library content (Growth & Development)
  growthDevelopmentContentLinks: {|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        id: string,
        title: string,
        text: string,
      |},
    |}>,
  |},
|};

export type ArticleFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  title: string,
  text: string,
  readingTime: {|
    __typename: string,
    text: string,
  |},
  author: {|
    __typename: string,
    name: string,
  |},
  publishedAt: any,
  tags: ?Array<{|
    __typename: string,
    id: string,
    name: string,
  |}>,
  image: {|
    __typename: string,
    url: string,
  |},
|};

export type ArticleListItemFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  title: string,
  image: {|
    __typename: string,
    url: string,
  |},
|};

export type GrowthArticleFragment = {|
  __typename: string,
  id: string,
  title: string,
  text: string,
  readingTime: {|
    __typename: string,
    text: string,
  |},
|};

export type GrowthArticleListItemFragment = {|
  __typename: string,
  id: string,
  title: string,
|};

export type MemoryListItemFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  title: string,
  files: {|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node:
        | {
            __typename: 'Avatar',
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
          }
        | {
            __typename: 'Image',
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
          }
        | {
            __typename: 'GenericFile',
            // The ID of an object
            id: string,
            url: ?string,
            contentType: string,
          },
    |}>,
  |},
|};

export type MemoryFormFragment = {|
  __typename: string,
  title: string,
  createdAt: any,
  files: {|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node:
        | {
            __typename: 'Avatar',
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            __typename: 'Image',
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            __typename: 'GenericFile',
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          },
    |}>,
  |},
|};

export type MemoryItemFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  title: string,
  author: {|
    __typename: string,
    avatar: ?{|
      __typename: string,
      url: string,
    |},
  |},
  createdAt: any,
  files: {|
    __typename: string,
    // Count of filtered result set without considering pagination arguments
    count: ?number,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node:
        | {
            __typename: 'Avatar',
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            __typename: 'Image',
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          }
        | {
            __typename: 'GenericFile',
            // The ID of an object
            id: string,
            contentType: string,
            url: ?string,
          },
    |}>,
  |},
  comments: {|
    __typename: string,
    count: ?number,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // A cursor for use in pagination.
      cursor: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        id: string,
        text: string,
        createdAt: any,
        author: {|
          __typename: string,
          firstName: ?string,
          lastName: ?string,
        |},
      |},
    |}>,
  |},
|};

export type MemoryCommentFragment = {|
  __typename: string,
  text: string,
  createdAt: any,
  author: {|
    __typename: string,
    firstName: ?string,
    lastName: ?string,
  |},
|};

export type MemoriesFragment = {|
  __typename: string,
  memories: ?{|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        // The ID of an object
        id: string,
        title: string,
        author: {|
          __typename: string,
          avatar: ?{|
            __typename: string,
            url: string,
          |},
        |},
        createdAt: any,
        files: {|
          __typename: string,
          // Count of filtered result set without considering pagination arguments
          count: ?number,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node:
              | {
                  __typename: 'Avatar',
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  __typename: 'Image',
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                }
              | {
                  __typename: 'GenericFile',
                  // The ID of an object
                  id: string,
                  contentType: string,
                  url: ?string,
                },
          |}>,
        |},
        comments: {|
          __typename: string,
          count: ?number,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // A cursor for use in pagination.
            cursor: string,
            // The item at the end of the edge.
            node: {|
              __typename: string,
              id: string,
              text: string,
              createdAt: any,
              author: {|
                __typename: string,
                firstName: ?string,
                lastName: ?string,
              |},
            |},
          |}>,
        |},
      |},
    |}>,
  |},
|};

export type ChooseBabyFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  name: string,
  avatar: ?{|
    __typename: string,
    url: string,
  |},
|};

export type BabyFormFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  name: string,
  gender: Gender,
  // Date of birth
  dob: any,
  weekBorn: number,
  // Relationship to Viewer
  relationship: ?BabyRelationship,
  avatar: ?{|
    __typename: string,
    url: string,
  |},
  coverImage: ?{|
    __typename: string,
    url: string,
  |},
|};

export type CurrentMeasurementsFragment = {|
  __typename: string,
  // The current weight for this Baby
  weight: ?number,
  // The current height for this Baby
  height: ?number,
|};

export type HeaderFragment = {|
  __typename: string,
  name: string,
  coverImage: ?{|
    __typename: string,
    url: string,
  |},
  avatar: ?{|
    __typename: string,
    url: string,
  |},
  // Date of birth
  dob: any,
  achievements: ?{|
    __typename: string,
    // Count of result set without considering pagination arguments
    count: number,
  |},
  favoriteActivities: {|
    __typename: string,
    // Count of filtered result set without considering pagination arguments
    count: number,
  |},
|};

export type ProfileFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  name: string,
  coverImage: ?{|
    __typename: string,
    url: string,
  |},
  avatar: ?{|
    __typename: string,
    url: string,
  |},
  // Date of birth
  dob: any,
  achievements: ?{|
    __typename: string,
    // Count of result set without considering pagination arguments
    count: number,
  |},
  favoriteActivities: {|
    __typename: string,
    // Count of filtered result set without considering pagination arguments
    count: number,
  |},
  // The current weight for this Baby
  weight: ?number,
  // The current height for this Baby
  height: ?number,
  memories: ?{|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        // The ID of an object
        id: string,
        title: string,
        files: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node:
              | {
                  __typename: 'Avatar',
                  url: ?string,
                  contentType: string,
                }
              | {
                  __typename: 'Image',
                  url: ?string,
                  contentType: string,
                }
              | {
                  __typename: 'GenericFile',
                  url: ?string,
                  contentType: string,
                },
          |}>,
        |},
      |},
    |}>,
  |},
|};

export type RecentMemoriesFragment = {|
  __typename: string,
  memories: ?{|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        // The ID of an object
        id: string,
        title: string,
        files: {|
          __typename: string,
          // A list of edges.
          edges: ?Array<{|
            __typename: string,
            // The item at the end of the edge.
            node:
              | {
                  __typename: 'Avatar',
                  url: ?string,
                  contentType: string,
                }
              | {
                  __typename: 'Image',
                  url: ?string,
                  contentType: string,
                }
              | {
                  __typename: 'GenericFile',
                  url: ?string,
                  contentType: string,
                },
          |}>,
        |},
      |},
    |}>,
  |},
|};

export type FriendListUserFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  firstName: ?string,
  lastName: ?string,
  avatar: ?{|
    __typename: string,
    thumb: ?{|
      __typename: string,
      url: string,
    |},
  |},
|};

export type FriendListEdgeFragment = {|
  __typename: string,
  // Relationship to Viewer
  relationship: ?BabyRelationship,
  // Whether the user is invited but have not accepted yet
  isPending: ?boolean,
|};

export type UserFormFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  firstName: ?string,
  lastName: ?string,
  // Date of Birth
  dob: ?any,
  avatar: ?{|
    __typename: string,
    url: string,
  |},
|};

export type UserProfileFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  firstName: ?string,
  lastName: ?string,
  avatar: ?{|
    __typename: string,
    thumb: ?{|
      __typename: string,
      url: string,
    |},
  |},
|};

export type ActivityFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  name: string,
  introduction: ?string,
  expert: {|
    __typename: string,
    // The ID of an object
    id: string,
    name: string,
    discipline: ?string,
    avatar: {|
      __typename: string,
      url: string,
    |},
    biography: ?string,
  |},
  skillArea: {|
    __typename: string,
    // The ID of an object
    id: string,
    name: string,
    image: {|
      __typename: string,
      large: {|
        __typename: string,
        url: string,
      |},
    |},
    icon: string,
  |},
  steps: Array<?string>,
  media: {|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        type: ActivityMediaType,
        thumb: ?string,
        url: ?string,
      |},
    |}>,
  |},
|};

export type ActivityNavigationFragment = {|
  __typename: string,
  // A list of edges.
  edges: ?Array<{|
    __typename: string,
    // A cursor for use in pagination.
    cursor: string,
    // The item at the end of the edge.
    node: ?{|
      __typename: string,
      // The ID of an object
      id: string,
      name: string,
      skillArea: {|
        __typename: string,
        // The ID of an object
        id: string,
        name: string,
      |},
    |},
  |}>,
|};

export type ActivityActionsActivityFragment = {|
  __typename: string,
  name: string,
|};

export type ActivityActionsSkillFragment = {|
  __typename: string,
  icon: string,
|};

export type ActivityListFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  name: string,
  skillArea: {|
    __typename: string,
    // The ID of an object
    id: string,
    name: string,
    image: {|
      __typename: string,
      thumb: {|
        __typename: string,
        url: string,
      |},
    |},
    icon: string,
    completedIcon: ?string,
  |},
|};

export type DidYouKnowFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  text: string,
|};

export type ExpertInfoFragment = {|
  __typename: string,
  // The ID of an object
  id: string,
  name: string,
  discipline: ?string,
  avatar: {|
    __typename: string,
    url: string,
  |},
  biography: ?string,
|};

export type ExpertInfoActivityFragment = {|
  __typename: string,
  introduction: ?string,
|};

export type HeaderSkillFragment = {|
  __typename: string,
  name: string,
  image: {|
    __typename: string,
    large: {|
      __typename: string,
      url: string,
    |},
  |},
|};

export type HeaderActivityFragment = {|
  __typename: string,
  name: string,
|};

export type StepsFragment = {|
  __typename: string,
  name: string,
  steps: Array<?string>,
  media: {|
    __typename: string,
    // A list of edges.
    edges: ?Array<{|
      __typename: string,
      // The item at the end of the edge.
      node: {|
        __typename: string,
        type: ActivityMediaType,
        thumb: ?string,
        url: ?string,
      |},
    |}>,
  |},
|};
