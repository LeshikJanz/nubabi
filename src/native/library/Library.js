import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Screen } from '../components';

const Library = () => {
  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Library</Text>
        <TouchableHighlight>
          <Text>Go To Next Scene</Text>
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

export default Library;
