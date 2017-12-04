// @flow
import type { LinkedAccount } from 'core/types';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { always, compose, cond, equals, T } from 'ramda';
import { gql } from 'react-apollo';
import { withHandlers } from 'recompose';
import { Box, Text } from '../components';
import FacebookIcon from './FacebookIcon';
import hoistStatics from '../components/hoistStatics';

type Props = LinkedAccount;

export const LinkedAccountItem = ({
  displayName,
  provider,
  onUnlink,
}: Props) => {
  const Icon = cond([
    [equals('FACEBOOK'), always(FacebookIcon)],
    [T, always(() => null)],
  ])(provider);

  return (
    <Box flexDirection="row" alignItems="center">
      <Icon />
      <Text size={2} flex={1} marginLeft={0.5}>
        {displayName}
      </Text>
      <Box as={TouchableOpacity} onPress={onUnlink}>
        <Text color="secondary">Unlink</Text>
      </Box>
    </Box>
  );
};

LinkedAccountItem.fragments = {
  item: gql`
    fragment LinkedAccountItem on LinkedAccount {
      id
      provider
      displayName
    }
  `,
};

export default compose(
  hoistStatics(
    withHandlers({
      onUnlink: ({ id, provider, onUnlinkItem }) => () =>
        onUnlinkItem(id, provider),
    }),
  ),
)(LinkedAccountItem);
