import 'react-native';
import React from 'react';
import ThisWeeksActivitiesButton from '../ThisWeeksActivitiesButton';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  const tree = renderer.create(<ThisWeeksActivitiesButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
