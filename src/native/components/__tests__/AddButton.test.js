import 'react-native';
import React from 'react';
import AddButton from '../AddButton';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<AddButton />);
});
