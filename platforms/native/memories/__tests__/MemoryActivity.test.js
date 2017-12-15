import 'react-native';
import React from 'react';
import { MemoryActivity } from '../MemoryActivity';
import { expectRender } from '../../shared/testUtils';

describe('MemoryActivity', () => {
  it('renders correctly', () => {
    const navigate = jest.fn();

    expectRender(
      <MemoryActivity
        name="Do something fun"
        navigate={navigate}
        skillArea={{
          id: 1,
          icon: 'icon-thinking'
        }}
      />,
    );
  });
});
