// @flow
import React from 'react';
import { StyleSheet, Text } from 'react-native';

type Props = {
  children: any,
};

export const Pill = ({ children }: Props) => {
  return (
    <Text style={styles.pill}>
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
