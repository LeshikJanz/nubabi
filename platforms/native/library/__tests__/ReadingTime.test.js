import 'react-native';
import React from 'react';
import ReadingTime from '../ReadingTime';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<ReadingTime minutes={3} />);
});
