// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spinner from 'react-native-spinkit';
import theme from 'core/themes/defaultTheme';

// Excluding iOS-only:
// Arc
// ArcAlt
// WordPress
type SpinnerType =
  | 'CircleFlip'
  | 'Bounce'
  | 'Wave'
  | 'WanderingCubes'
  | 'Pulse'
  | 'ChasingDots'
  | 'ThreeBounce'
  | 'Circle'
  | '9CubeGrid'
  | 'FadingCircle'
  | 'FadingCircleAlt' // iOS only:
  | 'Arc'
  | 'ArcAlt';

type Props = {
  size?: number,
  color?: string,
  type?: SpinnerType,
  style?: Object | number,
};

const Loader = ({
  size = 37,
  color = theme.colors.primary,
  type = 'Bounce',
  style,
}: Props) => (
  <View style={style || styles.container}>
    <Spinner size={size} color={color} type={type} />
  </View>
);

const styles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Loader;
