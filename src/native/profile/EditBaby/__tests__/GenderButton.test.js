import 'react-native';
import React from 'react';
import GenderButton from '../GenderButton';
import { expectRender } from '../../../shared/testUtils';

test('it renders correctly when selected', () => {
  expectRender(<GenderButton selected buttonText="GIRL" />);
});

test('it renders correctly when not selected', () => {
  expectRender(<GenderButton selected={false} buttonText="BOY" />);
});
