// @flow
// TODO: remove duplication between all these buttons
import type { LayoutProps } from '../../common/types/index';
import React from 'react';
import { ImageBackground } from 'react-native';
import { Box, Card, Text, Overlay } from '../components/index';
import withLayout from '../components/withLayout';

type Props = {
  onPress: () => void,
};

const healthHelpImage = require('../../common/images/health_help.png');

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
        source={healthHelpImage}
        style={[{ flex: 1 }, dimensions]}
        resizeMode="cover"
      >
        <Overlay />
      </ImageBackground>
      <Box contentSpacing>
        <Text size={6}>Health Matters</Text>
      </Box>
    </Box>
  );
};

export const ButtonWithLayout = withLayout(Button);

export const HealthHelpButton = ({ onPress }: Props) => {
  return (
    <Card padding={0} onPress={onPress}>
      <ButtonWithLayout />
    </Card>
  );
};

export default HealthHelpButton;
