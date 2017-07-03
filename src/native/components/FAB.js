// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from './Box';
import Text from './Text';

type Props = {
  onPress?: () => void,
  style?: Object | number,
  children: any,
  size?: number,
};

export const FAB = ({ onPress, children, size = 70, style = {} }: Props) => {
  const buttonProps = onPress ? { as: TouchableOpacity, onPress } : {};

  return (
    <Box
      {...buttonProps}
      alignItems="center"
      justifyContent="center"
      style={() => ({
        zIndex: 999,
        backgroundColor: '#fff',
        height: size,
        width: size,
        borderRadius: size / 2,
        shadowOpacity: 0.15,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowRadius: 1,
        ...style,
      })}
    >
      {children}
    </Box>
  );
};

export default FAB;
