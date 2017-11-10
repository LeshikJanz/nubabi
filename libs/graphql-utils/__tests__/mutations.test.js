import {
  addEdgeAndCursorToMutationResult,
  addEdgeToMutationResult,
} from '../mutations';

describe('addEdgeToMutationResult', () => {
  it('adds the object as the edge field on a payload', () => {
    const obj = { id: '1' };
    expect(addEdgeToMutationResult(obj)).toEqual({
      edge: {
        node: obj,
      },
    });
  });
});

describe('addEdgeAndCursorToMutationResult', () => {
  it('adds cursor and object as the edge field on a payload', async () => {
    const obj = 2;
    const connectionGetter = () => Promise.resolve([1, 2, 3, 4]);
    const result = await addEdgeAndCursorToMutationResult(connectionGetter)(2);

    expect(result).toHaveProperty('edge');
    expect(result.edge.cursor).toBeTruthy();
    expect(result.edge.node).toEqual(obj);
  });
});
