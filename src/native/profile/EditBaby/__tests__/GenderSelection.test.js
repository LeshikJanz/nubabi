import 'react-native';
import React from 'react';
import GenderSelection from '../GenderSelection';
import { expectRender } from '../../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<GenderSelection />);
});
