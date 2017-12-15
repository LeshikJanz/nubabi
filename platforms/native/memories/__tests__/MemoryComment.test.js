import 'react-native';
import React from 'react';
import MemoryComment from '../MemoryComment';
import { expectRender } from '../../shared/testUtils';

describe('MemoryComment', () => {
  it('renders correctly', () => {
    const comment = {
      id: 1,
      text: 'Some comment',
      createdAt: new Date(2017, 8, 8),
      author: {
        firstName: 'Alice',
        lastName: 'Doe',
        avatar: {
          url: 'http://example.com',
        },
      },
    };

    expectRender(<MemoryComment {...comment} />);
  });
});
