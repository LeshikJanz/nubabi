import 'react-native';
import React from 'react';
import LikeMemoryButton from '../LikeMemoryButton';
import { expectRender } from '../../shared/testUtils';

describe('LikeMemoryButton', () => {
  it('renders correctly when liked by viewer', () => {
    expectRender(
      <LikeMemoryButton
        isLikedByViewer
        likes={{count: 5}}
      />,
    );
  });

  it('renders correctly when not liked by viewer', () => {
    expectRender(
      <LikeMemoryButton
        isLikedByViewer={false}
        likes={{count: 5}}
      />
    );
  });

  it('renders correctly when requested to add count', () => {
    expectRender(
      <LikeMemoryButton
        isLikedByViewer
        likes={{count: 5}}
        withCount
      />
    );
  });

  it('does not render like count even when requested if count is 0', () => {
    expectRender(
      <LikeMemoryButton
        isLikedByViewer
        likes={{count: 0}}
        withCount
      />
    );
  });
});
