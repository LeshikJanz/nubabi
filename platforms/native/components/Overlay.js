// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  children?: any,
  style?: Object,
  overlayStyle?: Object,
};

export const Overlay = ({ children, style = {}, overlayStyle = {} }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={[styles.overlay, overlayStyle]} />
      {children && <View style={[styles.tile, style]}>{children}</View>}
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
