import 'react-native';
import React from 'react';
import Growth from '../Growth';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<Growth />).toJSON();

  expect(tree).toMatchSnapshot();
});
