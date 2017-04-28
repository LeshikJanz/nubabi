import { pick, assocPath } from 'ramda';
import * as connector from '../connectors/babiesConnector';
import {
  prop,
  transform,
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

    allSkillAreas: (_, args, { token }) =>
      connectionFromPromisedArray(connector.getSkillAreas(token), args),

    allExperts: (_, args, { token }) =>
      connectionFromPromisedArray(connector.getExperts(token), args),

    allActivities: (_, args, { token }) => {
      return connectionFromPromisedArrayWithCount(
        connector.getAllActivities(token),
        args,
      );
    },
    activity: (_, { id }, { token }) => {
      return connector.getActivity(token, fromGlobalId(id).id);
    },
  },
  Mutation: {
    createBaby: mutationWithClientMutationId((input, {
      connectors: { firebase },
    }) => firebase.createBaby(input).then(createdBaby => ({ createdBaby }))),

    updateBaby: mutationWithClientMutationId((input, {
      connectors: { firebase },
    }) =>
      firebase
        .updateBaby(fromGlobalId(input.id).id, input)
        .then(baby => ({ changedBaby: baby }))),

    swoopActivity: mutationWithClientMutationId(({ id, babyId }, { token }) =>
      connector
        .swoopActivity(token, fromGlobalId(babyId).id, fromGlobalId(id).id)
        .then(newActivity => ({ newActivity, oldActivityId: id }))),

    changeActivity: mutationWithClientMutationId(({ id, babyId, level }, {
      token,
    }) =>
      connector
        .changeActivityLevel(
          token,
          fromGlobalId(babyId).id,
          fromGlobalId(id).id,
          level,
        )
        .then(newActivity => ({ newActivity, oldActivityId: id }))),

    toggleActivityFavorite: mutationWithClientMutationId(({
      id,
      babyId,
      favorite,
    }, { token }) => {
      return connector
        .toggleActivityFavorite(
          token,
          fromGlobalId(babyId).id,
          fromGlobalId(id).id,
          favorite,
        )
        .then(() => ({ wasFavorited: favorite }));
    }),
  },
  Baby: {
    id: globalIdField(),
    dob: transform('dob', date => new Date(date)),
    gender: transform('gender', g => g === 'm' ? 'MALE' : 'FEMALE'),

    avatar: obj =>
      obj.avatar ? pick(['url', 'thumb', 'large'], obj.avatar) : null,

    activities: ({ id }, args, { token }) =>
      connectionFromPromisedArray(connector.getActivities(token, id), args),

    activity: ({ id: babyId }, { id: activityId }, { token }) =>
      connector.getActivity(token, fromGlobalId(activityId).id),

    favoriteActivities: ({ id: babyId }, args, { token }) =>
      connectionFromPromisedArrayWithCount(
        connector.getFavoriteActivities(token, babyId),
        args,
      ),

    relationship: ({ id }, _, { connectors: { firebase } }) =>
      firebase.getRelationship(id),
  },

  Activity: {
    id: globalIdField(),
    skillArea: (obj, args, { token }) =>
      connector.getSkillArea(token, obj['skill_area_id']), // eslint-disable-line dot-notation
    expert: (obj, args, { token }) =>
      connector.getExpert(token, obj['expert_id']), // eslint-disable-line dot-notation
  },
  SkillArea: {
    id: globalIdField(),
    completedIcon: prop('completed_icon'),
    image: connector.getSkillAreaImage,
  },
};

export default resolvers;
