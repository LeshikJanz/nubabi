import {
  addEdgeAndCursorToMutationResult,
  addEdgeToMutationResult,
  flattenEdges,
  formValues,
  isEmpty,
  isEmptyPath,
  isEmptyProp,
  mapEdgesToProp,
} from '../graphqlUtils';

describe('flattenEdges', () => {
  it('returns an Array from a GraphQL connection', () => {
    const result = flattenEdges({
      edges: [
        {
          node: { id: '1' },
        },
        {
          node: { id: '2' },
        },
      ],
    });

    expect(result).toEqual([{ id: '1' }, { id: '2' }]);
  });

  it('returns an empty array if no edges are passed', () => {
    expect(flattenEdges({})).toEqual([]);
  });
});

describe('isEmpty', () => {
  it('returns true if a collection is empty', () => {
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });

  it('returns true if the passed value is undefined', () => {
    expect(isEmpty()).toBe(true);
  });

  it('return false if the passed value is not undefined', () => {
    expect(isEmpty(6)).toBe(false);
  });

  it('returns false if passed a collection with at least one item', () => {
    expect(isEmpty([1])).toBe(false);
  });
});

describe('isEmptyProp', () => {
  it('runs isEmpty on a property of the object passed', () => {
    expect(isEmptyProp('items', { items: [] })).toBe(true);
    expect(isEmptyProp('items', { items: [1] })).toBe(false);
  });
});

describe('isEmptyPath', () => {
  it('runs isEmpty on a path of the object passed', () => {
    const empty = { items: { relation: [] } };
    const notEmpty = { items: { relation: [1] } };
    const path = ['items', 'relation'];

    expect(isEmptyPath(path, empty)).toBe(true);
    expect(isEmptyPath(path, notEmpty)).toBe(false);
  });
});

describe('formValues', () => {
  it('strips __typename and id from an object', () => {
    const obj = { id: '1', __typename: 'Some', name: 'Foo' };
    expect(formValues(obj)).toEqual({ name: 'Foo' });
  });
});

describe('mapEdgesToProp', () => {
  it('add edges as a prop', () => {
    const data = {
      viewer: {
        babies: {
          edges: [{ node: { id: '1' } }],
        },
      },
    };

    const result = mapEdgesToProp('viewer.babies', 'babies', data);

    expect(result).toEqual({
      data,
      babies: [{ id: '1' }],
    });
  });
});

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
