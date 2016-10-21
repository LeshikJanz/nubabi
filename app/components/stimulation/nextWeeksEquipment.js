import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const NextWeeksEquipment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Next Weeks Equipment</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default NextWeeksEquipment;
