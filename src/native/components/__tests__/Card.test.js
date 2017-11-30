import 'react-native';
import React from 'react';
import Card from '../Card';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<Card />);
});
