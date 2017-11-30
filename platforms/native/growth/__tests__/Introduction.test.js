import 'react-native';
import React from 'react';
import Introduction from '../Introduction';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<Introduction text="This is the introduction" />);
});
