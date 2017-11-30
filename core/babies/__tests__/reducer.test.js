import reducer, { initialState } from '../reducer';
import {
  getBabiesFailure,
  getBabiesRequest,
  getBabiesSuccess,
  selectBaby,
} from '../actions';

test('handles GET_BABIES_REQUEST', () => {
  expect(reducer(initialState, getBabiesRequest())).toMatchSnapshot();
});

test('handles GET_BABIES_FAILURE', () => {
  expect(reducer(initialState, getBabiesFailure())).toMatchSnapshot();
});

test('handles GET_BABIES_SUCCESS', () => {
  expect(
    reducer(initialState, getBabiesSuccess([{ id: 1, name: 'Foo' }])),
  ).toMatchSnapshot();
});

test('handles SELECT_BABY', () => {
  expect(reducer(initialState, selectBaby(1))).toMatchSnapshot();
});
