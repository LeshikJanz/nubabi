// @flow
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import theme from '../../../core/themes/defaultTheme';

const icon = require('../../../core/images/star.png');

type Props = {
  onPress: () => void,
};

export const FavoritesButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={styles.container}
      {...props}
    >
      <Image source={icon} style={styles.icon} />

      <View style={styles.textContainer}>
        <Text style={theme.subheader}>View</Text>
        <Text style={theme.subheader}>Favourites</Text>
      </View>
    </TouchableOpacity>
  );
};

const HEIGHT = 66;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    height: HEIGHT,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    fontSize: 14,
    color: '#748294',
    backgroundColor: 'transparent',
  },
  month: {
    fontSize: 14,
    color: '#748294',
    backgroundColor: 'transparent',
  },
  textContainer: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  icon: {
    height: 20,
    width: 20,
    marginLeft: 30,
    marginRight: 20,
  },
});

export default FavoritesButton;
