import reducer, { initialState } from '../reducer';
import { onAuth } from '../../app/actions';

test('has an initial state', () => {
  expect(reducer(undefined, { type: '@@INIT' })).toMatchSnapshot();
});

test('handles ON_AUTH', () => {
  expect(
    reducer(initialState, onAuth({ email: 'foo@example.com' })),
  ).toMatchSnapshot();

  expect(reducer(initialState, onAuth({ user: undefined }))).toMatchSnapshot();
});
