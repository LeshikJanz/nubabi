import 'react-native';
import React from 'react';
import Pill from '../Pill';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<Pill />);
});

test('it can be given colors props', () => {
  expectRender(
    <Pill backgroundColor="blue" borderColor="gray" color="white" />,
  );
});
