// @flow
import {
  globalIdField,
  fromGlobalId,
  connectionFromPromisedArrayWithCount,
  toDate,
  transform,
  mutationWithClientMutationId,
} from './common';
import { addEdgeToMutationResult } from '../../../common/helpers/graphqlUtils';

export const resolvers = {
  Mutation: {
    createMemory: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        return firebase
          .createMemory(fromGlobalId(input.babyId).id, input)
          .then(memory => ({
            memory,
            ...addEdgeToMutationResult(memory),
          }));
      },
    ),
    updateMemory: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        return firebase
          .updateMemory(fromGlobalId(input.id).id, input)
          .then(addEdgeToMutationResult);
      },
    ),
  },
  Baby: {
    memories: ({ id }, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        firebase.getMemories(id),
        args,
      );
    },
    memory: (_, { id }, { connectors: { firebase } }) => {
      return firebase.getMemory(fromGlobalId(id).id);
    },
  },
  Memory: {
    id: globalIdField(),
    files: ({ files }, args, { connectors: { firebase } }) => {
      return connectionFromPromisedArrayWithCount(
        Promise.resolve(firebase.nestedArrayToArray(files)),
        args,
      );
    },
    comments: ({ comments = [] }, args) => {
      return connectionFromPromisedArrayWithCount(
        Promise.resolve(comments),
        args,
      );
    },
    createdAt: transform('createdAt', toDate),
    author: ({ authorId }, _, { connectors: { firebase } }) => {
      return firebase.getUser(authorId);
    },
  },
};

export default resolvers;
