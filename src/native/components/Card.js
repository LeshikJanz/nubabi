// @flow
import type { BoxProps } from './Box';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from './Box';

export const Card = (props: BoxProps) => {
  const children = props.onPress
    ? <TouchableOpacity onPress={props.onPress}>
        {props.children}
      </TouchableOpacity>
    : props.children;

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="stretch"
      marginBottom={1}
      padding={2}
      backgroundColor="white"
      borderRadius={4}
      {...props}
      style={theme => ({
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
          height: 2,
          width: 1,
        },
        ...(typeof props.style === 'function'
          ? props.style(theme)
          : props.style),
      })}
    >
      {children}
    </Box>
  );
};

Card.contextTypes = {
  theme: React.PropTypes.object,
};

export default Card;
