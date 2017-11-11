// @flow
import type { LayoutProps } from 'core/types/types';
import React from 'react';
import { Image } from 'react-native';
import { Box, Card, Text } from '../components';

const background = require('core/images/next-week-equipment.png');

type Props = {
  onPress: () => void,
};

export const NextWeeksEquipmentButton = ({ onPress }: Props) => {
  return (
    <Card padding={0} onPress={onPress}>
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image
          source={background}
          style={{ flex: 1, width: 48, height: 46, marginTop: 16 }}
          resizeMode="contain"
        />
        <Box contentSpacing>
          <Text size={6} lineHeight={24} align="center">
            Equipment For
          </Text>
          <Text size={6} lineHeight={24} align="center">
            Next Week
          </Text>
        </Box>
      </Box>
    </Card>
  );
};

export default NextWeeksEquipmentButton;
