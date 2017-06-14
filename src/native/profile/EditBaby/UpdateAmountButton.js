// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box } from '../../components';

type Props = {
  onPress: () => void,
  children: any,
};

export const UpdateAmountButton = ({ onPress, children }: Props) => {
  return (
    <Box as={TouchableOpacity} onPress={onPress} marginHorizontal={0.5}>
      {children}
    </Box>
  );
};

export default UpdateAmountButton;
