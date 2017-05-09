// @flow
import type { LayoutProps } from '../../common/types/types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import withLayout from '../components/withLayout';

type Props = {
  onPress: () => void,
  layout: LayoutProps,
};

const background = require('../../common/images/browseAllActivitiesButton.png');

export const BrowseAllActivitiesButton = ({ onPress, layout }: Props) => {
  const width = { width: layout.parentWidth };
  return (
    <TouchableHighlight
      style={styles.container}
      underlayColor="rgba(0,0,0,0)"
      onPress={onPress}
    >
      <Image
        source={background}
        style={[styles.background, width]}
        resizeMode="contain"
      >
        <View style={styles.textContainer}>
          <View style={[styles.overlay, width]} />
          <Text style={styles.title}>Browse All</Text>
          <Text style={styles.title}>Activities</Text>
        </View>
      </Image>
    </TouchableHighlight>
  );
};

const HEIGHT = 130;

const styles = StyleSheet.create({
  container: {
    flex: 2,
    borderRadius: 4,
    height: HEIGHT,
    backgroundColor: 'red',
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 1,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#748294',
    opacity: 0.4,
    position: 'absolute',
    top: 0,
    marginTop: 65,
    height: HEIGHT,
    width: 200,
  },
  title: {
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: '500',
    backgroundColor: 'transparent',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    flex: 1,
  },
  background: {
    width: 175,
  },
});

export default withLayout(BrowseAllActivitiesButton);
