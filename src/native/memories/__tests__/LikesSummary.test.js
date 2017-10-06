import 'react-native';
import React from 'react';
import LikesSummary from '../LikesSummary';
import { expectRender } from '../../shared/testUtils';

test('it renders correctly', () => {
  expectRender(<LikesSummary isLikedByViewer={false} likes={{ count: 0 }} />);
  expectRender(<LikesSummary isLikedByViewer likes={{ count: 1 }} />);
  expectRender(<LikesSummary isLikedByViewer likes={{ count: 2 }} />);
  expectRender(<LikesSummary isLikedByViewer={false} likes={{ count: 1 }} />);
  expectRender(<LikesSummary isLikedByViewer={false} likes={{ count: 2 }} />);
});
