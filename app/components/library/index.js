import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

const Library = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>
      <TouchableHighlight>
        <Text>Go To Next Scene</Text>
      </TouchableHighlight>
    </View>
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
