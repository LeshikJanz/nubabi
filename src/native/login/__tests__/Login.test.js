import 'react-native';
import React from 'react';
import { Login } from '../Login';
import renderer from 'react-test-renderer';

jest.mock('../../components/Alert');

test('renders correctly', () => {
  const tree = renderer
    .create(<Login isFetching={false} actions={{}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

test('show progress when logging in', () => {
  const tree = renderer.create(<Login isFetching actions={{}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
