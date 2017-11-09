// @flow
import React from 'react';
import { ImageBackground } from 'react-native';
import { branch, renderComponent } from 'recompose';
import Box from './Box';
import Text from './Text';
import Overlay from './Overlay';

export const RequireBabyView = () => (
  <Box flex={1} justifyContent="center" alignItems="center">
    <ImageBackground
      source={require('../../common/images/growth-what-you-need-to-know.jpg')}
      style={{
        width: 128,
        height: 128,
        borderRadius: 128 / 2,
        overflow: 'hidden',
      }}
      resizeMode="cover"
    >
      <Overlay>
        <Text bold size={16} color="white">
          ?
        </Text>
      </Overlay>
    </ImageBackground>
    <Text size={4} marginTop={1}>
      You need to create or select a baby first.
    </Text>
  </Box>
);

const requireBaby = branch(
  props => !props.currentBabyId,
  renderComponent(RequireBabyView),
);

export default requireBaby;
