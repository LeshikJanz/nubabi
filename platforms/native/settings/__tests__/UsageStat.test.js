import 'react-native';
import React from 'react';
import UsageStat from '../UsageStat';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<UsageStat subject="baby" count={1} />);

  expectRender(<UsageStat subject="memory" count={0} />);
});
