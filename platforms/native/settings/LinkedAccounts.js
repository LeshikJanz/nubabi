// @flow
import type { LinkedAccountsConnection } from 'core/types';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box, Text } from '../components';
import LinkedAccountsList from './LinkedAccountsList';

type Props = {
  linkedAccounts: LinkedAccountsConnection,
  isAuthLinkingFetching: boolean,
  onLinkAccount: mixed => Promise<*>,
  onUnlinkAccount: string => Promise<*>,
};

export const LinkedAccounts = ({
  linkedAccounts,
  isAuthLinkingFetching,
  onLinkAccount,
  onUnlinkAccount,
}: Props) => {
  return (
    <Box>
      <Box
        borderBottomWidth={1}
        borderColor="separator"
        paddingBottom={0.2}
        marginBottom={0.5}
        style={style}
      >
        <Box flexDirection="row">
          <Text flex={1} medium size={4}>
            Linked Accounts
          </Text>
          {isAuthLinkingFetching && <ActivityIndicator />}
        </Box>
      </Box>
      <LinkedAccountsList
        linkedAccounts={linkedAccounts}
        onLinkAccount={onLinkAccount}
        onUnlinkAccount={onUnlinkAccount}
      />
    </Box>
  );
};

const style = () => ({ borderColor: '#eff1f7' });
export default LinkedAccounts;
