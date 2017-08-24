// @flow
import type { Comment } from '../../common/types';
import React from 'react';
import { gql } from 'react-apollo';
import moment from 'moment';
import { Box, Text } from '../components';

type Props = Comment & {};

export const MemoryComment = ({ text, author, createdAt }: Props) => {
  const timestamp = moment(createdAt);

  let format = 'D MMMM HH:mm';

  if (timestamp.year() !== moment().year()) {
    format = 'D MMMM YYYY';
  }

  const metadataText = [
    author.firstName,
    author.lastName,
    '•',
    timestamp.format(format),
  ].join(' ');

  return (
    <Box contentSpacing>
      <Box>
        <Text style={() => ({ letterSpacing: 0.17, lineHeight: 20 })}>
          {text}
        </Text>
      </Box>
      <Box marginTop={0.5}>
        <Text color="secondary">
          {metadataText}
        </Text>
      </Box>
    </Box>
  );
};

MemoryComment.fragments = {
  comment: gql`
    fragment MemoryComment on Comment {
      text
      createdAt
      author {
        firstName
        lastName
      }
    }
  `,
};

export default MemoryComment;
