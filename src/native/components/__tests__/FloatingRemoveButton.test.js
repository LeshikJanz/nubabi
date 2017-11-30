import 'react-native';
import React from 'react';
import FloatingRemoveButton from '../FloatingRemoveButton';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<FloatingRemoveButton />);
});
