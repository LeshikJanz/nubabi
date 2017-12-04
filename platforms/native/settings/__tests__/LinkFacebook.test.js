import 'react-native';
import React from 'react';
import LinkFacebook from '../LinkFacebook';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<LinkFacebook />);
});
