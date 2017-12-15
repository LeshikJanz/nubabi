import 'react-native';
import React from 'react';
import { RemoveMemoryButton } from '../RemoveMemoryButton';
import { expectRender } from '../../shared/testUtils';

describe('RemoveMemoryButton', () => {
  it('renders correctly', () => {
    expectRender(
      <RemoveMemoryButton

      />,
    );
  });
});
