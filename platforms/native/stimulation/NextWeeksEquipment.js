// @flow
import type { NavigationOptions } from '../../../core/types';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Screen } from '../components';

const NextWeeksEquipment = () => (
  <Screen>
    <View style={styles.container}>
      <Text style={styles.title}>Next Weeks Equipment</Text>
    </View>
  </Screen>
);

const navigationOptions: NavigationOptions = {
  title: "Next Week's Equipment",
};

NextWeeksEquipment.navigationOptions = navigationOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default NextWeeksEquipment;
