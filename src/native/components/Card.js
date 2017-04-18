// @flow
import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  children?: React.Children,
};

const Card = (props: Props) => (
  <View style={styles.container}>
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {
      height: 2,
      width: 1,
    },
  },
});

export default Card;
