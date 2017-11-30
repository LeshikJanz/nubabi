// @flow
import React from 'react';
import Box from './Box';
import Text from './Text';

type Props = {
  message?: string,
};

export const NoContentView = ({ message = 'Nothing found' }: Props) => {
  return (
    <Box flex={1} alignItems="center" justifyContent="center">
      <Text>
        {message}
      </Text>
    </Box>
  );
};

export default NoContentView;
