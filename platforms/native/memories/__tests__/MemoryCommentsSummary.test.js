import 'react-native';
import React from 'react';
import MemoryCommentsSummary from '../MemoryCommentsSummary';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<MemoryCommentsSummary connection={{ count: 0 }} />);

  expectRender(<MemoryCommentsSummary connection={{ count: 4 }} />);
});
