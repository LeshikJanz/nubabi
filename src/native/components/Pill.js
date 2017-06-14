// @flow
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: any,
  style?: Object | number,
  backgroundColor?: string,
  color?: string,
  borderColor?: string,
};

export const Pill = (props: Props) => {
  const { children } = props;

  const style = {};
  const styleProps = ['backgroundColor', 'color', 'borderColor'];
  styleProps.forEach(prop => {
    if (props[prop]) {
      style[prop] = props[prop];
    }
  });

  return (
    <Text style={[styles.pill, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#33B7EB',
    overflow: 'hidden',
    color: '#fff',
    borderRadius: 10,
    marginTop: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 12,
    borderWidth: 1,
    borderColor: '#33B7EB',
  },
});

export default Pill;
