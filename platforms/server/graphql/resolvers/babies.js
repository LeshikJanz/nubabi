// @flow
import { pick, last } from 'ramda';
import * as connector from '../connectors/babiesConnector';
// noinspection ES6UnusedImports
import {
  transform,
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromPromisedArrayWithCount,
  globalIdField,
  fromGlobalId,
  mutationWithClientMutationId,
} from './common';
import { getClosestContentForPeriod } from '../../../../core/growth/reducer';
import { addEdgeAndCursorToMutationResult } from '../../../../libs/graphql-utils';

const resolvers = {
  Viewer: {
    babies: (_, args, { connectors: { firebase } }) =>
      connectionFromPromisedArrayWithCount(firebase.getBabies(), args),

    baby: (_, { id }, { connectors: { firebase } }) =>
      firebase.getBaby(fromGlobalId(id).id),
  },

  Mutation: {
    createBaby: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) =>
        firebase
          .createBaby(input)
          .then(addEdgeAndCursorToMutationResult(firebase.getBabies))
          .then(result => ({
            ...result,
            changedBaby: result.edge.node,
          })),
    ),

    updateBaby: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) =>
        firebase
          .updateBaby(fromGlobalId(input.id).id, input)
          .then(addEdgeAndCursorToMutationResult(firebase.getBabies))
          .then(result => ({
            ...result,
            changedBaby: result.edge.node,
          })),
    ),

    recordBabyMeasurement: mutationWithClientMutationId(
      ({ babyId, type, unit, value }, { connectors: { firebase } }) => {
        return firebase.recordMeasurement(
          fromGlobalId(babyId).id,
          type,
          unit,
          value,
        );
      },
    ),
  },

  Baby: {
    id: globalIdField(),
    dob: transform('dob', date => new Date(date)),
    gender: transform('gender', g => (g === 'm' ? 'MALE' : 'FEMALE')),

    avatar: obj =>
      obj.avatar ? pick(['url', 'thumb', 'large'], obj.avatar) : null,

    activities: ({ id }, args, { token }) =>
      connectionFromPromisedArray(
        connector.getActivities(token, id, args),
        args,
      ),

    activity: ({ id: babyId }, { id: activityId }, { token }) => {
      return connector.getActivity(token, fromGlobalId(activityId).id, babyId);
    },

    favoriteActivities: ({ id: babyId }, args, { token }) =>
      connectionFromPromisedArrayWithCount(
        connector.getFavoriteActivities(token, babyId),
        args,
      ),

    activityHistory: ({ id: babyId }, args, { token }) => {
      return connectionFromPromisedArrayWithCount(
        connector.getActivityHistory(token, babyId),
        args,
      );
    },

    growth: async (baby, args, { token, connectors: { firebase } }, info) => {
      const content = await connector.getGrowthContent(token, baby);

      const connection = connectionFromArray(content, args);

      const viewer = await firebase.getViewerWithProfile();

      // TODO: PERF don't do this unless we ask for current in the query
      connection.current =
        getClosestContentForPeriod(content, baby.dob) || last(content);

      if (
        typeof info.variableValues.hasSeenGlobalIntro !== 'undefined' &&
        info.variableValues.hasSeenGlobalIntro === false
      ) {
        const introduction = await connector.getIntroductionFor(
          token,
          baby,
          viewer.firstName || viewer.email,
        );

        return {
          ...connection,
          introduction,
        };
      }

      return connection;
    },

    relationship: ({ id }, _, { connectors: { firebase } }) =>
      firebase.getRelationship(id),

    measurements: ({ id }) => ({
      babyId: id,
    }),
  },

  Measurements: {
    heights: ({ babyId }, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        firebase.getBabyHeights(babyId),
        args,
      );
    },
    weights: ({ babyId }, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        firebase.getBabyWeights(babyId),
        args,
      );
    },
  },
};

export default resolvers;
