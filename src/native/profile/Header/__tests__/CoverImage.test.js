import 'react-native';
import React from 'react';
import CoverImage from '../CoverImage';
import { expectRender } from '../../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<CoverImage />);
});
