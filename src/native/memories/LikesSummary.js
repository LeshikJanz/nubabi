// @flow
import React from 'react';
import { Box, Text } from '../components';
import formatLikeMessage from '../../common/helpers/formatLikeMessage';
import LikeMemoryButton from './LikeMemoryButton';

type Props = {
  isLikedByViewer: boolean,
  likes: { count: number },
  onToggleLike: Function, // TODO
};

const noLikesText = (
  <Text flex={1} color="secondary">
    Be the first one to like this
  </Text>
);

export const LikesSummary = ({
  isLikedByViewer,
  likes: { count },
  onToggleLike,
  id,
}: Props) => {
  const summaryText = (
    <Text flex={1} medium>
      {formatLikeMessage(count, isLikedByViewer, 'liked this')}
    </Text>
  );

  return (
    <Box
      flexDirection="row"
      contentSpacing
      borderColor="separator"
      borderTopWidth={1}
      borderBottomWidth={1}
    >
      {count ? summaryText : noLikesText}
      <LikeMemoryButton
        id={id}
        isLikedByViewer={isLikedByViewer}
        onToggleLike={onToggleLike}
        likes={{ count }}
      />
    </Box>
  );
};

export default LikesSummary;
