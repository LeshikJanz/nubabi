// @flow
// TODO: remove duplication between all these buttons
import type { LayoutProps } from '../../common/types/index';
import React from 'react';
import { Image, Dimensions } from 'react-native';
import { Box, Card, Text, Overlay } from '../components/index';
import withLayout from '../components/withLayout';

type Props = {
  onPress: () => void,
};

const healthHelpImage = require('../../common/images/health_help.png');

const Button = withLayout(({ layout }: { layout: LayoutProps }) => {
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
        source={healthHelpImage}
        style={[{ flex: 1 }, dimensions]}
        resizeMode="cover"
      >
        <Overlay />
      </Image>
      <Box justifyContent="center" padding={1}>
        <Text size={2}>Health Help</Text>
      </Box>
    </Box>
  );
});

export const HealthHelpButton = ({ onPress }: Props) => {
  return (
    <Card padding={0} onPress={onPress}>
      <Button />
    </Card>
  );
};

export default HealthHelpButton;
