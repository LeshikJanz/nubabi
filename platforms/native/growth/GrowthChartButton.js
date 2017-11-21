// @flow
import type { Measurement } from 'core/types';
import * as React from 'react';
import { Image } from 'react-native';
import moment from 'moment';
import { Box, Card, ListItemArrow, Text } from '../components';
import { formatMeasurement } from 'core/helpers/measurement';
import formatPossessive from 'core/helpers/formatPossessive';
import theme from 'core/themes/defaultTheme';

type Props = {
  onPress: () => void,
  unitDisplay: {
    weight: 'kg' | 'lbs',
    height: 'cm' | 'in',
  },
  babyName: string,
  height: { value: number },
  weight: { value: number },
};

const weightImage = require('core/images/growth-chart-button-weight.png');
const heightImage = require('core/images/growth-chart-button-height.png');

const imageProps = {
  resizeMode: 'contain',
  style: {
    flex: 1,
    // width: 61,
    height: 69,
    // width: 61,
    // height: 69,
    // marginRight: 10,
  },
};

const MeasurementText = ({ children }: { children: React.Element<*> }) => (
  <Text
    size={14}
    style={() => ({
      letterSpacing: -0.71,
      fontWeight: theme.text.light.toString(),
    })}
  >
    {children}
  </Text>
);

const UnitDisplayText = ({ children }: { children: React.Element<*> }) => (
  <Text
    size={6}
    style={() => ({
      marginLeft: 2,
      marginTop: 9,
      fontWeight: theme.text.light.toString(),
    })}
  >
    {children}
  </Text>
);

const LastMeasurementTimestamp = ({
  measurement,
}: {
  measurement: Measurement,
}) => {
  let content = 'N/A';
  if (measurement) {
    const date = moment(measurement.recordedAt);
    content = date.format('D MMM YYYY');
  }
  return (
    <Box justifyContent="flex-end">
      <Text color="secondary">{content}</Text>
    </Box>
  );
};

export const GrowthChartButton = ({
  onPress,
  unitDisplay,
  weight,
  height,
  babyName,
}: Props) => {
  const weightText = weight
    ? formatMeasurement(unitDisplay.weight, weight.value)
    : 'N/A';
  const heightText = height
    ? formatMeasurement(unitDisplay.height, height.value)
    : 'N/A';

  return (
    <Card padding={0} onPress={onPress}>
      <Box flex={1} paddingHorizontal={1} paddingVertical={2}>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Box flex={1} flexDirection="row">
            <Image source={weightImage} {...imageProps} />
            <Box>
              <Box flexDirection="row" flex={1} alignItems="center">
                <MeasurementText>{weightText}</MeasurementText>
                <UnitDisplayText>{unitDisplay.weight}</UnitDisplayText>
              </Box>
              <LastMeasurementTimestamp measurement={weight} />
            </Box>
          </Box>
          <Box flex={1} flexDirection="row">
            <Image
              source={heightImage}
              {...imageProps}
              style={{
                ...imageProps.style,
                width: 23,
                marginLeft: -20,
              }}
            />
            <Box
              flex={1}
              justifyContent="center"
              style={() => ({
                marginLeft: -20,
              })}
            >
              <Box flexDirection="row" flex={1} alignItems="center">
                <MeasurementText>{heightText}</MeasurementText>
                <UnitDisplayText>{unitDisplay.height}</UnitDisplayText>
              </Box>
              <LastMeasurementTimestamp measurement={height} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        paddingHorizontal={1}
        paddingVertical={0.5}
        style={() => ({
          borderTopWidth: 1,
          borderTopColor: theme.colors.separator,
        })}
      >
        <Text flex={1} size={4}>
          Track {formatPossessive(babyName)} height & weight
        </Text>
        <ListItemArrow />
      </Box>
    </Card>
  );
};

export default GrowthChartButton;
