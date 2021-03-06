import { GraphQLString } from 'graphql';
import { always, cond, equals, path, prop, T } from 'ramda';
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import GraphQLJSON from 'graphql-type-json';
// noinspection ES6UnusedImports
import {
  connectionFromPromisedArrayWithCount,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  nodeFieldResolver,
  toDate,
  transform,
} from './common';
import { addEdgeAndCursorToMutationResult } from 'graphql-utils/mutations';

const resolvers = {
  DateTime: GraphQLDateTime,
  Date: GraphQLDate,
  Time: GraphQLTime,
  Secret: GraphQLString, // TODO
  JSON: GraphQLJSON,
  Query: {
    viewer: () => ({}),
    node: nodeFieldResolver,
    ping: () => 'PONG',
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
    linkedAccounts: (_, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        firebase.getLinkedAccounts(),
        args,
      );
    },
    totalAchievements: () => 0, // TODO
    totalMemories: () => 0, // TODO
  },
  LinkedAccount: {
    id: globalIdField('LinkedAccount', prop('uid')),
    provider: ({ providerId }) => {
      return cond([
        [equals('facebook.com'), always('FACEBOOK')],
        [T, always(null)],
      ])(providerId);
    },
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
    thumb: ({ thumb }) => ({
      url: thumb
        ? thumb.url
        : 'https://firebasestorage.googleapis.com/v0/b/nubabitest1.appspot.com/o/lorem%2Fthumbnail.png?alt=media&token=3318131c-abdb-4d5a-acae-e8eba73aaad8',
    }),
  },
  Audio: {
    id: globalIdField('File'),
  },
  Node: {
    __resolveType(obj) {
      if (obj.weekBorn) {
        return 'Baby';
      }

      if (typeof obj.discipline !== 'undefined') {
        return 'Expert';
      }

      if (obj.name && obj.icon) {
        return 'SkillArea';
      }

      if (obj.title && obj.text) {
        return 'Article';
      }

      if (obj.name) {
        return 'Category'; // TODO: revisit this since is too broad
      }

      return null;
    },
    id: globalIdField(),
  },
  Commentable: {
    __resolveType(obj) {
      if (obj.title && obj.authorId) {
        return 'Memory';
      }

      return null;
    },
  },
  LikeEdge: {
    actor: ({ node: { id: userId } }, _, { connectors: { firebase } }) => {
      return firebase.getUser(userId);
    },
  },
  Comment: {
    id: globalIdField(),
    createdAt: transform('createdAt', toDate),
    updatedAt: transform('updatedAt', toDate),
    author: ({ authorId }, _, { connectors: { firebase } }) =>
      firebase.getUser(authorId),
    commentable: (
      { commentableType, commentableId },
      _,
      { connectors: { firebase } },
    ) => {
      return firebase.getCommentable(
        commentableType.toUpperCase(),
        commentableId,
      );
    },
  },
  Mutation: {
    updateUser: mutationWithClientMutationId(
      (input, { connectors: { firebase }, uploads }) => {
        return firebase
          .updateUser(input, uploads)
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
    createComment: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        return firebase
          .createComment(input)
          .then(
            addEdgeAndCursorToMutationResult(() =>
              firebase.getComments(
                input.commentableType.toUpperCase(),
                fromGlobalId(input.id).id,
              ),
            ),
          );
      },
    ),
  },
};

export default resolvers;
