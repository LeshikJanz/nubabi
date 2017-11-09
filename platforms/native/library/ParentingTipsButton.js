// @flow
// TODO: remove duplication between all these buttons
import type { LayoutProps } from '../../../core/types/index';
import React from 'react';
import { ImageBackground, Dimensions } from 'react-native';
import { Box, Card, Text, Overlay } from '../components/index';
import withLayout from '../components/withLayout';

type Props = {
  onPress: () => void,
};

const parentingTipsImage = require('../../../core/images/parenting_tips.png');

export const Button = ({ layout }: { layout: LayoutProps }) => {
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
        source={parentingTipsImage}
        style={[{ flex: 1 }, dimensions]}
        resizeMode="cover"
      >
        <Overlay />
      </ImageBackground>
      <Box contentSpacing>
        <Text size={6}>Parenting Tips</Text>
      </Box>
    </Box>
  );
};

const ButtonWithLayout = withLayout(Button);

export const ParentingTipsButton = ({ onPress }: Props) => {
  return (
    <Card padding={0} onPress={onPress}>
      <ButtonWithLayout />
    </Card>
  );
};

export default ParentingTipsButton;
