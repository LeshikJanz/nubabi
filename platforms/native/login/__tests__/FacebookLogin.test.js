import 'react-native';
import React from 'react';
import { FacebookLogin } from '../FacebookLogin';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<FacebookLogin />);
});
