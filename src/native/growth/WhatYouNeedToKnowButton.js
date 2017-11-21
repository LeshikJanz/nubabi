// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { ImageBackground } from 'react-native';
import { Box, Card, ListItemArrow, Overlay, Text } from '../components';
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
        <ImageBackground
          source={whatYouNeedToKnowImage}
          style={[{ flex: 1 }, dimensions]}
          resizeMode="cover"
        >
          <Overlay />
        </ImageBackground>
        <Box
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
          paddingHorizontal={1}
          paddingVertical={0.5}
        >
          <Text flex={1} size={4}>
            What to expect
          </Text>
          <ListItemArrow />
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
