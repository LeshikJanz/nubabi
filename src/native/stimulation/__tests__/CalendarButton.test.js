import 'react-native';
import React from 'react';
import CalendarButton from '../BrowseActivitiesHeaderButton';
import renderer from 'react-test-renderer';

test('it renders correctly', () => {
  Date.now = jest.fn(() => new Date(2017, 3, 14));

  const tree = renderer.create(<CalendarButton />).toJSON();

  expect(tree).toMatchSnapshot();
});
