import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Screen } from '../components';

const Growth = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Growth</Text>
        <TouchableHighlight>
          <Text>Go to Stimulation</Text>
        </TouchableHighlight>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
});

export default Growth;
