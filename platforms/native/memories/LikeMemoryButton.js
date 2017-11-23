// @flow
import type { ToggleMemoryLikeInput } from 'core/types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { gql } from 'react-apollo';
import { compose, propOr } from 'ramda';
import { hoistStatics, withHandlers } from 'recompose';
import { Box, Icon, Text } from '../components';
import theme from 'core/themes/defaultTheme';

type Props = {
  isLikedByViewer: boolean,
  onToggleLike: (input: ToggleMemoryLikeInput) => Promise<ApolloQueryResult<*>>,
  onToggle: (isLiked: boolean) => void,
  likes?: { count: number },
  withCount?: boolean,
};

type InputProps = Props & {
  id: string,
}

export const LikeMemoryButton = ({
  onToggle,
  isLikedByViewer: isLiked,
  likes,
  withCount = false,
}: Props) => {
  const iconName = isLiked ? 'md-heart' : 'md-heart-outline';
  const iconColor = isLiked ? theme.colors.primary : theme.colors.secondary;
  const likeCount = propOr(0, ['count'], likes);

  return (
    <Box flexDirection="row">
      <Box as={TouchableOpacity} onPress={onToggle}>
        <Icon
          name={iconName}
          size={16}
          color={iconColor}
          style={{ marginRight: 5 }}
        />
      </Box>
      {likeCount > 0 && withCount && <Text color="secondary">{likeCount}</Text>}
    </Box>
  );
};

LikeMemoryButton.fragments = {
  item: gql`
    fragment LikeMemoryButton on Memory {
      id
      isLikedByViewer
      likes {
        count
        edges {
          actor {
            firstName
          }
        }
      }
    }
  `,
};

export default hoistStatics(
  compose(
    withHandlers({
      onToggle: ({ id, onToggleLike, isLikedByViewer, likes }: InputProps) => () =>
        onToggleLike(id, !isLikedByViewer, likes.count),
    }),
  ),
)(LikeMemoryButton);
