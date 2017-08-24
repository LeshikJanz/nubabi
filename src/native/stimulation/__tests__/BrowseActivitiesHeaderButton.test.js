import 'react-native';
import React from 'react';
import BrowseActivitiesHeaderButton from '../BrowseActivitiesHeaderButton';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<BrowseActivitiesHeaderButton />);
});
