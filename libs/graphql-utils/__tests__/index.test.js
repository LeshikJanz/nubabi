import graphqlUtils, { addEdgeToMutationResult, getTypenameForFile } from 'graphql-utils';

describe('graphql-utils', () => {
  test('ensures that we can import named, as default, and with module aliases', () => {
    [
      addEdgeToMutationResult,
      getTypenameForFile,
    ].forEach(fn => {
      expect(fn).toBeDefined();
    });

    expect(graphqlUtils.addEdgeToMutationResult).toBe(addEdgeToMutationResult);
  });
});
