// @flow
import React from 'react';
import type { BoxProps } from './Box';
import Box from './Box';

export const Card = (props: BoxProps) => (
  <Box
    flex={1}
    justifyContent="center"
    alignItems="stretch"
    marginHorizontal={2}
    marginVertical={2}
    padding={2}
    backgroundColor="white"
    borderRadius={4}
    {...props}
    style={() => ({
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 3,
      shadowOffset: {
        height: 2,
        width: 1,
      },
      ...(typeof props.style === 'function'
        ? props.style(/* theme */)
        : props.style),
    })}
  />
);

Card.contextTypes = {
  theme: React.PropTypes.object,
};

export default Card;
