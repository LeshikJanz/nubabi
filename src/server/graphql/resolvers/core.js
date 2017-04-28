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
      return firebase.getViewer();
    },
  },
  User: {
    id: globalIdField('User', obj => obj.uid),
    avatar: obj => ({
      url: obj.avatar,
      thumb: obj.avatar_thumb ? { url: obj.avatar_thumb } : null,
      large: null,
    }),
    name: prop('displayName'),
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
