// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../../../core/themes/defaultTheme';

type Props = {
  onPress?: () => void,
  style?: Object | number,
};

export const AddButton = ({ onPress, style }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ justifyContent: 'center' }, style]}
    >
      <Icon name="ios-add-circle" size={24} color={theme.colors.primary} />
    </TouchableOpacity>
  );
};

export default AddButton;
