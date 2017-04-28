// @flow
import React from 'react';
import { View } from 'react-native';
import Alert from './Alert';

type Props = {
  children: any,
  style?: any,
};

const Screen = ({ children, style }: Props) => (
  <View style={[{ flex: 1 }, style]}>
    {children}
    <Alert />
  </View>
);

export default Screen;
