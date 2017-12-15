import reducer from '../reducer';

describe('device reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });
});
