// @flow
import React from 'react';
import pluralize from 'pluralize';
import { Box, Text } from '../components';

type Props = {
  subject: string,
  count: number,
};

export const UsageStat = ({ subject, count }: Props) => {
  const suffix = pluralize(subject, count).toUpperCase();

  return (
    <Box padding={0} margin={0} flexDirection="column" flex={1}>
      <Text size={2} bold align="center" marginVertical={0.5}>
        {count}
      </Text>
      <Text color="secondary" align="center" spacing={-0.41}>
        {suffix}
      </Text>
    </Box>
  );
};

export default UsageStat;
