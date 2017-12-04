// @flow
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Text from './Text';

type Props = {
  title: string,
  href: string,
  onOpenURL?: (url: string) => void,
  containerStyle?: Object | number,
  textStyle?: Object,
  color?: string,
};

export const openURL = (url: string) => {
  Linking.openURL(url);
};

export const Link = ({
  title,
  href,
  onOpenURL = openURL,
  containerStyle,
  textStyle = {},
  color = 'primary',
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onOpenURL(href)} style={containerStyle}>
      <Text color={color} style={() => textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
