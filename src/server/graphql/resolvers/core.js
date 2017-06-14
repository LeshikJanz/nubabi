import { GraphQLString } from 'graphql';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import { nodeFieldResolver, globalIdField, prop } from './common';

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
    avatar: obj => ({
      url: obj.avatar,
      thumb: obj.avatar ? { url: obj.avatar.thumb } : null,
      large: obj.avatar ? { url: obj.avatar.original } : null,
    }),
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

  Mutation: {},
};

export default resolvers;
