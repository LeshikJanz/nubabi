// @flow
import React from 'react';
import Box from './Box';

type Props = {
  children: any,
};

export const List = ({ children }: Props) => {
  return <Box flex={1}>{children}</Box>;
};

export default List;
