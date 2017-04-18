import 'react-native';
import React from 'react';
import { Login } from '../Login';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer
    .create(
      <Login isFetching={false} auth={{ errorMessage: '' }} actions={{}} />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('show progress when logging in', () => {
  const tree = renderer
    .create(<Login isFetching auth={{ errorMessage: '' }} actions={{}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('shows error if one occurs', () => {
  const tree = renderer
    .create(
      <Login
        isFetching={false}
        auth={{ errorMessage: 'Invalid email/password' }}
        actions={{}}
      />,
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
