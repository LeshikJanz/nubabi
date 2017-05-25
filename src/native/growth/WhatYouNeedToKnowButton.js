// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Box, Card, Text, Overlay } from '../components';
import withLayout from '../components/withLayout';

type Props = {
  onPress: () => void,
  layout: LayoutProps,
};

const whatYouNeedToKnowImage = require('../../common/images/growth-what-you-need-to-know.jpg');

export const WhatYouNeedToKnowButton = ({ onPress, layout }: Props) => {
  console.log(layout.viewportWidth);
  const width = Math.round(layout.viewportWidth * 0.915);
  const height = Math.round(layout.viewportHeight * 0.2);

  return (
    <Card padding={0} onPress={onPress}>
      <Box
        flex={1}
        style={() => ({ borderTopLeftRadius: 4, borderTopRightRadius: 4 })}
      >
        <Image source={whatYouNeedToKnowImage} style={{ width, height }}>
          <Overlay />
        </Image>
        <Box justifyContent="center" padding={1}>
          <Text size={2}>What you need to know</Text>
        </Box>
      </Box>
    </Card>
  );
};

export default withLayout(WhatYouNeedToKnowButton);
