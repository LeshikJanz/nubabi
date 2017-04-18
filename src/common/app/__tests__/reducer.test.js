import reducer, { initialState } from '../reducer';
import { appError, appOnline } from '../actions';

test('maps all actions ending with FAILURE to APP_ERROR', () => {
  expect(reducer(initialState, appError(new Error('foo')))).toMatchSnapshot();
});

test('handles APP_ERROR', () => {
  expect(reducer(initialState, appError(new Error('bar')))).toMatchSnapshot();
});

test('handles APP_ONLINE', () => {
  expect(reducer(initialState, appOnline(true))).toMatchSnapshot();
});
