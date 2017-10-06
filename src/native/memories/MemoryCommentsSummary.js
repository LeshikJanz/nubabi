// @flow
import type { CommentConnection } from '../../common/types';
import React from 'react';
import { gql } from 'react-apollo';
import { Box, Text, Icon } from '../components';
import theme from '../../common/themes/defaultTheme';

type Props = {
  connection: CommentConnection,
};

export const MemoryCommentsSummary = ({ connection }: Props) => {
  if (!connection.count) {
    return null;
  }

  return (
    <Box flexDirection="row" alignItems="center">
      <Icon name="md-chatboxes" color={theme.colors.gray} size={14} />
      <Text color="gray" letterSpacing={-0.14} marginLeft={0.5}>
        {connection.count} comments
      </Text>
    </Box>
  );
};

MemoryCommentsSummary.fragments = {
  summary: gql`
    fragment MemoryCommentsSummary on Memory {
      comments {
        count
      }
    }
  `,
};

export default MemoryCommentsSummary;
