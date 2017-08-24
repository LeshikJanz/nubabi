import 'react-native';
import React from 'react';
import { Memories } from '../Memories';
import { expectRender } from '../../shared/testUtils';

jest.mock('../ViewMemories', () => () => null);
test('it renders correctly', () => {
  expectRender(<Memories />);
});
