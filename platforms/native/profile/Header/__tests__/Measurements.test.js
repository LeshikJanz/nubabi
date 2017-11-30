import 'react-native';
import React from 'react';
import Measurements from '../Measurements';
import { expectRender } from '../../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(
    <Measurements height={150} weight={60} heightUnit="cm" weightUnit="kg" />,
  );
});
