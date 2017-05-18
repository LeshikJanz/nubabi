import { pick, assocPath } from 'ramda';
import * as connector from '../connectors/babiesConnector';
import {
  prop,
  transform,
  connectionFromArray,
  connectionFromPromisedArray,
  connectionFromPromisedArrayWithCount,
  globalIdField,
  fromGlobalId,
  mutationWithClientMutationId,
} from './common';

const resolvers = {
  Viewer: {
    babies: (_, args, { connectors: { firebase } }) =>
      connectionFromPromisedArray(firebase.getBabies(), args),

    baby: (_, { id }, { connectors: { firebase } }) =>
      firebase.getBaby(fromGlobalId(id).id),
  },

  Mutation: {
    createBaby: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) =>
        firebase.createBaby(input).then(createdBaby => ({ createdBaby })),
    ),

    updateBaby: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) =>
        firebase
          .updateBaby(fromGlobalId(input.id).id, input)
          .then(baby => ({ changedBaby: baby })),
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
      connectionFromPromisedArray(connector.getActivities(token, id), args),

    activity: ({ id: babyId }, { id: activityId }, { token }) => {
      return connector.getActivity(token, fromGlobalId(activityId).id, babyId);
    },

    favoriteActivities: ({ id: babyId }, args, { token }) =>
      connectionFromPromisedArrayWithCount(
        connector.getFavoriteActivities(token, babyId),
        args,
      ),

    growth: async (baby, args, { token, connectors: { firebase } }, info) => {
      const connection = await connectionFromPromisedArray(
        connector.getGrowthContent(token, baby),
        args,
      );

      const viewer = await firebase.getViewer();

      if (
        typeof info.variableValues.hasSeenGlobalIntro !== 'undefined' &&
        info.variableValues.hasSeenGlobalIntro === false
      ) {
        const introduction = await connector.getIntroductionFor(
          token,
          baby,
          viewer.displayName || viewer.email,
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
  },

  Growth: {
    id: globalIdField(),
    minimumAge: prop('age_min'),
    maximumAge: prop('age_max'),
    ageDuration: transform('age_duration', duration => duration.toUpperCase()),
    // TODO: extract method
    content: async (obj, _, { connectors: { firebase } }) => {
      const template = prop('growth_development')(obj);

      return connector.makeStringFromTemplate(
        template,
        await connector.getTemplateVariables(firebase, obj.baby),
      );
    },
    introduction: async (obj, _, { connectors: { firebase } }) => {
      const template = obj.introduction;

      return connector.makeStringFromTemplate(
        template,
        await connector.getTemplateVariables(firebase, obj.baby),
      );
    },
    expert: (obj, _, { token }) => {
      return connector.getExpert(token, prop('expert_id')(obj));
    },
  },
};

export default resolvers;
