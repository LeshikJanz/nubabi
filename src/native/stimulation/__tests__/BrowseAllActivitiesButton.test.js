import 'react-native';
import React from 'react';
import BrowseAllActivitiesButton from '../BrowseAllActivitiesButton';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<BrowseAllActivitiesButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
