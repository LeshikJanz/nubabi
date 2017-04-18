import {
  selectBaby,
  getBabiesRequest,
  getBabiesFailure,
  getBabiesSuccess,
} from '../actions';

test('creates GET_BABIES_REQUEST action', () => {
  expect(getBabiesRequest()).toMatchSnapshot();
});

test('creates GET_BABIES_FAILURE action', () => {
  expect(getBabiesFailure(new Error('foo'))).toMatchSnapshot();
});

test('creates GET_BABIES_SUCCESS action', () => {
  expect(getBabiesSuccess([{ id: 1, name: 'Foo' }])).toMatchSnapshot();
});

test('creates SELECT_BABY action', () => {
  expect(selectBaby(1)).toMatchSnapshot();
});
