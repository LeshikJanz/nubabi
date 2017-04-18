// @flow
import React from 'react';
import { View } from 'react-native';
import Spinner from 'react-native-spinkit';
import theme from '../../common/themes/defaultTheme';

type Props = {
  size?: number,
  color?: string
};

const Loader = ({ size = 37, color = theme.colors.primary }: Props) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Spinner size={size} color={color} type="Bounce" />
  </View>
);

export default Loader;
