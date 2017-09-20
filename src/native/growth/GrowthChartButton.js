// @flow
import React from 'react';
import { Image } from 'react-native';
import moment from 'moment';
import { Box, Card, ListItemArrow, Text } from '../components';
import { formatMeasurement } from '../../common/helpers/measurement';
import theme from '../../common/themes/defaultTheme';

type Props = {
  onPress: () => void,
};

const weightImage = require('../../common/images/growth-chart-button-weight.png');
const heightImage = require('../../common/images/growth-chart-button-height.png');

const imageProps = {
  resizeMode: 'contain',
  style: {
    flex: 1,
    //width: 61,
    height: 69,
    //width: 61,
    //height: 69,
    //marginRight: 10,
  },
};

const formatName = (name: string) => {
  return name.endsWith('s') ? `${name}'` : `${name}'s`;
};

const MeasurementText = ({ children }) => (
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

const UnitDisplayText = ({ children }) => (
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

const LastMeasurementTimestamp = ({ measurement }) => {
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
          {formatName(babyName)} Growth Chart
        </Text>
        <ListItemArrow />
      </Box>
    </Card>
  );
};

export default GrowthChartButton;
