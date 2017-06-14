// @flow
import React from 'react';
import { Box, FAB, Text } from '../components/index';

type Props = {
  minutes: number,
  suffix?: string,
};

export const ReadingTime = ({ minutes, suffix = 'min read' }: Props) => {
  return (
    <FAB
      style={{
        position: 'absolute',
        bottom: 45,
        right: 15,
      }}
    >
      <Box flex={1} justifyContent="center">
        <Text size={5} color="primary" medium align="center" lineHeight={20}>
          {minutes}
        </Text>
        <Text
          color="primary"
          numberOfLines={1}
          align="center"
          medium
          style={() => ({ fontSize: 10 })}
        >
          {suffix}
        </Text>
      </Box>
    </FAB>
  );
};

export default ReadingTime;
