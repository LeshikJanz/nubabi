import 'react-native';
import React from 'react';
import { EmptyMemories } from '../EmptyMemories';
import { expectRender, layoutTestProp } from '../../shared/testUtils';

jest.mock('../../stimulation/HeaderShape', () => () => null);

test('it renders correctly', () => {
  expectRender(<EmptyMemories layout={layoutTestProp} />);
});
