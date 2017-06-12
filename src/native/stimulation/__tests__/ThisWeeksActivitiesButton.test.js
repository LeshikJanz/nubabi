import 'react-native';
import React from 'react';
import { ThisWeeksActivitiesButton } from '../ThisWeeksActivitiesButton';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<ThisWeeksActivitiesButton layout={layoutTestProp} />);
});
