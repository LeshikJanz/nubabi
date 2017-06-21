import 'react-native';
import React from 'react';
import { Growth } from '../Growth';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/Alert');
jest.mock('../CombinedChart', () => () => null);

test('it renders correctly', () => {
  const baby = {
    name: 'TestBaby',
    growth: {
      introduction: 'My Test Baby intro',
    },
  };

  const onNavigate = jest.fn();

  expectRender(
    <Growth
      baby={baby}
      onNavigateToWhatYouNeedToKnow={onNavigate}
      onNavigateToGraphDetail={onNavigate}
    />,
  );
});
