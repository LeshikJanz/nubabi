import 'react-native';
import React from 'react';
import { Memories } from '../Memories';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<Memories />);
});
