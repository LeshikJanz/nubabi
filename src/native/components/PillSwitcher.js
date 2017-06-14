// @flow
// TODO: this was extracted from MeasurementUnitSwitcher, use there
// and make as generic as we can here.
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Box from './Box';
import Text from './Text';

type Props = {
  currentValue: string,
  availableValues: Array<string>,
  onSelect: () => void,
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch',
};

type PillSwitcherButtonProps = {
  value: string,
  isCurrent: boolean,
  onSelect: () => void,
};

const activeBoxStyle = () => ({
  backgroundColor: '#E9ECF4',
  borderRadius: 16,
});

export const PillSwitcherButton = ({
  value,
  isCurrent,
  onSelect,
}: PillSwitcherButtonProps) => {
  const boxStyleProps = isCurrent
    ? { style: activeBoxStyle }
    : { as: TouchableOpacity, onPress: () => onSelect(value) };

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
      <Text {...textStyleProps}>{value}</Text>
    </Box>
  );
};
export const PillSwitcher = ({
  currentValue,
  availableValues,
  onSelect,
  align = 'flex-end',
}: Props) => {
  return (
    <Box flexDirection="row" justifyContent={align}>
      {availableValues.map(value => (
        <PillSwitcherButton
          key={value}
          value={value}
          onSelect={onSelect}
          isCurrent={value === currentValue}
        />
      ))}
    </Box>
  );
};

export default PillSwitcher;
