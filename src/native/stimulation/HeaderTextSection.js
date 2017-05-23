// @flow
import React from 'react';
import { StyleSheet, View } from 'react-native';

type Props = {
  width: number,
  style?: Object | number,
  children: any,
};

export const HeaderTextSection = ({
  width,
  style: styleProp,
  children,
}: Props) => {
  const headerTextStyle = {
    marginTop: -Math.round(width / 2.2),
  };

  return (
    <View style={[styles.headerTextContainer, headerTextStyle, styleProp]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  headerTextContainer: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
});

export default HeaderTextSection;
