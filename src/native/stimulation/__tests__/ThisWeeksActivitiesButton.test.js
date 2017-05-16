import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThisWeeksActivitiesButton } from '../ThisWeeksActivitiesButton';
import layoutTestProp from '../../shared/layoutTestProp';

test('it renders correctly', () => {
  const tree = renderer
    .create(<ThisWeeksActivitiesButton layout={layoutTestProp} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
