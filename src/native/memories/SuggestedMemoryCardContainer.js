// @flow
import React from 'react';
import { Box } from '../components';

type Props = {
  children: any,
};

export const SuggestedMemoryCardContainer = ({ children, ...props }: Props) => (
  <Box
    marginLeft={1}
    marginBottom={1}
    alignItems="center"
    justifyContent="center"
    backgroundColor="white"
    borderRadius={4}
    borderColor="separator"
    borderWidth={1}
    padding={0.5}
    {...props}
  >
    {children}
  </Box>
);

export default SuggestedMemoryCardContainer;
