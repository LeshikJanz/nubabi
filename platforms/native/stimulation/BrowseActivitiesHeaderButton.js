// @flow
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from '../components';
import theme from '../../../core/themes/defaultTheme';

type Props = {
  onPress: () => void,
};

export const BrowseActivitiesHeaderButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <View style={styles.icon}>
            <Icon name="ios-help-buoy" size={20} color={theme.colors.primary} />
          </View>

          <View style={styles.textContainer}>
            <Text style={theme.subheader}>Browse</Text>
            <Text style={theme.subheader}>Activities</Text>
          </View>
        </View>
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
  buttonContainer: {
    flexDirection: 'row',

    borderColor: '#E9ECF4',
    borderLeftWidth: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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

export default BrowseActivitiesHeaderButton;
