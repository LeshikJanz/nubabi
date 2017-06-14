// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Box, Card, Text, Overlay } from '../components';
import withLayout from '../components/withLayout';

type Props = {
  onPress: () => void,
};

const whatYouNeedToKnowImage = require('../../common/images/growth-what-you-need-to-know.jpg');

export const ThisWeekGrowth = withLayout(
  ({ layout }: { layout: LayoutProps }) => {
    const dimensions = {
      width: Math.round(layout.viewportWidth / 1.03),
      height: Math.round(layout.viewportWidth / 2.5),
    };
    return (
      <Box
        flex={1}
        borderRadius={4}
        style={() => ({
          overflow: 'hidden',
        })}
      >
        <Image
          source={whatYouNeedToKnowImage}
          style={[{ flex: 1 }, dimensions]}
          resizeMode="cover"
        >
          <Overlay />
        </Image>
        <Box justifyContent="center" padding={1}>
          <Text size={2}>This Week's Growth</Text>
        </Box>
      </Box>
    );
  },
);

export const WhatYouNeedToKnowButton = ({ onPress }: Props) => {
  return (
    <Card padding={0} onPress={onPress}>
      <ThisWeekGrowth />
    </Card>
  );
};

export default WhatYouNeedToKnowButton;
