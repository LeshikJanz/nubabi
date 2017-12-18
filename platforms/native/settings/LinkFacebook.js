// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '../components';
import FacebookIcon from './FacebookIcon';

type Props = {
  onLinkAccount: () => void,
};

export const LinkFacebook = ({ onLinkAccount }: Props) => {
  return (
    <Box
      as={TouchableOpacity}
      onPress={onLinkAccount}
      flexDirection="row"
      alignItems="center"
    >
      <FacebookIcon />
      <Text flex={1} marginLeft={0.5} color="success" medium spacing={-0.45}>
        Link Facebook account
      </Text>
    </Box>
  );
};

export default LinkFacebook;
