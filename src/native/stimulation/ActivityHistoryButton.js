// @flow
import type { LayoutProps } from '../../common/types/types';
import React from 'react';
import { Image } from 'react-native';
import { Box, Card, Text } from '../components';

const background = require('../../common/images/activity-history.png');

type Props = {
  onPress: () => void,
  layout: LayoutProps,
};

export const ActivityHistoryButton = ({ onPress, layout }: Props) => {
  return (
    <Card padding={0} onPress={onPress} style={() => ({ marginLeft: 16 })}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image
          source={background}
          style={{ flex: 1, width: 48, height: 46, marginTop: 16 }}
          resizeMode="contain"
        />
        <Box contentSpacing>
          <Text size={6} lineHeight={24} align="center">
            Activity
          </Text>
          <Text size={6} lineHeight={24} align="center">
            History
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default ActivityHistoryButton;
