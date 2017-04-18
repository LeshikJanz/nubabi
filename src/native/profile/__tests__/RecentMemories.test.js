import 'react-native';
import React from 'react';
import RecentMemories from '../RecentMemories';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<RecentMemories />).toJSON();

  expect(tree).toMatchSnapshot();
});
