// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Box, Text } from '../../components';

// TODO: remove these types, use from modelTypes
export type WeightMeasurementUnit = 'kg' | 'lbs';
export type HeightMeasurementUnit = 'cm' | 'in';
export type MeasurementUnit = WeightMeasurementUnit | HeightMeasurementUnit;

type Props = {
  currentUnit: MeasurementUnit,
  availableUnits: Array<MeasurementUnit>,
  onSelect: () => void,
};

type MeasurementUnitButtonProps = {
  unit: MeasurementUnit,
  isCurrent: boolean,
  onSelect: () => void,
};
const activeBoxStyle = () => ({
  backgroundColor: '#E9ECF4',
  borderRadius: 16,
});

export const MeasurementUnitButton = ({
  unit,
  isCurrent,
  onSelect,
}: MeasurementUnitButtonProps) => {
  const boxStyleProps = isCurrent
    ? { style: activeBoxStyle }
    : { as: TouchableOpacity, onPress: () => onSelect(unit) };

  const textStyleProps = isCurrent
    ? { color: 'black', bold: true }
    : { color: 'secondary' };

  return (
    <Box
      alignItems="center"
      justifyContent="center"
      paddingHorizontal={1}
      paddingVertical={0.5}
      {...boxStyleProps}
    >
      <Text {...textStyleProps}>{unit}</Text>
    </Box>
  );
};
export const MeasurementUnitSwitcher = ({
  currentUnit,
  availableUnits,
  onSelect,
}: Props) => {
  return (
    <Box flexDirection="row" justifyContent="flex-end">
      {availableUnits.map(unit => (
        <MeasurementUnitButton
          key={unit}
          unit={unit}
          onSelect={onSelect}
          isCurrent={unit === currentUnit}
        />
      ))}
    </Box>
  );
};

export default MeasurementUnitSwitcher;
