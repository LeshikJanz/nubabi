import reducer, { initialState } from '../reducer';
import { onAuth } from '../../app/actions';

test('handles ON_AUTH', () => {
  expect(
    reducer(initialState, onAuth({ email: 'foo@example.com' })),
  ).toMatchSnapshot();
});
