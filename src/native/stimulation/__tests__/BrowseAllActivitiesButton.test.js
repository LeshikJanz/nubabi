import 'react-native';
import React from 'react';
import { BrowseAllActivitiesButton } from '../BrowseAllActivitiesButton';
import renderer from 'react-test-renderer';
import layoutTestProp from '../../shared/layoutTestProp';

test('it renders correctly', () => {
  const tree = renderer
    .create(<BrowseAllActivitiesButton layout={layoutTestProp} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
