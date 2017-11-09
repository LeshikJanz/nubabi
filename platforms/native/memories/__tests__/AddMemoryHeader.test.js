import 'react-native';
import React from 'react';
import AddMemoryHeader from '../AddMemoryHeader';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<AddMemoryHeader />);
});
