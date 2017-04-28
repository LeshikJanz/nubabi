import 'react-native';
import React from 'react';
import BrowseActivities from '../BrowseActivities';
import renderer from 'react-test-renderer';

jest.mock('../../components/Alert');

test.skip('it renders correctly', () => {
  const tree = renderer.create(<BrowseActivities />).toJSON();

  expect(tree).toMatchSnapshot();
});
