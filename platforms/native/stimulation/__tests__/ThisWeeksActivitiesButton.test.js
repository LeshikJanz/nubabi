import 'react-native';
import React from 'react';
import { ThisWeeksActivitiesButton } from '../ThisWeeksActivitiesButton';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

Date.now = jest.fn(() => new Date(2017, 7, 22));

test('it renders correctly', () => {
  expectRender(<ThisWeeksActivitiesButton layout={layoutTestProp} />);
});
