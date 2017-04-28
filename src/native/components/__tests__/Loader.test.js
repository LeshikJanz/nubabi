import 'react-native';
import React from 'react';
import Loader from '../Loader';
import renderer from 'react-test-renderer';

jest.mock('Alert');

test('it renders correctly', () => {
  const tree = renderer.create(<Loader />).toJSON();

  expect(tree).toMatchSnapshot();
});

test('it can customize the size and color', () => {
  const tree = renderer.create(<Loader size={20} color="blue" />);

  expect(tree).toMatchSnapshot();
});
