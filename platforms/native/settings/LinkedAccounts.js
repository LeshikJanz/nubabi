// @flow
import type { LinkedAccountsConnection } from 'core/types';
import React from 'react';
import { Box, Text } from '../components';
import LinkedAccountsList from './LinkedAccountsList';

type Props = {
  onLinkAccount: mixed => Promise<*>,
  linkedAccounts: LinkedAccountsConnection,
  onUnlinkAccount: string => Promise<*>,
};

export const LinkedAccounts = ({
  linkedAccounts,
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
        <Text medium size={4}>
          Linked Accounts
        </Text>
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
