/* eslint-disable arrow-parens */
import * as connector from '../connectors/babiesConnector';
import {
  prop,
  transform,
  connectionFromPromisedArray,
  globalIdField,
  fromGlobalId,
  mutationWithClientMutationId,
} from './common';
import { pick } from 'ramda';

const resolvers = {
  Viewer: {
    babies: (_, args, { connectors: { firebase } }) =>
      connectionFromPromisedArray(firebase.getBabies(), args),
    baby: (_, { id }, { connectors: { firebase } }) => {
      return firebase.getBaby(fromGlobalId(id).id);
    },
    allSkillAreas: (_, args, { token }) =>
      connectionFromPromisedArray(connector.getSkillAreas(token), args),
    allExperts: (_, args, { token }) =>
      connectionFromPromisedArray(connector.getExperts(token), args),
  },
  Mutation: {
    createBaby: mutationWithClientMutationId((input, {
      connectors: { firebase },
    }) => {
      return firebase.createBaby(input).then(createdBaby => ({ createdBaby }));
    }),
    updateBaby: mutationWithClientMutationId((input, {
      connectors: { firebase },
    }) => {
      return firebase
        .updateBaby(fromGlobalId(input.id).id, input)
        .then(baby => ({ changedBaby: baby }));
    }),
  },
  Baby: {
    id: globalIdField(),
    dob: transform('dob', date => new Date(date)),
    gender: transform('gender', g => g === 'm' ? 'MALE' : 'FEMALE'),
    avatar: obj => {
      return {
        url: obj.avatar.url,
        thumb: obj.avatar.thumb,
        large: obj.avatar.large,
      };
    },
    activities: ({ id }, args, { token }) => {
      return connectionFromPromisedArray(
        connector.getActivities(token, id),
        args,
      );
    },
    activity: ({ id: babyId }, { id: activityId }, { token }) => {
      return connector.getActivity(token, babyId, fromGlobalId(activityId).id);
    },
    relationship: ({ id }, _, { connectors: { firebase } }) => {
      return firebase.getRelationship(id);
    },
  },
  Activity: {
    id: globalIdField(),
    isFavorite: prop('favourite'),
    skillArea: (obj, args, { token }) =>
      connector.getSkillArea(token, obj['skill_area_id']), // eslint-disable-line dot-notation
    expert: (obj, args, { token }) =>
      connector.getExpert(token, obj['expert_id']), // eslint-disable-line dot-notation
  },
  SkillArea: {
    id: globalIdField(),
    completedIcon: prop('completed_icon'),
    image: obj => {
      const thumb = prop('thumbnail')(obj);
      const large = prop('cover_image')(obj);

      if (thumb || large) {
        const images = {};

        if (thumb) {
          images.thumb = { url: thumb };
        }

        if (large) {
          images.large = { url: large };
        }

        // default url to one image
        images.url = large || thumb;

        return images;
      }

      return null;
    },
  },
  Achievement: {
    id: globalIdField(),
  },
};

export default resolvers;
