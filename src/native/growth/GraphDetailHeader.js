// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { ImageBackground } from 'react-native';
import { gql } from 'react-apollo';
import { Box, Overlay, Text, withLayout } from '../components';
import GraphDetailMeasurementSwitcher from './GraphDetailMeasurementSwitcher';

type Props = {
  name: string,
  layout: LayoutProps,
  onSwitchMeasurementType: () => void,
};

const background = require('../../common/images/graph-detail-header.png');

export const GraphDetailHeader = ({
  name,
  layout,
  onSwitchMeasurementType,
}: Props) => {
  const headerWidth = layout.viewportWidth;
  const headerHeight = layout.viewportWidth * 0.45;

  return (
    <Box style={() => ({ width: headerWidth, height: headerHeight })}>
      <ImageBackground
        source={background}
        style={{ flex: 1, width: headerWidth }}
      >
        <Overlay overlayStyle={{ opacity: 0.7 }}>
          <Box flex={1} alignItems="center" justifyContent="center">
            <Text align="center" color="white" size={7}>
              Look how {name}
            </Text>
            <Text align="center" color="white" size={7}>
              is growing
            </Text>
          </Box>

          <Box
            alignSelf="stretch"
            alignItems="stretch"
            justifyContent="flex-end"
            padding={1}
          >
            <GraphDetailMeasurementSwitcher
              onChange={onSwitchMeasurementType}
            />
          </Box>
        </Overlay>
      </ImageBackground>
    </Box>
  );
};

GraphDetailHeader.fragments = {
  baby: gql`
    fragment GraphDetailHeaderBaby on Baby {
      name
    }
  `,
};

export default withLayout(GraphDetailHeader);
