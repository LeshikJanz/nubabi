import reducer, { initialState } from '../reducer';
import {
  getBabiesFailure,
  getBabiesRequest,
  getBabiesSuccess,
  selectBaby,
} from '../actions';

describe('babies reducer', () => {
  it('has an initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
  });

  it('handles GET_BABIES_REQUEST', () => {
    expect(reducer(initialState, getBabiesRequest())).toMatchSnapshot();
  });

  it('handles GET_BABIES_FAILURE', () => {
    expect(reducer(initialState, getBabiesFailure())).toMatchSnapshot();
  });

  it('handles GET_BABIES_SUCCESS', () => {
    expect(
      reducer(initialState, getBabiesSuccess([{ id: 1, name: 'Foo' }])),
    ).toMatchSnapshot();
  });

  it('handles SELECT_BABY', () => {
    expect(reducer(initialState, selectBaby(1))).toMatchSnapshot();
  });
});
