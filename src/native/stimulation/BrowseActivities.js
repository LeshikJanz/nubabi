import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const BrowseActivities = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Browse Activities</Text>
  </View>
);

BrowseActivities.navigationOptions = {
  title: 'All Activities',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default BrowseActivities;
