// @flow
import type { CommentConnection } from '../../common/types';
import React from 'react';
import { Box, Text } from '../components';

type Props = {
  comments: CommentConnection,
};

export const MemoryComments = () => {
  return (
    <Box
      borderTopWidth={1}
      padding={1}
      style={() => ({ borderColor: '#E9ECF4' })}
    >
      <Text>Add Comment</Text>
    </Box>
  );
};

export default MemoryComments;
