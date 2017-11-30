// @flow
import type { LayoutProps } from 'core/types';
import React from 'react';
import { ImageBackground } from 'react-native';
import moment from 'moment';
import { Box, Card, Icon, Overlay, Text, withLayout } from '../components';
import theme from 'core/themes/defaultTheme';
import formatDate from 'core/helpers/formatDate';

const background = require('core/images/gross_motor_large.jpg');

type Props = {
  onPress: () => void,
  layout: LayoutProps,
};

export const ThisWeeksActivitiesButton = ({ onPress, layout }: Props) => {
  const title = "This Week's Stimulation Guide";

  const dimensions = {
    width: layout.viewportWidth - 20,
    height: layout.viewportWidth * 0.6,
  };

  const date = moment()
    .startOf('week')
    .toDate();

  return (
    <Box contentSpacing>
      <Card padding={0} onPress={onPress}>
        <Box style={() => ({ borderRadius: 4, overflow: 'hidden' })}>
          <ImageBackground
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
                  {formatDate(date)}
                </Text>
              </Box>
            </Overlay>
          </ImageBackground>
          <Box contentSpacing flexDirection="row" justifyContent="center">
            <Text flex={1} size={6}>
              {title}
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
