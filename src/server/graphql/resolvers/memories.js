// @flow
// noinspection ES6UnusedImports
import {
  connectionFromPromisedArrayWithCount,
  fromGlobalId,
  globalIdField,
  mutationWithClientMutationId,
  runFirebaseTask,
  toDate,
  transform,
} from './common';
import { addEdgeAndCursorToMutationResult } from '../../../common/helpers/graphqlUtils';

export const resolvers = {
  Mutation: {
    createMemory: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        const babyId = fromGlobalId(input.babyId).id;

        return firebase
          .createMemory(babyId, input)
          .then(
            addEdgeAndCursorToMutationResult(() =>
              firebase.getMemories(babyId),
            ),
          );
      },
    ),
    updateMemory: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        return firebase
          .updateMemory(fromGlobalId(input.id).id, input)
          .then(memory => {
            return addEdgeAndCursorToMutationResult(
              () => firebase.getMemories(memory.babyId),
              memory,
            );
          });
      },
    ),
    deleteMemory: mutationWithClientMutationId(
      (input, { connectors: { firebase } }) => {
        return runFirebaseTask(
          firebase.deleteMemory(fromGlobalId(input.id).id),
          memory => ({ memory }),
        );
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
