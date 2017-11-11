// @flow
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from '../components';

type Props = {
  onPress: () => void,
  text?: string,
};

const rightHeaderTextStyle = () => ({
  paddingRight: 10,
  fontSize: 17,
});

export const RightNavButton = ({ onPress, text = 'Save' }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 4 }}
      hitSlot={{ top: 5, left: 44, right: 44, bottom: 5 }}
    >
      <Text style={rightHeaderTextStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default RightNavButton;
