// @flow
import React from 'react';
import { View } from 'react-native';

type Props = {
  overlayStyle?: Object | number,
};

export const HeaderOverlay = ({ overlayStyle: styleProp }: Props) => {
  return <View style={[styles.overlay, styleProp]} />;
};

const styles = {
  overlay: {
    backgroundColor: '#748294',
    opacity: 0.4,
    position: 'absolute',
  },
};

export default HeaderOverlay;
