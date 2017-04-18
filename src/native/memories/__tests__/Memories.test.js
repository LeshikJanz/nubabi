import 'react-native';
import React from 'react';
import Memories from '../Memories';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<Memories />).toJSON();

  expect(tree).toMatchSnapshot();
});
