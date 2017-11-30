import { replaceEdge } from '../connection';

describe('replaceEdge', () => {
  const old = {
    memories: {
      edges: [
        { node: { id: 1, title: 'Foo' } },
        { node: { id: 2, title: 'Bar' } },
      ],
    },
  };

  it('replaces the edge with an updated edge', () => {
    const newMemoryEdge = { node: { id: 2, title: 'Baz' } };

    const newData = replaceEdge(old, ['memories', 'edges'], newMemoryEdge);

    expect(newData.memories.edges[1].node.title).toEqual('Baz');
  });

  it('returns null if the edge is not found in the original data', () => {
    const newMemoryEdge = { node: { id: 4, title: 'Bar' } };
    const newData = replaceEdge(old, ['memories', 'edges'], newMemoryEdge);
    expect(newData).toEqual(null);
  });
});
