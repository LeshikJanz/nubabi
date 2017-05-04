// @flow
import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Box, Card, Text } from '../components';

type Props = {
  onPress: () => void,
};

const window = Dimensions.get('window');

export function getSizeRelativeToReference(
  dimension,
  originalRefVal,
  actualRefVal,
) {
  return dimension / originalRefVal * actualRefVal;
}

function dimensionRelativeToIphone(dimension, actualRefVal = window.width) {
  // 375 is iPhone width
  return getSizeRelativeToReference(dimension, 375, actualRefVal);
}

const whatYouNeedToKnowImage = require('../../common/images/growth-what-you-need-to-know.png');

export const WhatYouNeedToKnowButton = ({ onPress }: Props, context) => {
  const width = dimensionRelativeToIphone(345);
  const height = dimensionRelativeToIphone(150);

  return (
    <Card padding={0} onPress={onPress}>
      <Box
        flex={1}
        style={() => ({ borderTopLeftRadius: 4, borderTopRightRadius: 4 })}
      >
        <Image source={whatYouNeedToKnowImage} style={{ width, height }} />
        <Box justifyContent="center" padding={1}>
          <Text size={2}>What you need to know</Text>
        </Box>
      </Box>
    </Card>
  );
};

export default WhatYouNeedToKnowButton;
