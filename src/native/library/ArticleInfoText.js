// @flow
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Box, Text } from '../components';

type Props = {
  children: any,
  icon?: string,
};

export const ArticleInfoText = ({ children, icon }: Props) => {
  return (
    <Box flexDirection="row" alignItems="center" justifyContent="space-between">
      {icon &&
        <Icon name={icon} size={18} color="white" style={{ marginRight: 5 }} />}
      <Text color="white" bold spacing={-0.17} marginRight={1}>{children}</Text>
    </Box>
  );
};

export default ArticleInfoText;
