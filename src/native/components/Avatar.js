// @flow
import React from 'react';
import { View, Text } from 'react-native';
import { CachedImage as Image } from 'react-native-cached-image';
import { createComponent } from 'react-fela';
import theme from '../../common/themes/defaultTheme';

type Props = {
  backgroundColor?: string,
  children?: any,
  color?: string,
  size?: number,
  src?: string | number,
  icon?: string,
  fallbackText?: string,
  style?: Object | number,
};

const Container = createComponent(
  ({ color, backgroundColor, size }) => ({
    backgroundColor: backgroundColor || theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: size / 2,
    height: size,
    width: size,
    overflow: 'hidden',
  }),
  View,
);

export const Avatar = (props: Props) => {
  const {
    size = 40,
    color = theme.colors.primary,
    backgroundColor = theme.colors.white,
    fallbackText,
    icon,
    src,
    style,
    children,
    ...other
  } = props;

  const containerProps = {
    size,
    backgroundColor,
    style,
  };

  if (src) {
    const source = typeof src === 'number' ? src : { uri: src };

    return (
      <Container {...containerProps} {...other}>
        <Image source={source} style={{ flex: 1, width: size, height: size }} />
      </Container>
    );
  } else if (fallbackText) {
    return (
      <Container {...containerProps} {...other}>
        <Text size={size} style={{ color }}>
          {fallbackText}
        </Text>
      </Container>
    );
  }

  return (
    <Container {...containerProps} {...other}>
      {children}
    </Container>
  );
};

export default Avatar;
