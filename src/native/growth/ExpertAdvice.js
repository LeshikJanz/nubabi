// @flow
import type { Avatar } from '../../common/types';
import React from 'react';
import { Image } from 'react-native';
import { gql } from 'react-apollo';
import { Box, Text } from '../components';

type Props = {
  avatar: Avatar,
  name: string,
  discipline: string,
};

export const ExpertAdvice = ({ name, discipline, avatar }: Props) => {
  return (
    <Box borderBottomWidth={1} style={() => ({ borderColor: '#E9ECF4' })}>
      <Box padding={1}>
        <Text
          bold
          style={theme => ({ color: theme.colors.open.blue0 })}
          marginBottom={1}
        >
          EXPERT ADVICE BY
        </Text>
        <Box flex={1} flexDirection="row" justifyContent="center">
          <Image
            source={{ uri: avatar.url }}
            style={{ width: 46, height: 45 }}
            borderRadius={46 / 2}
          />
          <Box flex={1} justifyContent="space-around" marginLeft={1}>
            <Text bold spacing={-0.39} size={1}>
              {name}
            </Text>
            <Text color="secondary" spacing={-0.39}>
              {discipline}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

ExpertAdvice.fragments = {
  expert: gql`
    fragment ExpertAdvice on Expert {
      name
      discipline
      avatar {
        url
      }
    }
  `,
};

export default ExpertAdvice;
