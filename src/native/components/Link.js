// @flow
import React from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import Text from './Text';

type Props = {
  title: string,
  url: string,
  onOpenURL?: (url: string) => void,
  containerStyle?: Object | number,
};

export const openURL = (url: string) => {
  Linking.openURL(url);
};

export const Link = ({
  title,
  url,
  onOpenURL = openURL,
  containerStyle,
}: Props) => {
  return (
    <TouchableOpacity onPress={() => onOpenURL(url)} style={containerStyle}>
      <Text color="primary">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Link;
