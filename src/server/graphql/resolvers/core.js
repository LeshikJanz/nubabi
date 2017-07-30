import { GraphQLString } from 'graphql';
import R, { path, prop, pick, assocPath, map, compose, assoc } from 'ramda';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import {
  nodeFieldResolver,
  globalIdField,
  mutationWithClientMutationId,
  transform,
  toDate,
  connectionFromPromisedArrayWithCount,
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
    friends: async (_, args, { connectors: { firebase } }) => {
      const connection = await connectionFromPromisedArrayWithCount(
        firebase.getFriends(),
        args,
      );

      return {
        ...connection,
        edges: connection.edges.map(edge => {
          ['relationship', 'isPending'].forEach(key => {
            // eslint-disable-next-line no-param-reassign
            edge[key] = path(['node', key], edge);
          });
          return edge;
        }),
      };
    },
  },
  User: {
    id: globalIdField('User', obj => obj.id || obj.uid),
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
  File: {
    __resolveType: ({ contentType }) => {
      if (contentType.startsWith('image')) {
        return 'Image';
      } else if (contentType.startsWith('video')) {
        return 'Video';
      } else if (contentType.startsWith('audio')) {
        return 'Audio';
      }

      return 'GenericFile';
    },
    id: globalIdField(),
  },
  // Backwards-compatibility for Avatars
  Avatar: {
    contentType: obj => obj.contentType || 'image/jpeg',
    name: obj => obj.name || 'avatar.jpg',
    size: () => 0, // TODO: fetch size from firebase
  },
  Image: {
    id: globalIdField(),
    contentType: obj => obj.contentType || 'image/jpeg',
    name: obj => obj.name || 'image.jpg',
    size: () => 0, // TODO: fetch size from firebase
  },
  Video: {
    id: globalIdField('File'),
    // TODO: mocked
    thumb: () => ({
      url:
        'https://firebasestorage.googleapis.com/v0/b/nubabitest1.appspot.com/o/lorem%2Fthumbnail.png?alt=media&token=3318131c-abdb-4d5a-acae-e8eba73aaad8',
    }),
  },
  Audio: {
    id: globalIdField('File'),
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
    inviteUser: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        const { inviteToken, relationship } = input;
        return firebase.inviteUser(input).then(invitedUser => {
          // eslint-disable-next-line no-param-reassign
          invitedUser.id = inviteToken;

          return {
            inviteToken,
            invitedUser,
            changedEdge: {
              relationship,
              isPending: true,
              node: invitedUser,
            },
          };
        });
      },
    ),
  },
};

export default resolvers;
