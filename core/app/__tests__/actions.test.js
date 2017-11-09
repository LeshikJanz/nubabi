import { appOnline, appError, onAuth } from '../actions';

test('creates APP_ONLINE action', () => {
  expect(appOnline(true)).toMatchSnapshot();
});

test('creates APP_ERROR action', () => {
  expect(appError(new Error('foo'))).toMatchSnapshot();
});

test('creates ON_AUTH action', () => {
  expect(onAuth({ email: 'foo@example.com' }, 'TOKEN')).toMatchSnapshot();
});
