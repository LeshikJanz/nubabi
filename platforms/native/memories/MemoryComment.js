// @flow
import type { MemoryCommentFragment } from 'core/types';
import React from 'react';
import { path } from 'ramda';
import { gql } from 'react-apollo';
import moment from 'moment';
import { Avatar, Box, Text } from '../components';

type Props = MemoryCommentFragment & {};

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

  const avatar = path(['avatar', 'url'], author);

  return (
    <Box contentSpacing flexDirection="row">
      <Box
        style={() => ({ marginRight: 10 })}
        alignItems="center"
        marginTop={0.5}
        justifyContent="flex-start"
      >
        <Avatar src={avatar} size={30} />
      </Box>
      <Box flex={1}>
        <Box>
          <Text
            style={() => ({
              letterSpacing: 0.17,
              lineHeight: 20,
              fontSize: 14,
              marginRight: 16,
            })}
          >
            {text}
          </Text>
        </Box>
        <Box marginTop={0.5}>
          <Text color="secondary">{metadataText}</Text>
        </Box>
      </Box>
    </Box>
  );
};

MemoryComment.fragments = {
  comment: gql`
    fragment MemoryComment on Comment {
      id
      text
      createdAt
      author {
        id
        firstName
        lastName
        avatar {
          url
        }
      }
    }
  `,
};

export default MemoryComment;
