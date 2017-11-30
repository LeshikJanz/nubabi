// @flow
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  children: any,
  style?: Object | number,
  backgroundColor?: string,
  color?: string,
  borderColor?: string,
};

export const Pill = (props: Props) => {
  const { children, style: styleProp } = props;

  const style = {};
  const styleProps = ['backgroundColor', 'color', 'borderColor'];
  styleProps.forEach(prop => {
    if (props[prop]) {
      style[prop] = props[prop];
    }
  });

  if (typeof children === 'string') {
    return (
      <Text style={[styles.pillContainer, styles.pillText, style, styleProp]}>
        {children}
      </Text>
    );
  }

  return (
    <View style={[styles.pillContainer, style, styleProp]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  pillContainer: {
    backgroundColor: '#33B7EB',
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33B7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillText: {
    color: '#fff',
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
  },
});

export default Pill;
