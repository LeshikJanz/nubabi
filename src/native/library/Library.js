import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { Screen, Box } from '../components';
import ArticleList from './ArticleList';

const Library = () => {
  return (
    <Screen>
      <Box flex={1}>
        <ArticleList />
        <Box flex={1} />
        <Box flex={1} />
      </Box>
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
