// @flow
import type { LayoutProps } from 'react-native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children?: any,
  layout: LayoutProps,
};

export const Overlay = ({ children, layout }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.overlay} />
      {children && <View style={styles.tile}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'rgb(116, 130, 148)',
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  tile: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default Overlay;
