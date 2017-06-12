import 'react-native';
import React from 'react';
import { BrowseActivitiesButton } from '../BrowseActivitiesButton';
import renderer from 'react-test-renderer';
import layoutTestProp from '../../shared/layoutTestProp';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<BrowseActivitiesButton layout={layoutTestProp} />);
});
