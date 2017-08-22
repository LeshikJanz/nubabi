// @flow
import type { LayoutProps } from '../../common/types';
import React from 'react';
import { Image } from 'react-native';
import { Box, Card, Icon, Overlay, Text, withLayout } from '../components';
import theme from '../../common/themes/defaultTheme';
import formatDate from '../../common/helpers/formatDate';

const background = require('../../common/images/gross_motor_large.jpg');

type Props = {
  onPress: () => void,
  style?: number,
  layout: LayoutProps,
};

export const ThisWeeksActivitiesButton = ({
  onPress,
  style,
  layout,
}: Props) => {
  const dimensions = {
    width: layout.viewportWidth - 20,
    height: layout.viewportWidth * 0.6,
  };

  return (
    <Box contentSpacing>
      <Card padding={0} onPress={onPress}>
        <Box style={() => ({ borderRadius: 4, overflow: 'hidden' })}>
          <Image
            source={background}
            style={[{ flex: 1 }, dimensions]}
            resizeMode="cover"
          >
            <Overlay
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingTop: 16,
                paddingLeft: 16,
              }}
            >
              <Box
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
              >
                <Icon
                  name="md-calendar"
                  size={20}
                  color="white"
                  style={{ marginTop: 2 }}
                />
                <Text color="white" marginLeft={0.5} bold>
                  {formatDate(new Date())}
                </Text>
              </Box>
            </Overlay>
          </Image>
          <Box contentSpacing flexDirection="row" justifyContent="center">
            <Text flex={1} size={6}>
              This Week's Activities
            </Text>
            <Box alignItems="center" justifyContent="center">
              <Icon
                color={theme.colors.secondary}
                name="ios-arrow-forward"
                size={20}
                style={{ marginTop: 2 }}
              />
            </Box>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default withLayout(ThisWeeksActivitiesButton);
