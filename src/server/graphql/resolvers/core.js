import { GraphQLString } from 'graphql';
import { pick } from 'ramda';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import {
  nodeFieldResolver,
  globalIdField,
  mutationWithClientMutationId,
  transform,
  toDate,
} from './common';

const resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Time: GraphQLTime,
  Secret: GraphQLString, // TODO
  Query: {
    viewer: () => ({}),
    node: nodeFieldResolver,
  },
  Viewer: {
    user(_, args, { connectors: { firebase } }) {
      return firebase.getViewerWithProfile();
    },
  },
  User: {
    id: globalIdField('User', obj => obj.uid),
    dob: transform('dob', toDate),
    avatar: obj => {
      if (!obj.avatar) {
        return null;
      }

      const avatars = { url: obj.avatar.url };
      if (obj.avatar.thumb) {
        avatars.thumb = { url: obj.avatar.thumb.url };
      }

      if (obj.avatar.large) {
        avatars.large = { url: obj.avatar.large.url };
      }

      return avatars;
    },
    totalAchievements: () => 0, // TODO
    totalMemories: () => 0, // TODO
  },
  Node: {
    __resolveType(obj) {
      if (obj.email) {
        return 'User';
      }

      if (obj.weekBorn) {
        return 'Baby';
      }

      if (obj.introduction) {
        return 'Activity';
      }

      // TODO: extra models

      return null;
    },
    id: globalIdField(),
  },

  Mutation: {
    updateUser: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        return firebase
          .updateUser(input)
          .then(changedUser => ({ changedUser }));
      },
    ),
  },
};

export default resolvers;
