import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  style?: number | object,
  children: any,
};

export const HeaderContainer = ({ style, children }: Props) => {
  return (
    <View style={StyleSheet.flatten([styles.header, style])}>
      {children}
    </View>
  );
};

const styles = {
  header: {
    alignItems: 'center',
  },
};

export default HeaderContainer;
