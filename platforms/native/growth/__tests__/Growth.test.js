import 'react-native';
import React from 'react';
import { Growth } from '../Growth';
import { expectRender } from '../../shared/testUtils';

jest.mock('../../components/Alert');

test('it renders correctly', () => {
  const baby = {
    name: 'TestBaby',
    weight: 30,
    height: 30,
    growth: {
      introduction: 'My Test Baby intro',
    },
  };

  const unitDisplay = {
    weight: 'kg',
    height: 'cm',
  };

  const onNavigate = jest.fn();

  expectRender(
    <Growth
      baby={baby}
      onNavigateToWhatYouNeedToKnow={onNavigate}
      onNavigateToGraphDetail={onNavigate}
      unitDisplay={unitDisplay}
    />,
  );

  unitDisplay.weight = 'lbs';
  unitDisplay.height = 'cm';

  expectRender(
    <Growth
      baby={baby}
      onNavigateToWhatYouNeedToKnow={onNavigate}
      onNavigateToGraphDetail={onNavigate}
      unitDisplay={unitDisplay}
    />,
  );
});
